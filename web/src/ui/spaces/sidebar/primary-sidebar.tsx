import {For, Match, Show, Switch} from "solid-js"
import {createCombinedDeviceInvitation} from "../../../auth/invitations/create-device-invitation.ts"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {Card, CardLink} from "../../elements/card/card.tsx"
import {A, useNavigate} from "@solidjs/router"
import "./primary-sidebar.scss"
import UniformType from "../../../contents/uniform-type.ts"
import {useHomeSpace} from "../use-home.ts"
import getDocIdFromTeam from "../../../auth/teams/get-doc-id-from-team.ts"
import {parseBasicInvitation} from "../../../auth/invitations/parse-invitation.ts"
import type {BasicInvitation} from "../../../auth/invitations/invitation-types.ts"
import * as local from "../../automerge/local.ts"
import createBoolean from "../../lib/create-boolean.ts"
import {coderRegistry} from "../../../contents/coders.ts"
import {showOpenFilePicker} from "file-system-access"
import {editorViewRegistry} from "../../../contents/content-view.ts"
import start from "../../../repo/start-repo.ts"
import createDevice from "../../../auth/devices/create-device.ts"
import {createUser} from "@localfirst/auth"

export default function PrimarySidebar() {
	// todo useSpace
	const automerge = useAutomerge()
	const [space, changeSpace] = useHomeSpace()
	const lb = useLittlebookAPI()

	return (
		<Show when={space()}>
			<Card>
				<CardLink icon="📥" title="inbox" href="inbox" />
			</Card>
			<Card>
				<CardLink icon="⭐" title="today" href="today" />
				<CardLink icon="📆" title="upcoming" href="upcoming" />
				<CardLink icon="🗃️" title="someday" href="someday" />
			</Card>
			<Card
				// title="folders"
				headerAction={{
					label: "create folder",
					icon: "🆕",
					action() {
						const projectHandle = lb.folders.createHandle()
						projectHandle?.doc().then(prj => {
							if (prj) {
								const change = lb.spaces.addFolder(prj.id)
								change && changeSpace(change)
								setTimeout(() => {
									// route({
									// 	shareId: ui.space.shareId.value,
									// 	project: prj,
									// })
									// ui.projects.renaming.value = prj.id
								})
							}
						})
					},
				}}>
				<For each={space()?.items}>
					{id => {
						return <FolderCardLink id={id} parentId={space()!.id} />
					}}
				</For>
			</Card>
			<button
				class="button"
				type="button"
				onclick={() =>
					window.prompt(
						"this is the code",
						createCombinedDeviceInvitation(automerge.user, automerge.team),
					)
				}>
				get code
			</button>
			<button
				class="button"
				type="button"
				onclick={async () => {
					const code = window.prompt("enter the code")
					console.log("hello world?")
					if (code) {
						const [userName, userId, invitationCode] = code.split(":")

						const {shareId, invitationSeed} = parseBasicInvitation(
							invitationCode as BasicInvitation,
						)

						local.set({
							invitation: {shareId, invitationSeed, userName: userName},
							user: undefined,
							device: undefined,
						})

						// automerge.auth
						// 	.addInvitation({shareId, invitationSeed, userName: userName})
						// 	.catch(console.error)
						// 	.then(() => {
						// 		local.set({
						// 			home: shareId,
						// 		})
						// 		const team = automerge.auth.getTeam(shareId)
						// 		const newSpaceId = getDocIdFromTeam(team)
						// 		const newSpaceHandle = lb.spaces.getHandle(
						// 			newSpaceId as lb.SpaceId,
						// 		)
						// 		const currentSpaceHandle = lb.spaces.getHandle(space()!.id)

						// 		const nextSpaceHandle = lb.spaces.fromMerged(
						// 			newSpaceHandle,
						// 			currentSpaceHandle,
						// 		)

						// 		console.log({
						// 			shareId,
						// 			invitationCode,
						// 			invitationSeed,
						// 			userName,
						// 			nextSpaceHandle,
						// 		})
						// 	})
					}
				}}>
				merge with device
			</button>
		</Show>
	)
}

function FileCardLink({id}: {id: lb.FileId; parentId: lb.FolderId}) {
	const [file] = useDocument<lb.File>(() => id)
	return (
		<Show when={file()}>
			<A href={"documents/" + file()!.id}>
				{file()!.icon || ""}
				{file()!.name}
			</A>
		</Show>
	)
}

function FolderCardLink({
	id,
	parentId,
}: {id: lb.FolderId; parentId: lb.AnyParentDocument["id"]}) {
	const [folder, changeFolder] = useDocument<lb.Folder>(() => id)
	const lb = useLittlebookAPI()
	const [showingNew, toggleShowingNew] = createBoolean()
	const fileTypes = [...coderRegistry.getAllTypes()]
		.map(UniformType.get)
		.filter(type => type.preferredFilenameExtension)
		.filter(type => editorViewRegistry.getFirst(type))

	const nav = useNavigate()

	return (
		<Show when={folder()}>
			<details class="folder-card-link">
				<summary>
					<A href={"folders/" + folder()!.id}>{folder()!.icon || ""}</A>
					<button type="button" onclick={toggleShowingNew}>
						+
					</button>
					<Show when={showingNew()}>
						<ul class="new">
							<For each={fileTypes}>
								{type => (
									<li>
										<button
											type="button"
											class="button"
											onclick={() => {
												const file = lb.files.createHandleInFolder(
													folder()!.id,
													{
														name: "new file." + type.preferredFilenameExtension,
														contentType: type.identifier,
													},
												)

												file && nav("/documents/" + file.docSync()!.id)
												toggleShowingNew(false)
											}}>
											{type.description}
										</button>
									</li>
								)}
							</For>
							<button
								type="button"
								class="button"
								onclick={async () => {
									const [computerFileHandle] = await showOpenFilePicker({
										_preferPolyfill: false,
										multiple: false,
									})
									const computerFile = await computerFileHandle.getFile()
									const bytes = new Uint8Array(await computerFile.arrayBuffer())
									const fileHandle = lb.files.import(computerFile, bytes)

									fileHandle.doc().then(file => {
										file &&
											changeFolder(
												lb.documents.addItem(
													fileHandle.documentId as lb.FileId,
												),
											)
									})
									fileHandle && nav("/documents/" + fileHandle.documentId)
									toggleShowingNew(false)
								}}>
								import
							</button>
							<button
								type="button"
								class="button"
								onclick={async () => {
									const newFolderHandle = lb.folders.createHandle()

									newFolderHandle.doc().then(folder => {
										folder &&
											changeFolder(
												lb.documents.addItem(
													newFolderHandle.documentId as lb.FolderId,
												),
											)
									})
									toggleShowingNew(false)
								}}>
								folder
							</button>
						</ul>
					</Show>
				</summary>
				<ul>
					<For each={folder()!.items}>
						{id => (
							<li>
								<ItemCardLink id={id} parentId={folder()!.id} />
							</li>
						)}
					</For>
				</ul>
			</details>
		</Show>
	)
}

function ItemCardLink({id, parentId}: {id: lb.ItemId; parentId: lb.FolderId}) {
	const [item] = useDocument<lb.Item>(() => id)

	return (
		<Show when={item()}>
			<Switch>
				<Match when={item()?.type == "folder"}>
					<FolderCardLink id={id as lb.FolderId} parentId={parentId} />
				</Match>
				<Match when={item()?.type == "file"}>
					<FileCardLink id={id as lb.FileId} parentId={parentId} />{" "}
				</Match>
			</Switch>
		</Show>
	)
}
