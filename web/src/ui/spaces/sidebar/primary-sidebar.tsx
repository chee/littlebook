import {
	For,
	Match,
	Show,
	Switch,
	createEffect,
	createSignal,
	onMount,
} from "solid-js"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {Card, CardLink} from "../../elements/card/card.tsx"
import {A, useNavigate, useParams} from "@solidjs/router"
import UniformType from "../../../contents/uniform-type.ts"
import createBoolean from "../../lib/create-boolean.ts"
import {coderRegistry} from "../../../contents/coders.ts"
import {showOpenFilePicker} from "file-system-access"
import {editorViewRegistry} from "../../../contents/content-view.ts"
import useClickOutside from "solid-click-outside"

import "./primary-sidebar.scss"

export default function PrimarySidebar() {
	const automerge = useAutomerge()
	const [space, changeSpace] = useDocument<lb.Space>(() => automerge.home)
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
		</Show>
	)
}

function FileCardLink(props: {
	id: lb.FileId
	parentId: lb.FolderId
}) {
	const [file] = useDocument<lb.File>(() => props.id)
	return (
		<Show when={file.latest}>
			<A href={"documents/" + file.latest!.id}>
				{file.latest!.icon || ""}
				{file.latest!.name}
			</A>
		</Show>
	)
}

function FolderCardLink(props: {
	id: lb.FolderId
	parentId: lb.AnyParentDocument["id"]
}) {
	const [folder, changeFolder] = useDocument<lb.Folder>(() => props.id)
	const lb = useLittlebookAPI()
	const [showingNewPicker, toggleShowingNewPicker, setShowingNewPicker] =
		createBoolean()
	const fileTypes = [...coderRegistry.getAllTypes()]
		.map(UniformType.get)
		.filter(type => type.preferredFilenameExtension)
		.filter(type => editorViewRegistry.getFirst(type))

	const nav = useNavigate()

	const [detailsRef, setDetailsRef] = createSignal<HTMLDetailsElement>()

	useClickOutside(detailsRef, () => {
		setShowingNewPicker(false)
	})

	return (
		<Show when={folder.latest}>
			<details class="folder-card-link" ref={setDetailsRef}>
				<summary>
					<A href={"folders/" + folder.latest!.id}>
						{folder.latest!.icon || ""}
					</A>
					<button type="button" onclick={toggleShowingNewPicker}>
						+
					</button>
					<Show when={showingNewPicker()}>
						<ul class="new">
							<For each={fileTypes}>
								{type => (
									<li>
										<button
											type="button"
											onclick={() => {
												const file = lb.files.createHandleInFolder(
													folder.latest!.id,
													{
														name: "new file." + type.preferredFilenameExtension,
														contentType: type.identifier,
													},
												)

												file && nav("documents/" + file.docSync()!.id)
												setShowingNewPicker(false)
											}}>
											{type.description}
										</button>
									</li>
								)}
							</For>
							<li>
								<button
									type="button"
									onclick={async () => {
										const [computerFileHandle] = await showOpenFilePicker({
											_preferPolyfill: false,
											multiple: false,
										})
										const computerFile = await computerFileHandle.getFile()
										const bytes = new Uint8Array(
											await computerFile.arrayBuffer(),
										)
										const fileHandle = lb.files.import(computerFile, bytes)

										fileHandle.doc().then(file => {
											file &&
												changeFolder(
													lb.documents.addItem(
														fileHandle.documentId as lb.FileId,
													),
												)
										})
										fileHandle && nav("documents/" + fileHandle.documentId)
										setShowingNewPicker(false)
									}}>
									import
								</button>
							</li>
							<li>
								<button
									type="button"
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
										setShowingNewPicker(false)
									}}>
									folder
								</button>
							</li>
						</ul>
					</Show>
				</summary>
				<ul>
					<For each={folder.latest!.items}>
						{id => (
							<li>
								<ItemCardLink
									id={id}
									parentId={folder.latest!.id}
									parentRef={detailsRef}
								/>
							</li>
						)}
					</For>
				</ul>
			</details>
		</Show>
	)
}

function ItemCardLink(props: {
	id: lb.ItemId
	parentId: lb.FolderId
	parentRef: () => HTMLDetailsElement | undefined
}) {
	const [item] = useDocument<lb.Item>(() => props.id)
	createEffect(() => {
		const isActive = useParams<{itemId: lb.ItemId}>()?.itemId == props.id

		if (isActive && props.parentRef()) {
			let parent: HTMLDetailsElement | undefined | null = props.parentRef()!
			parent.open = true
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			while ((parent = parent.parentElement?.closest("details"))) {
				parent.open = true
			}
		}
	})

	return (
		<Show when={item()}>
			<Switch>
				<Match when={item()?.type == "folder"}>
					<FolderCardLink
						id={props.id as lb.FolderId}
						parentId={props.parentId}
					/>
				</Match>
				<Match when={item()?.type == "file"}>
					<FileCardLink
						id={props.id as lb.FileId}
						parentId={props.parentId}
					/>{" "}
				</Match>
			</Switch>
		</Show>
	)
}
