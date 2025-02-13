import {type AutomergeUrl} from "@automerge/automerge-repo"
import {createEffect, getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import "./document-list.css"
import {createEntry} from "../../../repo/home.ts"
import {useDockAPI} from "../../../dock/dock.tsx"
import {useContentTypeRegistry} from "../../../registries/content-type-registry.ts"
import type {DocumentURL} from "../../../dock/dock-api.ts"
import Icon from "../../icons/icon.tsx"
import DocumentList, {andRemove} from "./document-list.tsx"
import {useDocument} from "solid-automerge"
import type {Entry} from "@pointplace/types"

export default function DocumentListWidget(props: {
	url: AutomergeUrl | DocumentURL
}) {
	const [rootEntry, rootEntryHandle] = useDocument<Entry>(() => props.url)
	const [root, rootHandle] = useDocument<{
		files: AutomergeUrl[]
	}>(() => rootEntry()?.url)
	const owner = getOwner()
	const dockAPI = useDockAPI()
	createEffect(() => {
		console.log({...root()})
	})

	const contentTypes = useContentTypeRegistry()

	const openDocument = (
		url: DocumentURL | AutomergeUrl,
		opts?: {side?: string; component?: string}
	) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))

	return (
		<div
			class="sidebar-widget"
			ondragover={event => {
				event.preventDefault()
				console.log(event.dataTransfer?.getData("text/plain"))
				console.log(event.dataTransfer?.files)
			}}
			ondrop={event => {
				event.preventDefault()
				if (!event.dataTransfer) return
				event.dataTransfer.dropEffect = "link"
				console.log(event.dataTransfer.getData("text/plain"))
				console.log(event.dataTransfer, event)
			}}>
			<header class="sidebar-widget__header">
				<Icon name={rootEntry()?.icon || ""} />
				<span>{rootEntry()?.name}</span>
				<div class="sidebar-widget__header-actions">
					<NewDocumentMenu
						create={({name, content, contentType}) => {
							const icon = contentTypes.get(contentType)?.icon
							const handle = createEntry({
								name,
								contentType,
								icon,
								content,
							})
							const url = handle.url as AutomergeUrl
							openDocument(url)
							runWithOwner(owner, () => dockAPI.openDocument(url))
							rootHandle()?.change(root => {
								root.files.push(url)
							})
						}}
					/>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<Show when={root()?.files} fallback="">
					<div role="tree">
						<DocumentList
							urls={root()!.files}
							depth={0}
							remove={url => rootHandle()?.change(andRemove(url))}
							openDocument={openDocument}
						/>
					</div>
				</Show>
			</div>
		</div>
	)
}
