import {
	createSignal,
	For,
	getOwner,
	Match,
	runWithOwner,
	Show,
	Switch,
} from "solid-js"
import "./document-list.css"
import {useDocument} from "solid-automerge"
import {useDockAPI} from "../../../dock/dock.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import OpenWithContextMenu from "../../../dock/open-with.tsx"
import type {OpenDocumentOptions} from "../../../dock/dock-api.ts"
import Icon from "../../icons/icon.tsx"
import {Button} from "@kobalte/core/button"
import type {AutomergeUrl} from "@automerge/vanillajs"
import {
	asAutomergeURL,
	asDocumentURL,
	type AutomergeURL,
	type DocumentURL,
} from ":/core/sync/url.ts"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"

export function andRemove(url: AutomergeURL) {
	return (doc: {files: AutomergeURL[]}) => {
		const files = Array.from(doc.files)
		const index = files.indexOf(url)
		if (index > -1) {
			files.splice(index, 1)
		}
	}
}

// todo update via updateText?
export function andRename(name: string) {
	return (doc: {name: string}) => {
		doc.name = name
	}
}

/* //todo
 * we want a context menu here
 * you should be able to:
 *	 - ✅ create a new file (or folder)
 *	 - import a file
 *	 - open
 *	 - ✅ open to the side
 *	 - ✅ open with
 *	 - ✅ rename
 *	 - transform (convert to a new file)
 *	 - save to disk
 *	 	- as Raw JSON
 *	 	- as Automerge Document
 *	 - publish (using Publisher)
 *	 - export (using Exporter)
 *   - add to home?
 */

// todo add drag+drop
export default function DocumentList(props: {
	remove(url: AutomergeURL): void
	urls: AutomergeURL[]
	depth: number
	openDocument(url: DocumentURL, opts?: OpenDocumentOptions): void
}) {
	const owner = getOwner()
	const dockAPI = useDockAPI()

	return (
		<div class="document-list" data-depth={props.depth} role="group">
			<For each={props.urls}>
				{url => {
					const [entry, entryHandle] = useDocument<FileEntryDoc>(
						asAutomergeURL(url),
					)
					const [file] = useDocument<unknown>(
						() => entry() && asAutomergeURL(entry()!.url),
					)
					const pressed = () => dockAPI.isPressed(url)
					const openDocument = (
						url: DocumentURL,
						opts?: OpenDocumentOptions,
					) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))
					function rename(name: string | null) {
						if (!name) return
						entryHandle()?.change(andRename(name))
					}

					return (
						<div role="treeitem">
							<ContextMenu>
								<ContextMenu.Trigger>
									<Show when={entry() && file()} fallback="">
										<DocumentListItem
											depth={props.depth}
											url={url}
											openDocument={openDocument}
											pressed={pressed()}
											isFolder={"files" in file()!}
											rename={rename}
										/>
									</Show>
								</ContextMenu.Trigger>
								<ContextMenu.Portal>
									<ContextMenu.Content class="popmenu__content">
										<ContextMenu.Item
											class="popmenu__item"
											onSelect={() => {
												rename(
													window.prompt(
														"rename to:",
														entry()!.name,
													),
												)
											}}>
											rename
										</ContextMenu.Item>
										<ContextMenu.Item
											class="popmenu__item"
											onSelect={() => {
												props.remove(url)
											}}>
											remove
										</ContextMenu.Item>
										<OpenWithContextMenu
											url={url}
											openDocument={openDocument}
										/>
									</ContextMenu.Content>
								</ContextMenu.Portal>
							</ContextMenu>
						</div>
					)
				}}
			</For>
		</div>
	)
}

// todo pass down remove() and move()
interface DocumentListItemProps {
	url: AutomergeURL
	openDocument(url: DocumentURL, opts?: OpenDocumentOptions): void
	pressed: "true" | "false" | "mixed"
	isFolder: boolean
	rename(url: AutomergeURL, name: string): void
	depth: number
}

// todo expand parent when active
export function DocumentListItem(props: DocumentListItemProps) {
	return (
		<Switch>
			<Match when={props.isFolder}>
				<DocumentListFolder {...props} />
			</Match>
			<Match when={!props.isFolder}>
				<DocumentListFile {...props} />
			</Match>
		</Switch>
	)
}

export function DocumentListFile(props: DocumentListItemProps) {
	const [entry] = useDocument<FileEntryDoc>(() => props.url)

	return (
		<Button
			class="document-list-item"
			onclick={() => props.openDocument(asDocumentURL(props.url))}
			aria-pressed={props.pressed}>
			{/* <span class="document-list-item__expander" /> */}
			<div
				class="document-list-item__indent"
				style={{
					"padding-inline-start": props.depth
						? `calc(var(--space-6) * ${props.depth})`
						: "",
				}}
			/>
			<span class="document-list-item__icon">{entry()?.icon ?? "📄"}</span>
			<span class="document-list-item__name">
				{entry()!.name ?? props.url}
			</span>
		</Button>
	)
}

export function DocumentListFolder(props: DocumentListItemProps) {
	const [expanded, setExpanded] = createSignal(false)
	const toggle = () => setExpanded(expanded => !expanded)
	const [entry] = useDocument<FileEntryDoc>(() => props.url)
	const [folder, folderHandle] = useDocument<{files: AutomergeUrl[]}>(
		() => entry()?.url,
	)

	return (
		<>
			<Button
				class="popmenu__trigger popmenu__trigger--document-list document-list-item"
				aria-pressed={props.pressed}
				onClick={() => props.openDocument(asDocumentURL(props.url))}>
				<div
					class="document-list-item__indent"
					style={{
						"padding-inline-start": props.depth
							? `calc(var(--space-6) * ${props.depth})`
							: "",
					}}
				/>
				<span class="document-list-item__icon">
					{entry()?.icon ?? "📁"}
				</span>

				<span class="document-list-item__name">
					{entry()!.name ?? props.url}
				</span>

				<button
					class="document-list-item__expander"
					onClick={event => {
						event.stopPropagation()
						toggle()
					}}>
					<Switch>
						<Match when={expanded()}>
							<Icon name="alt-arrow-down-bold" />
						</Match>
						<Match when={!expanded()}>
							<Icon name="alt-arrow-right-bold" />
						</Match>
					</Switch>
				</button>
			</Button>
			<Show when={folder()}>
				<div role="group" hidden={!expanded()}>
					<DocumentList
						remove={url => folderHandle()!.change(andRemove(url))}
						urls={folder()!.files}
						depth={props.depth + 1}
						openDocument={props.openDocument}
					/>
				</div>
			</Show>
		</>
	)
}
