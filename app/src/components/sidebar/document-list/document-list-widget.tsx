import {getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import "./document-list.css"
import {createEntry} from "../../../repo/home.ts"
import {useDockAPI} from "../../../dock/dock.tsx"
import Icon from "../../icons/icon.tsx"
import DocumentList, {andRemove} from "./document-list.tsx"
import {useDocument} from "solid-automerge"
import type {
	AutomergeURL,
	AutomergeURLOrDocumentURL,
	Entry,
} from "@pointplace/types"

export default function DocumentListWidget(props: {url: AutomergeURL}) {
	const [rootEntry] = useDocument<Entry>(() => props.url)
	const [root, rootHandle] = useDocument<{
		files: AutomergeURL[]
	}>(() => rootEntry()?.url)
	const owner = getOwner()
	const dockAPI = useDockAPI()

	const openDocument = (
		url: AutomergeURLOrDocumentURL,
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
						create={({name, content}) => {
							const handle = createEntry({name, content})
							const url = handle.url
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
