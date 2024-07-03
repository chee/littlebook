import {For, Match, Show, Switch, createEffect, createSignal} from "solid-js"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useDocument from "../../documents/use-document.ts"
import {Card, CardItem} from "../../elements/card/card.tsx"
import UniformType from "../../files/uniform-type.ts"
import createBoolean from "../../lib/create-boolean.ts"
import {coderRegistry} from "../../files/content-coders.ts"
import {showOpenFilePicker} from "file-system-access"
import {editorViewRegistry} from "../../files/content-view.ts"
import useClickOutside from "solid-click-outside"

import "./primary-sidebar.scss"
import {Portal} from "solid-js/web"
import {getActiveItemId, selectItem} from "../../ui/ui-state.ts"
import {useUI} from "../../ui/use-ui-state.tsx"
import EditableName from "../../documents/editable-name.tsx"

export default function PrimarySidebar() {
	const automerge = useAutomerge()
	const [space, changeSpace] = useDocument<lb.Space>(() => automerge.home)
	const lb = useLittlebookAPI()
	const [ui, setUI] = useUI()
	const activeItemId = () => getActiveItemId(ui)

	return (
		<Show when={space()}>
			<Card>
				<CardItem icon="📥" title="inbox" href="inbox" />
			</Card>
			<Card>
				<CardItem icon="⭐" title="today" href="today" />
				<CardItem icon="📆" title="upcoming" href="upcoming" />
				<CardItem icon="🗃️" title="someday" href="someday" />
			</Card>
			<Card
				title="documents"
				headerAction={{
					label: "create folder",
					icon: "🆕",
					action() {
						const folderHandle = lb.folders.createHandle()
						folderHandle?.doc().then(folder => {
							if (folder) {
								const change = lb.spaces.addFolder(folder.id)
								change && changeSpace(change)
								selectItem(folder.id, ui, setUI)
							}
						})
					},
				}}>
				<For each={space()?.items}>
					{id => {
						return (
							<FolderCardItem
								id={id}
								parentId={space()!.id}
								active={activeItemId() == id}
							/>
						)
					}}
				</For>
			</Card>
		</Show>
	)
}

function FileCardItem(props: {
	id: lb.FileId
	parentId: lb.FolderId
	active?: boolean
}) {
	const [ui, setUI] = useUI()
	const [file, change] = useDocument<lb.File>(() => props.id)

	return (
		<Show when={file.latest}>
			<button
				type="button"
				class="card-item-name"
				aria-current={props.active ? "page" : "false"}
				onclick={() => selectItem(file.latest!.id, ui, setUI)}>
				{file.latest!.icon || ""}
				<EditableName
					id={props.id}
					name={file.latest!.name}
					saveName={name => {
						change(file => {
							file.name = name
						})
					}}
				/>
			</button>
		</Show>
	)
}

function FolderCardItem(props: {
	id: lb.FolderId
	parentId: lb.AnyParentDocument["id"]
	active?: boolean
}) {
	const [folder, changeFolder] = useDocument<lb.Folder>(() => props.id)
	const lb = useLittlebookAPI()
	const {repo} = useAutomerge()
	const [showingNewPicker, toggleShowingNewPicker, setShowingNewPicker] =
		createBoolean()
	const fileTypes = [...coderRegistry.getAllTypes()]
		.map(UniformType.get)
		.filter(type => type.preferredFilenameExtension)
		.filter(type => editorViewRegistry.getFirst(type))

	const [detailsRef, setDetailsRef] = createSignal<HTMLDetailsElement>()

	useClickOutside(detailsRef, () => {
		setShowingNewPicker(false)
	})

	const detailsBox = () => detailsRef() && detailsRef()!.getBoundingClientRect()
	const [ui, setUI] = useUI()

	// todo the button in the summary is not clickable on safari
	return (
		<Show when={folder.latest}>
			<details class="folder-card-item" ref={setDetailsRef}>
				<summary>
					<button
						type="button"
						onclick={() => selectItem(folder.latest!.id, ui, setUI)}
						aria-current={props.active ? "page" : "false"}
						class="card-item-name">
						{folder.latest!.icon || ""}
						<EditableName
							id={props.id}
							name={folder.latest!.name}
							saveName={name => {
								changeFolder(folder => {
									folder.name = name
								})
							}}
						/>
					</button>
					<button type="button" onclick={toggleShowingNewPicker}>
						+
					</button>
					<Show when={showingNewPicker()}>
						<Portal>
							<dialog
								open
								class="new-file-picker"
								style={{
									top: detailsBox()?.top + "px",
									left: detailsBox()?.right + "px",
								}}>
								<ul class="new">
									<li>
										<button
											type="button"
											onclick={async () => {
												const newFolderHandle = lb.folders.createHandle()

												newFolderHandle.doc().then(folder => {
													setShowingNewPicker(false)
													if (!folder) {
														return
													}

													changeFolder(lb.folders.addItem(folder.id))
													selectItem(folder.id, ui, setUI)
												})
											}}>
											folder
										</button>
									</li>
									<For each={fileTypes}>
										{type => (
											<li>
												<button
													type="button"
													onclick={() => {
														const file = lb.files.createHandleInFolder(
															folder.latest!.id,
															{
																name:
																	"new file." + type.preferredFilenameExtension,
																contentType: type.identifier,
															},
														)

														selectItem(file.docSync()!.id, ui, setUI)
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
													setShowingNewPicker(false)
													if (!file) {
														return
													}
													changeFolder(lb.folders.addItem(file.id))
													selectItem(file.id, ui, setUI)
												})
											}}>
											import
										</button>
									</li>
									<li>
										<button
											type="button"
											onclick={async () => {
												const id = window.prompt(
													"ok what's the id",
												) as lb.ItemId
												const itemHandle = repo.find<lb.Item>(id)
												itemHandle.doc().then(item => {
													setShowingNewPicker(false)
													if (
														!item ||
														!["folder", "package", "file"].includes(item.type)
													) {
														return
													}

													changeFolder(lb.folders.addItem(item.id))
													selectItem(item.id, ui, setUI)
												})
											}}>
											share
										</button>
									</li>
								</ul>
							</dialog>
						</Portal>
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
	const [ui] = useUI()
	const isActive = () => getActiveItemId(ui) == props.id

	createEffect(() => {
		if (isActive() && props.parentRef()) {
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
					<FolderCardItem
						id={props.id as lb.FolderId}
						parentId={props.parentId}
						active={isActive()}
					/>
				</Match>
				<Match when={item()?.type == "file"}>
					<FileCardItem
						id={props.id as lb.FileId}
						parentId={props.parentId}
						active={isActive()}
					/>{" "}
				</Match>
			</Switch>
		</Show>
	)
}
