import {type AutomergeUrl, type DocHandle} from "@automerge/automerge-repo"
import {For, getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import repo from "../../../repo/create.ts"
import "./document-list.css"
import {useDocument} from "solid-automerge"
import {useHome} from "../../../repo/home.ts"
import {parseDocumentURL, useDockAPI} from "../../../dock/dock.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import {useContentTypeRegistry} from "../../../registries/content-type-registry.ts"
import OpenWithContextMenu from "../../../dock/open-with.tsx"
import type {DocumentURL} from "../../../dock/dock-api.ts"
import Icon from "../../icons/icon.tsx"
import type {Entry} from "@pointplace/types"
import DocumentList, {andRemove} from "./document-list.tsx"

// todo this should use a generic DocumentList, wrapped with special behaviours
// and user can pin a folder to the sidebar as a DocumentList
export default function HomeWidget() {
	const [home, changeHome] = useHome()

	const owner = getOwner()
	const dockAPI = useDockAPI()

	const contentTypes = useContentTypeRegistry()
	const openDocument = (
		url: DocumentURL,
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
						create={({name, content, contentType}) => {
							const handle: DocHandle<unknown> = repo.create({
								type: "file",
								name,
								contentType: contentType,
								icon: contentTypes.get(contentType)?.icon ?? "",
								url: repo.create(content).url,
							} satisfies Entry)

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
