import "./sidebar.css"
import {For, getOwner, mapArray, runWithOwner, Show} from "solid-js"
import DocumentListWidget from "./document-list/document-list-widget.tsx"
import {useUserDocContext} from ":/domain/user/user.ts"
import {useDocHandle, useDocument} from "solid-automerge"
import {createFileEntry} from ":/docs/file-entry-doc.ts"
import {AreaDoc} from ":/docs/area-doc.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import {useDockAPI} from ":/ui/dock/dock.tsx"
import {useViewRegistry} from "@littlebook/plugin-api"
import NewDocumentMenu from ":/ui/components/new-document-dropdown/new-document-dropdown.tsx"

export default function Sidebar() {
	const user = useUserDocContext()
	const homeEntryURL = () => user()?.home
	const [home, handle] = useDocument<AreaDoc>(homeEntryURL())
	const viewRegistry = useViewRegistry()
	const standalones = () => [...viewRegistry.standalones()]
	const dock = useDockAPI()
	const owner = getOwner()

	return (
		<aside class="sidebar sidebar--left ui">
			<header class="sidebar-header">
				<NewDocumentMenu
					create={template => {
						runWithOwner(owner, () => {
							const url = createFileEntry(template)
							dock.openDocument(url)
							handle()?.change(doc => {
								if (!doc.files.includes(url)) {
									doc.files.push(url)
								}
							})
						})
					}}
				/>
			</header>
			<div class="sidebar-widgets">
				<Show when={home()}>
					<DocumentListWidget handle={handle() as DocHandle<AreaDoc>} />
				</Show>
				<For
					each={mapArray(
						() => user()?.areas,
						area => useDocHandle<AreaDoc>(area),
					)()}>
					{areaHandle => <DocumentListWidget handle={areaHandle()!} />}
				</For>

				<Show when={standalones().length}>
					<div class="sidebar-widget sidebar-widget--standalones">
						<header class="sidebar-widget__header">
							<span class="sidebar-widget__header-icon">🧿</span>
							<span class="sidebar-widget__header-title">
								Standalone views
							</span>
						</header>
						<div class="sidebar-widget__content">
							<For each={standalones()}>
								{view => (
									<button
										class="sidebar-widget__link"
										onClick={() => {
											runWithOwner(owner, () => {
												dock.openStandaloneView(view.id)
											})
										}}>
										<span>{view.icon || "💻"}</span>
										<span>{view.displayName ?? view.id}</span>
									</button>
								)}
							</For>
						</div>
					</div>
				</Show>
			</div>
			<footer class="sidebar-footer"></footer>
		</aside>
	)
}
