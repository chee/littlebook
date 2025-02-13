import {
	For,
	Match,
	Suspense,
	Switch,
	createEffect,
	createSignal,
	getOwner,
	runWithOwner,
} from "solid-js"

import "./folder-tree.css"
import clsx from "clsx"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {useDocument} from "solid-automerge"
import {useDockAPI} from "../../dock/dock.tsx"
import type {AutomergeUrl, DocHandle} from "@automerge/automerge-repo"
import type {Entry} from "@pointplace/types"
import Icon from "../icons/icon.tsx"

interface Parent {
	files: AutomergeUrl[]
}

export function FolderTree(props: {
	url: DocumentURL | undefined
	parentURL: DocumentURL | undefined
	label: string
	// selected: boolean
	// multi: false
}) {
	const dockAPI = useDockAPI()
	const [entry, entryHandle] = useDocument<Entry>(() => props.url)
	const [folder, folderHandle] = useDocument<Parent>(() => entry()?.url)
	const [expanded, setExpanded] = createSignal(false)
	const isCurrent = () => dockAPI.activePanelID === props.url

	return (
		<Suspense>
			<div class="folder-tree" data-folder-id={props.url}>
				<FolderTreeFolderInner
					role="tree"
					label={props.label}
					isCurrent={isCurrent()}
					parentURL={props.parentURL}
					entry={entry()}
					folder={folder()}
					entryHandle={entryHandle()}
					folderHandle={folderHandle()}
					isExpanded={expanded()}
					setExpanded={setExpanded}
					setParentExpanded={setExpanded}
					depth={0}
				/>
			</div>
		</Suspense>
	)
}

function FolderTreeItem(props: {
	url: DocumentURL | undefined
	parentURL: DocumentURL | undefined
	setParentExpanded(val: boolean): void
	depth: number
}) {
	const dockAPI = useDockAPI()
	const [entry, entryHandle] = useDocument<Entry>(() => props.url)
	const [item, itemHandle] = useDocument<unknown>(() => entry()?.url)

	const current = () => dockAPI.activePanelID == props.url

	createEffect(() => {
		if (current()) {
			props.setParentExpanded(true)
		}
	})

	// todo when conforms to folder
	// todo entry()?.contentType == "public.folder"

	return (
		<Suspense>
			<li role="treeitem" data-depth={props.depth}>
				<Switch>
					<Match when={item()?.files}>
						<FolderTreeFolder
							url={props.url}
							parentURL={props.parentURL}
							setParentExpanded={props.setParentExpanded}
							depth={props.depth}
							isCurrent={current()}
						/>
					</Match>
					<Match when={!item()?.files}>
						<FolderTreeFile
							url={props.url}
							parentURL={props.parentURL}
							depth={props.depth}
							isCurrent={current()}
						/>{" "}
					</Match>
				</Switch>
			</li>
		</Suspense>
	)
}

export function FolderTreeFolder(props: {
	url: DocumentURL | undefined
	parentURL: DocumentURL | undefined
	setParentExpanded(val: boolean): void
	depth: number
	isCurrent: boolean
}) {
	const [entry, entryHandle] = useDocument<Entry>(() => props.url)
	const [folder, folderHandle] = useDocument<Parent>(() => entry()?.url)
	const elementID = () => `folder-tree-folder-${entry()?.url}`
	const [expanded, setExpanded] = createSignal(false)

	return (
		<Suspense>
			<div
				class="folder-tree-item folder-tree-folder"
				id={elementID()}
				data-folder-id={props.url}
				data-depth={props.depth}>
				<FolderTreeFolderInner
					{...props}
					parentURL={props.parentURL}
					folder={folder()}
					entry={entry()}
					entryHandle={entryHandle()}
					folderHandle={folderHandle()}
					isExpanded={expanded()}
					setExpanded={setExpanded}
					setParentExpanded={props.setParentExpanded}
				/>
			</div>
		</Suspense>
	)
}

export function FolderTreeFolderInner(props: {
	role?: "tree" | "group"
	entry: Entry | undefined
	entryHandle: DocHandle<Entry> | undefined
	folder: Parent | undefined
	folderHandle: DocHandle<Parent> | undefined
	parentURL: AutomergeUrl | undefined
	isExpanded: boolean
	isCurrent: boolean
	depth: number
	label?: string

	setExpanded(fn: ((val: boolean) => boolean) | boolean): void
	setParentExpanded(val: boolean): void
}) {
	const elementID = () =>
		`folder-tree-${props.role || "group"}-${props.folderHandle?.url}`

	const owner = getOwner()
	const dockAPI = useDockAPI()

	return (
		<Suspense>
			<header
				class={clsx(
					"folder-tree-row",
					props.isCurrent && "folder-tree-row--current"
				)}
				onclick={() =>
					runWithOwner(
						owner,
						() =>
							props.entry?.url && dockAPI.openDocument(props.entry!.url)
					)
				}>
				<div
					class="folder-tree-indent"
					style={{
						width: `calc(var(--folder-tree-indent-size) * ${props.depth})`,
					}}
				/>
				<button
					type="button"
					class="folder-tree-expander"
					aria-label={`toggle ${props.entry?.name} folder`}
					aria-controls={elementID()}
					aria-pressed={props.isExpanded}
					onclick={event => {
						event.stopPropagation()
						props.setExpanded(val => !val)
					}}
				/>
				<button
					aria-pressed={props.isCurrent}
					type="button"
					class="folder-tree-item-name folder-tree-folder-name">
					<span class="folder-tree-item-name__icon">
						<Icon name="folder-bold" />
					</span>
					<span class="folder-tree-item-name__name">
						{props.entry?.name}
					</span>
				</button>
			</header>

			<ul
				hidden={!props.isExpanded}
				id={elementID()}
				role={props.role || "group"}
				aria-multiselectable="false"
				aria-label={props.label}
				aria-expanded={props.isExpanded}>
				<For each={props.folder?.files}>
					{id => (
						<FolderTreeItem
							url={id as DocumentURL}
							parentURL={props.entry?.url}
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
	url: DocumentURL | undefined
	parentURL: DocumentURL | undefined
	depth: number
	isCurrent: boolean
}) {
	const [entry, entryHandle] = useDocument<Entry>(() => props.url)
	const owner = getOwner()
	const dockAPI = useDockAPI()

	return (
		<Suspense>
			<div
				class={clsx(
					"folder-tree-item folder-tree-file folder-tree-row",
					props.isCurrent && "current"
				)}
				data-entry-url={entryHandle()?.url}
				data-file-url={entry()?.url}>
				<div
					class="folder-tree-indent"
					style={{
						width: `calc(var(--folder-tree-indent-size) * ${props.depth})`,
					}}
				/>
				<button
					type="button"
					onclick={() => {
						console.log("openin")
						runWithOwner(
							owner,
							() => props.url && dockAPI.openDocument(props.url)
						)
					}}
					class="folder-tree-item-name folder-tree-file-name"
					aria-pressed={props.isCurrent}>
					<span class="folder-tree-item-name__icon">
						<Icon name={entry()?.icon || "document-bold"} inline />
					</span>
					<span class="folder-tree-item-name__name">{entry()?.name}</span>
				</button>
			</div>
		</Suspense>
	)
}
