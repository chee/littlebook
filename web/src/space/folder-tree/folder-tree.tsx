import {
	For,
	Match,
	Show,
	Suspense,
	Switch,
	createEffect,
	createSignal,
} from "solid-js"
import {useUI} from "../../ui/use-ui-state.tsx"
import useDocument from "../../documents/use-document.ts"

import {getActiveItemId, selectItem} from "../../ui/ui-state.ts"
import "./folder-tree.scss"
import type {ChangeFn} from "@automerge/automerge/next"
import clsx from "clsx"
import EditableName from "../../documents/editable-name.tsx"
import useParents from "../../documents/use-parents.ts"
import FileMenu from "../../files/file-menu/file-menu.tsx"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {Portal} from "solid-js/web"
import Popout from "../../elements/popout/popout.tsx"
import Menu from "../../elements/menu/menu.tsx"
export function FolderTree(props: {
	id(): lb.FolderId | undefined
	parentId(): lb.AnyParentDocument["id"] | undefined
	label: string
	// selected: boolean
	// multi: false
}) {
	const [folder, change] = useDocument<lb.Folder>(props.id)
	const [expanded, setExpanded] = createSignal(false)
	const [ui] = useUI()
	const elementID = () => `folder-tree-${props.id()}`
	const isCurrent = () => getActiveItemId(ui) == props.id()
	const parents = useParents()
	createEffect(() => {
		parents().set(props.id()!, props.parentId()!)
	})

	return (
		<Suspense>
			<div
				class="folder-tree"
				role="tree"
				id={elementID()}
				data-folder-id={props.id()}
				aria-selected={isCurrent()}
				aria-current={isCurrent()}
				aria-multiselectable="false"
				aria-label={props.label}
				aria-expanded={expanded()}>
				<FolderTreeFolderInner
					{...props}
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
	const [item] = useDocument<lb.Item>(props.id)
	const [ui] = useUI()
	const isActive = () => getActiveItemId(ui) == props.id()

	const parents = useParents()
	createEffect(() => {
		parents().set(props.id()!, props.parentId()!)
	})

	createEffect(() => {
		if (isActive()) {
			props.setParentExpanded(true)
		}
	})

	return (
		<Suspense>
			<Switch>
				<Match when={item.latest?.type == "folder"}>
					<FolderTreeFolder
						id={props.id as () => lb.FolderId}
						parentId={props.parentId}
						setParentExpanded={props.setParentExpanded}
						depth={props.depth}
						current={isActive}
					/>
				</Match>
				<Match when={item.latest?.type == "file"}>
					<FolderTreeFile
						id={props.id as () => lb.FileId}
						parentId={props.parentId as () => lb.FolderId}
						depth={props.depth}
						current={isActive}
					/>{" "}
				</Match>
			</Switch>
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
	const [folder, change] = useDocument<lb.Folder>(props.id)
	const elementID = () => `folder-tree-folder-${folder.latest?.id}`
	const [expanded, setExpanded] = createSignal(false)

	return (
		<Suspense>
			<div
				class="folder-tree-item folder-tree-folder"
				role="group"
				id={elementID()}
				data-folder-id={props.id()}
				aria-multiselectable="false"
				aria-selected={props.current()}
				aria-current={props.current()}
				aria-expanded={expanded()}
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
	folder(): lb.Folder | undefined
	change(fn: ChangeFn<lb.Folder>): void
	parentId(): lb.AnyParentDocument["id"] | undefined
	expanded(): boolean
	setExpanded(fn: ((val: boolean) => boolean) | boolean): void
	setParentExpanded(val: boolean): void
	depth: number
	current(): boolean
}) {
	const elementID = () => `folder-tree-folder-${props.folder()?.id}`
	const [ui, updateUI] = useUI()
	const [renaming, setRenaming] = createSignal(false)
	const lb = useLittlebookAPI()
	const [menuShowing, setMenuShowing] = createSignal(false)

	return (
		<Suspense>
			<Show when={menuShowing()}>
				<Portal>
					<Popout
						mouse
						close={() => setMenuShowing(false)}
						style={{position: "fixed"}}>
						<Menu
							options={{
								rename: "rename",
								delete: "delete",
							}}
							select={option => {
								setMenuShowing(false)
								if (option == "rename") {
									return setRenaming(true)
								}
								if (option == "delete") {
									const [_parent, changeParent] = useDocument(() =>
										props.parentId(),
									)
									return changeParent(
										lb.folders.deleteItem(props.folder()?.id!),
									)
								}
							}}
						/>
					</Popout>
				</Portal>
			</Show>
			<header class={clsx("folder-tree-row", props.current() && "current")}>
				<div
					class="folder-tree-indent"
					style={{width: `calc(var(--folder-tree-indent) * ${props.depth})`}}
				/>
				<button
					type="button"
					class="folder-tree-expander"
					aria-controls={elementID()}
					onclick={() => props.setExpanded(val => !val)}
				/>
				<button
					type="button"
					onclick={() =>
						props.folder() && selectItem(props.folder()!.id, ui, updateUI)
					}
					oncontextmenu={event => {
						event.preventDefault()
						setMenuShowing(true)
					}}
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

			<ul hidden={!props.expanded()}>
				<For each={props.folder()?.items}>
					{id => (
						<li>
							<FolderTreeItem
								id={() => id}
								parentId={() => props.folder()?.id}
								setParentExpanded={val => {
									props.setExpanded(val)
									props.setParentExpanded(val)
								}}
								depth={props.depth + 1}
							/>
						</li>
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
	const [file, change] = useDocument<lb.File>(props.id)
	const [ui, updateUI] = useUI()
	const [renaming, setRenaming] = createSignal(false)
	const [menuShowing, setMenuShowing] = createSignal(false)
	const lb = useLittlebookAPI()

	return (
		<Suspense>
			<div
				class={clsx(
					"folder-tree-item folder-tree-file folder-tree-row",
					props.current() && "current",
				)}
				data-file-id={file.latest?.id}
				data-content-id={file.latest?.content}
				role="treeitem"
				data-depth={props.depth}
				aria-selected={props.current()}
				aria-current={props.current()}>
				<Show when={menuShowing()}>
					<Portal>
						<Popout
							mouse
							close={() => setMenuShowing(false)}
							style={{position: "fixed"}}>
							<FileMenu
								select={option => {
									setMenuShowing(false)
									if (option == "rename") {
										return setRenaming(true)
									}
									if (option == "delete") {
										console.log(file()?.name, props.id(), props.parentId())
										return lb.files.deleteFile(props.id()!, props.parentId())
									}
								}}
							/>
						</Popout>
					</Portal>
				</Show>
				<div
					class="folder-tree-indent"
					style={{width: `calc(var(--folder-tree-indent) * ${props.depth})`}}
				/>
				<button
					type="button"
					onclick={() => {
						file.latest && selectItem(file.latest!.id, ui, updateUI)
					}}
					oncontextmenu={event => {
						event.preventDefault()
						setMenuShowing(true)
					}}
					class="folder-tree-item-name folder-tree-file-name">
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
