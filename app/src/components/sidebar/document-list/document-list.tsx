import {
	deleteAt,
	type AutomergeUrl,
	type DocHandle,
} from "@automerge/automerge-repo"
import {createMemo, For, getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import repo from "../../../repo/create.ts"
import {Button} from "@kobalte/core/button"
import "./document-list.css"
import {useHandle, createDocumentStore} from "automerge-repo-solid-primitives"
import type {Home} from "../../../repo/home.ts"
import homeURL from "../../../repo/home.ts"
import type {Entry} from "../../../documents/entry.ts"
import {useDockAPI} from "../../../dock/dock.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"

export default function HomeWidget() {
	const homeHandle = useHandle<Home>(homeURL, {repo})
	const home = createDocumentStore(homeHandle)
	const owner = getOwner()
	const dockAPI = useDockAPI()

	// todo why do i have to do this?
	const uniqueFiles = createMemo(() => {
		const files = home()?.files || []
		return Array.from(new Set(files))
	})

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
						creators={[
							{label: "folder", id: "folder"},
							{
								label: "plain text",
								id: "text",
							},
							{
								label: "rich text",
								id: "richtext",
							},
							{label: "voice note", id: "sound"},
							{label: "canvas", id: "canvas"},
							{label: "monkey", id: "monkey"},
						]}
						create={id => {
							let handle: DocHandle<Entry>
							if (id == "text") {
								handle = repo.create({
									type: "file",
									name: "new text document",
									contentType: "text",
									url: repo.create({
										text: "i am a new text document",
										language: "",
									}).url,
								})
							} else if (id == "folder") {
								handle = repo.create({
									type: "file",
									name: "new folder",
									contentType: "folder",
									url: repo.create({
										files: [],
									}).url,
								})
							} else if (id == "monkey") {
								handle = repo.create({
									type: "file",
									name: "new monkey",
									contentType: "monkey",
									url: repo.create({
										monkey: "🐒",
										heho: "heho",
									}).url,
								})
							}
							if (handle) {
								const url = handle.url as AutomergeUrl
								runWithOwner(owner, () => dockAPI.openDocument(url))
							}
						}}
						importers={[
							{label: "from file", id: "file"},
							{label: "from URL", id: "url"},
						]}
						import={id => {
							console.info(`she wants to import from ${id}`)
						}}
					/>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<ul class="document-list">
					<For each={uniqueFiles()}>
						{url => {
							const handle = useHandle<Entry>(() => url, {
								repo,
							})
							const store = createDocumentStore(handle)
							const pressed = () =>
								dockAPI?.activePanelID == url
									? "true"
									: dockAPI?.panelIDs?.includes(url)
										? "mixed"
										: "false"

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
											<Show when={store()} fallback="">
												{store.latest?.name ?? url}
											</Show>
										</ContextMenu.Trigger>
										<ContextMenu.Portal>
											<ContextMenu.Content class="pop-menu__content">
												<ContextMenu.Item
													class="pop-menu__item"
													onSelect={() => {
														const name = window.prompt(
															"rename to:",
															store.latest?.name
														)
														if (name) {
															handle().change(doc => {
																doc.name = name
															})
														}
													}}>
													rename
												</ContextMenu.Item>
												<ContextMenu.Item
													class="pop-menu__item"
													onSelect={() => {
														homeHandle().change(home => {
															const index = Array.from(
																home.files
															).indexOf(url)
															if (index != -1) {
																deleteAt(home.files, index)
															}
														})
													}}>
													remove
												</ContextMenu.Item>
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
