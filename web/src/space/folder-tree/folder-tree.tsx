import {
	For,
	Match,
	Show,
	Suspense,
	Switch,
	createEffect,
	createSignal,
	getOwner,
	runWithOwner,
} from "solid-js"
import useDocument from "../../documents/use-document.ts"

import getDock, {
	getActiveItemId,
	openToTheSide,
	selectItem,
} from "../area/dock.ts"
import "./folder-tree.scss"
import type {ChangeFn} from "@automerge/automerge/next"
import clsx from "clsx"
import EditableName from "../../documents/editable-name.tsx"
import useParents from "../../documents/use-parents.ts"
import Popout from "../../elements/popout/popout.tsx"
import Menu from "../../elements/menu/menu.tsx"
import NewFilePicker from "../../files/new-file-picker/new-file-picker.tsx"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import useHandle from "../../documents/use-document-handle.ts"
import createDocumentHandle from "../../documents/create-document-handle.ts"
import random from "random"
import type {AutomergeList} from "../../types.ts"
import {getElementBounds, type NullableBounds} from "@solid-primitives/bounds"

// todo this should probably be dumber
// and not actually know how to get the stuff
// only know how to show it
export function FolderTree(props: {
	id(): lb.FolderId | undefined
	parentId(): lb.AnyParentDocument["id"] | undefined
	label: string
	// selected: boolean
	// multi: false
}) {
	let [folder, change] = useDocument<lb.Folder>(props.id)
	let [expanded, setExpanded] = createSignal(false)
	let [dock] = getDock()
	let isCurrent = () => getActiveItemId(dock) == props.id()
	let parents = useParents()
	createEffect(() => {
		parents().set(props.id()!, props.parentId()!)
	})

	return (
		<Suspense>
			<div class="folder-tree" data-folder-id={props.id()}>
				<FolderTreeFolderInner
					role="tree"
					label={props.label}
					current={isCurrent}
					parentId={props.parentId}
					folder={folder}
					change={change}
					expanded={expanded}
					setExpanded={setExpanded}
					setParentExpanded={setExpanded}
					depth={0}
				/>
			</div>
		</Suspense>
	)
}

function FolderTreeItem(props: {
	id(): lb.ItemId | undefined
	parentId(): lb.AnyParentDocument["id"] | undefined
	setParentExpanded(val: boolean): void
	depth: number
}) {
	let [item] = useDocument<lb.Item>(props.id)
	let [grid] = getDock()
	let current = () => getActiveItemId(grid) == props.id()

	let parents = useParents()
	createEffect(() => {
		parents().set(props.id()!, props.parentId()!)
	})

	createEffect(() => {
		if (current()) {
			props.setParentExpanded(true)
		}
	})

	return (
		<Suspense>
			<li role="treeitem" data-depth={props.depth}>
				<Switch>
					<Match when={item.latest?.type == "folder"}>
						<FolderTreeFolder
							id={props.id as () => lb.FolderId}
							parentId={props.parentId}
							setParentExpanded={props.setParentExpanded}
							depth={props.depth}
							current={current}
						/>
					</Match>
					<Match when={item.latest?.type == "file"}>
						<FolderTreeFile
							id={props.id as () => lb.FileId}
							parentId={props.parentId as () => lb.FolderId}
							depth={props.depth}
							current={current}
						/>{" "}
					</Match>
				</Switch>
			</li>
		</Suspense>
	)
}

export function FolderTreeFolder(props: {
	id(): lb.FolderId | undefined
	parentId(): lb.AnyParentDocument["id"] | undefined
	setParentExpanded(val: boolean): void
	depth: number
	current(): boolean
}) {
	let [folder, change] = useDocument<lb.Folder>(props.id)
	let elementID = () => `folder-tree-folder-${folder.latest?.id}`
	let [expanded, setExpanded] = createSignal(false)

	return (
		<Suspense>
			<div
				class="folder-tree-item folder-tree-folder"
				id={elementID()}
				data-folder-id={props.id()}
				data-depth={props.depth}>
				<FolderTreeFolderInner
					{...props}
					parentId={props.parentId}
					folder={folder}
					change={change}
					expanded={expanded}
					setExpanded={setExpanded}
					setParentExpanded={props.setParentExpanded}
				/>
			</div>
		</Suspense>
	)
}

export function FolderTreeFolderInner(props: {
	role?: "tree" | "group"
	folder(): lb.Folder | undefined
	change(fn: ChangeFn<lb.Folder>): void
	parentId(): lb.AnyParentDocument["id"] | undefined
	expanded(): boolean
	setExpanded(fn: ((val: boolean) => boolean) | boolean): void
	setParentExpanded(val: boolean): void
	depth: number
	current(): boolean
	label?: string
}) {
	let elementID = () =>
		`folder-tree-${props.role || "group"}-${props.folder()?.id}`
	let [renaming, setRenaming] = createSignal(false)
	let [menuShowing, setMenuShowing] = createSignal(false)
	let [newFilePickerShowing, setNewFilePickerShowing] = createSignal(false)
	let owner = getOwner()
	let {repo} = useAutomerge()
	let [menuRef, setMenuRef] = createSignal<Element>()
	let [bounds, setBounds] = createSignal<NullableBounds>()

	return (
		<Suspense>
			<Popout when={menuShowing} mouse close={() => setMenuShowing(false)}>
				<Menu
					ref={setMenuRef}
					options={{
						new: "New file...",
						folder: "New folder",
						rename: "Rename",
						delete: "Delete",
					}}
					select={option => {
						setBounds(getElementBounds(menuRef()))
						setMenuShowing(false)
						if (option == "rename") {
							return setRenaming(true)
						}
						if (option == "delete") {
							runWithOwner(owner, () => {
								let [_parent, changeParent] = useDocument<lb.AnyParentDocument>(
									() => props.parentId(),
								)
								changeParent(parent => {
									// todo recursively delete item
									console.log("hello", parent.id, props.folder()?.id, [
										...parent.items,
									])
								})
							})
						}
						if (option == "new") {
							setNewFilePickerShowing(true)
							return
						}
						if (option == "folder") {
							let newFolderHandle = createDocumentHandle<lb.Folder>(repo, {
								type: "folder",
								items: [] as lb.ItemId[] as AutomergeList<lb.ItemId>,
								icon: random.choice([
									"🦔",
									"🍒",
									"🧀",
									"✨",
									"👽",
									"⭐",
									"💜",
									"🐰",
									"🐷",
								])!,
								name: "new folder",
								note: "",
							})
							props.change(folder => {
								folder.items.push(newFolderHandle.documentId as lb.FolderId)
							})
							selectItem(newFolderHandle.documentId as lb.ItemId)
						}
					}}
				/>
			</Popout>

			<Popout
				style={{top: bounds()?.top + "px", left: bounds()?.left + "px"}}
				when={newFilePickerShowing}
				close={() => setNewFilePickerShowing(false)}>
				<Show when={newFilePickerShowing()}>
					<NewFilePicker
						select={id => {
							runWithOwner(owner, () => {
								selectItem(id)
								setNewFilePickerShowing(false)
							})
						}}
						parentFolderId={() => props.folder()!.id}
					/>
				</Show>
			</Popout>

			<header
				class={clsx(
					"folder-tree-row",
					props.current() && "current",
					(newFilePickerShowing() || menuShowing()) && "menuing",
				)}
				onclick={() =>
					runWithOwner(
						owner,
						() => props.folder() && selectItem(props.folder()!.id),
					)
				}
				oncontextmenu={event => {
					event.preventDefault()
					event.stopImmediatePropagation()
					setMenuShowing(true)
				}}>
				<div
					class="folder-tree-indent"
					style={{
						width: `calc(var(--folder-tree-indent-size) * ${props.depth})`,
					}}
				/>
				<button
					type="button"
					class="folder-tree-expander"
					aria-label={`toggle ${props.folder()?.name} folder`}
					aria-controls={elementID()}
					aria-pressed={props.expanded()}
					onclick={event => {
						event.stopPropagation()
						props.setExpanded(val => !val)
					}}
					ondblclick={event => {
						event.preventDefault()
						setMenuShowing(true)
						event.stopImmediatePropagation()
					}}
				/>
				<button
					aria-pressed={props.current()}
					type="button"
					class="folder-tree-item-name folder-tree-folder-name">
					<span class="folder-tree-item-name__icon">
						{props.folder()?.icon || ""}
					</span>
					<span class="folder-tree-item-name__name">
						<EditableName
							name={() => props.folder()?.name}
							cancel={() => {
								setRenaming(false)
							}}
							save={name => {
								props.change(folder => {
									folder.name = name
								})
								setRenaming(false)
							}}
							renaming={renaming}
						/>
					</span>
				</button>
			</header>

			<ul
				hidden={!props.expanded()}
				id={elementID()}
				role={props.role || "group"}
				aria-multiselectable="false"
				aria-label={props.label}
				aria-expanded={props.expanded()}>
				<For each={props.folder()?.items}>
					{id => (
						<FolderTreeItem
							id={() => id}
							parentId={() => props.folder()?.id}
							setParentExpanded={val => {
								props.setExpanded(val)
								props.setParentExpanded(val)
							}}
							depth={props.depth + 1}
						/>
					)}
				</For>
			</ul>
		</Suspense>
	)
}

function FolderTreeFile(props: {
	id(): lb.FileId | undefined
	parentId(): lb.FolderId | undefined
	depth: number
	current(): boolean
}) {
	let [file, change, fileHandle] = useDocument<lb.File>(props.id)

	let [renaming, setRenaming] = createSignal(false)
	let [menuShowing, setMenuShowing] = createSignal(false)
	let owner = getOwner()
	let automerge = useAutomerge()

	return (
		<Suspense>
			<Popout
				mouse
				when={menuShowing}
				close={() => setMenuShowing(false)}
				style={{position: "fixed"}}>
				<Menu
					options={{
						rename: "Rename",
						delete: "Delete",
						side: "Open to the side",
					}}
					select={option => {
						setMenuShowing(false)
						if (option == "rename") {
							return setRenaming(true)
						}
						if (option == "delete") {
							runWithOwner(owner, () => {
								let parentHandle = useHandle<lb.Folder>(() => props.parentId())
								// todo make a deleteFile
								let contentHandle = automerge.repo.find(file()!.content)
								contentHandle.delete()
								parentHandle()
									?.doc()
									.then(parent => {
										if (!parent) {
											return
										}
										let index = parent.items.indexOf(props.id()!)
										parent.items.splice(index, 1)
										fileHandle()?.delete()
									})
							})

							return
						}
						if (option == "side") {
							runWithOwner(owner, () => {
								openToTheSide(props.id()!)
							})

							return
						}
					}}
				/>
			</Popout>

			<div
				class={clsx(
					"folder-tree-item folder-tree-file folder-tree-row",
					props.current() && "current",
					menuShowing() && "menuing",
				)}
				data-file-id={file.latest?.id}
				data-content-id={file.latest?.content}
				onclick={() => {
					runWithOwner(owner, () => {
						file.latest && selectItem(file.latest!.id)
					})
				}}
				oncontextmenu={event => {
					event.preventDefault()
					setMenuShowing(true)
					event.stopImmediatePropagation()
				}}>
				<div
					class="folder-tree-indent"
					style={{
						width: `calc(var(--folder-tree-indent-size) * ${props.depth})`,
					}}
				/>
				<button
					type="button"
					class="folder-tree-item-name folder-tree-file-name"
					aria-pressed={props.current()}
					ondblclick={event => {
						event.preventDefault()
						setMenuShowing(true)
						event.stopImmediatePropagation()
					}}>
					<span class="folder-tree-item-name__icon">
						{file.latest?.icon || "📄"}
					</span>
					<span class="folder-tree-item-name__name">
						<EditableName
							name={() => file.latest?.name}
							cancel={() => {
								setRenaming(false)
							}}
							save={name => {
								change(file => {
									file.name = name
								})
								setRenaming(false)
							}}
							renaming={renaming}
						/>
					</span>
				</button>
			</div>
		</Suspense>
	)
}
