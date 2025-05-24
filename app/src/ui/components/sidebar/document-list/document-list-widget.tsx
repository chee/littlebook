import {getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import "./document-list.css"
import {useDockAPI} from "../../../dock/dock.tsx"
import DocumentList from "./document-list.tsx"
import type {AutomergeURLOrDocumentURL} from ":/core/sync/url.ts"
import {createFileEntry, type FileEntryURL} from ":/docs/file-entry-doc.ts"
import type {AreaDoc} from ":/docs/area-doc.ts"

// todo obviously this should not be passed a URL
// the UI shouldn't know about automerge
// todo should be passed a rich _Area_, not an AreaDoc
export default function DocumentListWidget(props: {
	area: AreaDoc
	createFile(template: Parameters<typeof createFileEntry>[0]): FileEntryURL
}) {
	const owner = getOwner()
	const dockAPI = useDockAPI()

	const openDocument = (
		url: AutomergeURLOrDocumentURL,
		opts?: {side?: string; component?: string},
	) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))

	return (
		<div
			data-area={props.area.name}
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
				<div class="sidebar-widget__header-icon">🏡</div>
				<span class="sidebar-widget__header-title">{props.area.name}</span>
				<div class="sidebar-widget__header-actions">
					<NewDocumentMenu
						create={({name, content}) => {
							openDocument(props.createFile({name, content}))
						}}
					/>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<Show when={props.area.files} fallback="">
					<div role="tree">
						{/* todo this should take rich reactive File objects */}
						<DocumentList
							urls={props.area.files}
							depth={0}
							remove={async url => {
								const repo = window.repo
								// todo fix
								const home = await repo.find(
									(
										await repo.find(
											localStorage["littlebook:user-id"],
										)
									).doc().home,
								)
								home.change(doc => {
									const index = [...doc.files].indexOf(url)
									console.log(doc.files, doc)
									if (index > -1) {
										doc.files.splice(index, 1)
									}
								})
							}}
							openDocument={openDocument}
						/>
					</div>
				</Show>
			</div>
		</div>
	)
}
