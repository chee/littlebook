import {
	createMemo,
	createSignal,
	For,
	getOwner,
	Match,
	runWithOwner,
	Show,
	Switch,
} from "solid-js"
import "./document-list.css"
import {createDocumentProjection} from "solid-automerge"
import {useDockAPI} from "../../../dock/dock.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import OpenWithContextMenu from "../../../dock/open-with.tsx"
import type {OpenDocumentOptions} from "../../../dock/dock-api.ts"
import Icon from "../../icons/icon.tsx"
import {Button} from "@kobalte/core/button"
import {updateText, type DocHandle} from "@automerge/vanillajs"
import {
	asAutomergeURL,
	asDocumentURL,
	isValidAutomergeURL,
	type AutomergeURL,
	type DocumentURL,
} from ":/core/sync/url.ts"
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useFileEntry, type FileEntry} from ":/domain/entry/file-entry.ts"
import {FolderShape} from "@littlebook/plugin-api/shapes/shapes.ts"
import {useUserContext} from ":/domain/user/user.ts"
import {IconPicker} from ":/ui/components/emoji-picker/emoji-picker.tsx"
import {pin} from ":/docs/user-doc.ts"
import type {AreaDoc} from ":/docs/area-doc.ts"
import {deleteAt} from "@automerge/automerge"
import reparent from ":/domain/reparent.ts"
import usePerfectRepo from ":/lib/sync/useRepo.ts"

export function andRemove(url: AutomergeURL) {
	return (doc: {files: AutomergeURL[]}) => {
		const files = Array.from(doc.files)
		const index = files.indexOf(url)

		if (index > -1) {
			deleteAt(doc.files, index)
		}
	}
}

export function andRename(name: string) {
	return (doc: {name: string}) => {
		updateText(doc, ["name"], name)
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
	urls: AutomergeURL[]
	depth: number
	parent: DocHandle<FolderShape> | undefined
}) {
	const owner = getOwner()
	const dockAPI = useDockAPI()
	const [_user, userHandle] = useUserContext()

	return (
		<div class="document-list" data-depth={props.depth} role="group">
			<For each={props.urls}>
				{url => {
					const entry = useFileEntry(asAutomergeURL(url))
					const content = createDocumentProjection<unknown>(
						() => entry()?.contentHandle,
					)
					const pressed = () => dockAPI.isPressed(url)
					const openDocument = (
						url: DocumentURL,
						opts?: OpenDocumentOptions,
					) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))

					return (
						<Show when={entry() && content()}>
							<div
								role="treeitem"
								ref={element => {
									draggable({
										element,
										getInitialData() {
											return {
												type: "entry",
												url,
												parentURL: props.parent?.url,
											}
										},
									})
								}}>
								<ContextMenu>
									<ContextMenu.Trigger>
										<DocumentListItem
											depth={props.depth}
											parent={props.parent}
											entry={entry()!}
											content={content()!}
											pressed={pressed()}
											openDocument={openDocument}
										/>
									</ContextMenu.Trigger>
									<ContextMenu.Portal>
										<ContextMenu.Content class="popmenu__content">
											<Show when={isFolder(content())}>
												<ContextMenu.Item
													class="popmenu__item"
													onSelect={() => {
														const u = entry()?.contentHandle?.url
														u &&
															userHandle()?.change(userDoc => {
																pin(u, userDoc)
															})
														;(
															entry()
																?.contentHandle as DocHandle<AreaDoc>
														)?.change(area => {
															area.name = entry()!.name
															area.icon = entry()!.icon
														})
														props.parent?.change(andRemove(url))
													}}>
													Pin
												</ContextMenu.Item>
											</Show>

											<ContextMenu.Item
												class="popmenu__item"
												onSelect={() => {
													if (!entry()) return
													const lastName = entry()!.name
													entry()!.name =
														window.prompt(
															"rename to:",
															entry()!.name,
														) ?? lastName
												}}>
												Rename
											</ContextMenu.Item>
											<ContextMenu.Item
												class="popmenu__item"
												onSelect={() => {
													console.log(props.parent?.doc(), url)
													props.parent?.change(andRemove(url))
												}}>
												Remove
											</ContextMenu.Item>

											<OpenWithContextMenu
												entry={entry()!}
												file={content()!}
												openDocument={openDocument}
											/>
										</ContextMenu.Content>
									</ContextMenu.Portal>
								</ContextMenu>
							</div>
						</Show>
					)
				}}
			</For>
		</div>
	)
}

interface DocumentListItemProps {
	parent: DocHandle<FolderShape> | undefined
	entry: FileEntry
	content: unknown
	openDocument(url: DocumentURL, opts?: OpenDocumentOptions): void
	pressed: "true" | "false" | "mixed"
	depth: number
}

// todo expand parent when active
export function DocumentListItem(props: DocumentListItemProps) {
	const isFolderish = createMemo(() => isFolder(props.content))
	return (
		<Show when={isFolderish()} fallback={<DocumentListFile {...props} />}>
			<DocumentListFolder
				{...props}
				content={props.content as FolderShape}
			/>
		</Show>
	)
}

export function DocumentListFile(props: DocumentListItemProps) {
	return (
		<Button
			class="document-list-item document-list-item--file"
			data-url={props.entry.url}
			onclick={() => props.openDocument(asDocumentURL(props.entry.url))}
			aria-pressed={props.pressed}>
			<div
				class="document-list-item__indent"
				style={{
					"padding-inline-start": props.depth
						? `calc(var(--space-6) * ${props.depth})`
						: "",
				}}
			/>

			<span class="document-list-item__icon">
				<IconPicker handle={props.entry.handle} fallback="📄" />
			</span>
			<span class="document-list-item__name">
				{props.entry.name ?? props.entry.url}
			</span>
		</Button>
	)
}

export function DocumentListFolder(
	props: DocumentListItemProps & {content: FolderShape},
) {
	const [expanded, setExpanded] = createSignal(false)
	const toggle = () => setExpanded(expanded => !expanded)

	const foldery = () => isFolder(props.content)
	const contentHandle = () =>
		props.entry.contentHandle as DocHandle<FolderShape> | undefined

	return (
		<>
			<Button
				ref={element => {
					dropTargetForElements({
						element,
						onDragEnter(event) {
							element.dataset.droptarget = "true"
						},
						onDragLeave(event) {
							delete element.dataset.droptarget
						},
						async onDrop(event) {
							delete element.dataset.droptarget
							element.dataset.droptarget = "false"
							const repo = usePerfectRepo()
							const lastParentHandle = await repo.find<FolderShape>(
								event.source.data.parentURL as AutomergeURL,
							)
							if (
								isValidAutomergeURL(event.source.data.url) &&
								contentHandle()
							) {
								const url = asAutomergeURL(event.source.data.url)
								reparent(url, lastParentHandle, contentHandle()!)
							}
						},
					})
				}}
				data-url={props.entry.url}
				class="popmenu__trigger popmenu__trigger--document-list document-list-item document-list-item--folder"
				aria-pressed={props.pressed}
				onClick={() => props.openDocument(asDocumentURL(props.entry.url))}>
				<div
					class="document-list-item__indent"
					style={{
						"padding-inline-start": props.depth
							? `calc(var(--space-6) * ${props.depth})`
							: "",
					}}
				/>
				<span class="document-list-item__icon">
					<IconPicker handle={props.entry.handle} fallback="📁" />
				</span>

				<span class="document-list-item__name">
					{props.entry.name || props.entry.url}
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
			<Show when={foldery() && props.entry.contentHandle}>
				<div hidden={!expanded()}>
					<DocumentList
						parent={
							(props.entry as FileEntry<FolderShape>).contentHandle!
						}
						urls={props.content.files}
						depth={props.depth + 1}
					/>
				</div>
			</Show>
		</>
	)
}

function isFolder(content: unknown): content is FolderShape {
	return (
		typeof content === "object" &&
		content !== null &&
		"files" in content &&
		Array.isArray((content as FolderShape).files) &&
		(content as FolderShape).files.every(file => isValidAutomergeURL(file))
	)
}
