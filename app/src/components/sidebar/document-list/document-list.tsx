import {type AutomergeUrl, type DocHandle} from "@automerge/automerge-repo"
import {For, getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import repo from "../../../repo/create.ts"
import "./document-list.css"
import {useDocument} from "solid-automerge"
import {useHome} from "../../../repo/home.ts"
import type {Entry} from "../../../documents/entry.ts"
import {parseDocumentURL, useDockAPI} from "../../../dock/dock.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import {useContentTypeRegistry} from "../../../registries/content-type/content-type-registry.ts"
import OpenWithContextMenu from "../../../dock/open-with.tsx"
import type {DocumentURL} from "../../../dock/dock-api.ts"

// todo this should use a generic DocumentList, wrapped with special behaviours
// and user can pin a folder to the sidebar as a DocumentList
export default function HomeWidget() {
	const [home, changeHome] = useHome()

	const owner = getOwner()
	const dockAPI = useDockAPI()

	const contentTypes = useContentTypeRegistry()

	return (
		<div
			class="sidebar-widget"
			ondragover={event => {
				event.preventDefault()
			}}
			ondrop={event => {
				event.preventDefault()
				event.dataTransfer.dropEffect = "link"
				console.log(event.dataTransfer.getData("text/plain"))
				console.log(event.dataTransfer, event)
			}}>
			<header class="sidebar-widget__header">
				<span>{home()?.name}</span>
				<div class="sidebar-widget__header-actions">
					<NewDocumentMenu
						create={({name, content, contentType}) => {
							const handle: DocHandle<unknown> = repo.create({
								type: "file",
								name,
								contentType: contentType,
								icon:
									contentTypes.get(contentType).unwrapOr({icon: ""})
										?.icon ?? "",
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
				<ul class="document-list">
					<For each={home()?.files}>
						{url => {
							const [doc, handle] = useDocument<Entry>(url)
							const pressed = () => {
								if (!dockAPI || !dockAPI.activePanelID) return "false"
								// move parseDocumentURL features into the api
								return parseDocumentURL(dockAPI.activePanelID).url ==
									url
									? "true"
									: dockAPI?.panelIDs?.includes(url)
										? "mixed"
										: "false"
							}

							{
								/* todo
								 * we want a context menu here
								 * you should be able to:
								 *	 - create a new file (or folder)
								 *	 - import a file
								 *	 - open
								 *	 - open to the side
								 *	 - open with
								 *	 - rename
								 *	 - transform (convert to a new file)
								 *	 - save to disk
								 *	 	- as Raw JSON
								 *	 	- as Automerge Document
								 *	 - publish (using Publisher)
								 *	 - export (using Exporter)
								 *   - add to home?
								 */
							}

							return (
								<li style={{width: "100%"}}>
									<ContextMenu>
										<ContextMenu.Trigger
											class="pop-menu__trigger document-list__button"
											onclick={() =>
												runWithOwner(owner, () =>
													dockAPI.openDocument(url)
												)
											}
											aria-pressed={pressed()}>
											<Show when={doc()} fallback="">
												{doc()!.name ?? url}
											</Show>
										</ContextMenu.Trigger>
										<ContextMenu.Portal>
											<ContextMenu.Content class="pop-menu__content">
												<ContextMenu.Item
													class="pop-menu__item"
													onSelect={() => {
														const name = window.prompt(
															"rename to:",
															doc()!.name
														)
														if (name) {
															handle()?.change(doc => {
																doc.name = name
															})
														}
													}}>
													rename
												</ContextMenu.Item>
												<ContextMenu.Item
													class="pop-menu__item"
													onSelect={() => {
														const files = Array.from(
															home()?.files || []
														)
														const index = files.indexOf(url)
														if (index != -1) {
															changeHome(home => {
																home.files.splice(index, 1)
															})
														}
													}}>
													remove
												</ContextMenu.Item>
												<OpenWithContextMenu
													url={url as DocumentURL}
												/>
											</ContextMenu.Content>
										</ContextMenu.Portal>
									</ContextMenu>
								</li>
							)
						}}
					</For>
				</ul>
			</div>
		</div>
	)
}
