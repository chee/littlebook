import {type AutomergeUrl} from "@automerge/automerge-repo"
import {getOwner, runWithOwner} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import "./document-list.css"
import {createEntry, useHome} from "../../../repo/home.ts"
import {useDockAPI} from "../../../dock/dock.tsx"
import Icon from "../../icons/icon.tsx"
import type {AutomergeURLOrDocumentURL} from "@pointplace/types"
import DocumentList, {andRemove} from "./document-list.tsx"

export default function HomeWidget() {
	const [home, changeHome] = useHome()

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
				<Icon name="ghost-smile-bold" />
				<span>{home()?.name}</span>
				<div class="sidebar-widget__header-actions">
					<NewDocumentMenu
						create={({name, content}) => {
							const handle = createEntry({name, content})
							const url = handle.url as AutomergeUrl
							runWithOwner(owner, () => {
								dockAPI.openDocument(url)
								changeHome(home => {
									home.files.push(url)
								})
							})
						}}
					/>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<div role="tree">
					<DocumentList
						urls={home()?.files ?? []}
						depth={0}
						remove={url => changeHome(andRemove(url))}
						openDocument={openDocument}
					/>
				</div>
			</div>
		</div>
	)
}
