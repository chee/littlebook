import type {AutomergeUrl, DocHandle} from "@automerge/automerge-repo"
import {For, getOwner, runWithOwner, Show} from "solid-js"
import NewDocumentMenu from "../../new-document-dropdown/new-document-dropdown.tsx"
import repo from "../../../repo/create.ts"
import {Button} from "@kobalte/core/button"
import "./document-list.css"
import {useHandle, createDocumentStore} from "automerge-repo-solid-primitives"
import type {Home} from "../../../repo/home.ts"
import homeURL from "../../../repo/home.ts"
import type {Entry} from "../../../documents/entry.ts"
import {type DockAPI} from "../../../dock/dock.tsx"

export default function HomeWidget(props: {
	// todo remove direct access to dv, instead create wrapper api for common ops
	// todo or provide it with a context.
	// todo any of these seems fine
	// todo wrapper api prop seems most testable though
	dockAPI?: DockAPI
}) {
	// todo some sort of wrapper that checks a doc is of the right type/matches schema?
	const homeHandle = useHandle<Home>(homeURL, {repo})
	const home = createDocumentStore(homeHandle)
	const owner = getOwner()

	function add(url: AutomergeUrl) {
		props.dockAPI.openDocument(url)
	}

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
						]}
						create={id => {
							let handle: DocHandle<Entry>
							if (id == "text") {
								handle = repo.create({
									type: "file",
									name: "new text document",
									contentType: "text",
									url: repo.create({text: "i am a new text document"})
										.url as AutomergeUrl,
								})
							} else if (id == "folder") {
								handle = repo.create({
									type: "file",
									name: "new folder",
									contentType: "folder",
									url: repo.create({
										files: [],
									}).url as AutomergeUrl,
								})
							}
							if (handle) {
								const url = handle.url as AutomergeUrl
								runWithOwner(owner, () => add(url))
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
					<For each={home()?.files}>
						{url => {
							const handle = useHandle<Entry>(() => url, {
								repo,
							})
							const store = createDocumentStore(handle)
							const pressed = () =>
								props.dockAPI.activePanelID == url
									? "true"
									: props.dockAPI.activePanelID.includes(url)
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
								<li>
									<Button
										class="document-list__button"
										onclick={() =>
											runWithOwner(owner, () => add(url))
										}
										aria-pressed={pressed()}>
										<Show when={store()} fallback="">
											{store.latest?.name ?? url}
										</Show>
									</Button>
								</li>
							)
						}}
					</For>
				</ul>
			</div>
		</div>
	)
}
