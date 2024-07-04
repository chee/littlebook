import {Show, Suspense, type ParentComponent} from "solid-js"
import PrimarySidebar from "./sidebar/primary-sidebar.tsx"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import Sidebar from "./sidebar/sidebar.tsx"
import {useUI} from "../ui/use-ui-state.tsx"
import FileViewer from "../files/file-viewer.tsx"
import {getActiveItemId, toggleSidebar} from "../ui/ui-state.ts"
import useDocument from "../documents/use-document.ts"
import InfoPanel from "../files/info-panel.tsx"
import Split from "../elements/split/split.ts"
import "./topnav.scss"
import "./split.scss"

const SpacePage: ParentComponent = () => {
	const [ui, updateUI] = useUI()
	const active = () => getActiveItemId(ui)
	const [activeDoc] = useDocument<lb.Item>(active)
	const fileId = () => {
		const doc = activeDoc.latest
		return (doc?.type == "file" && doc.id) || undefined
	}

	return (
		<>
			<header class="space-header topnav">
				<section class="topnav-left">
					<SidebarToggle
						open={() => ui.sidebars.primary}
						toggle={() => toggleSidebar("primary", ui, updateUI)}
					/>
				</section>
				<section class="topnav-middle" />
				<section class="topnav-right">
					<Show when={fileId()}>
						<SidebarToggle
							open={() => ui.sidebars.secondary}
							flip={true}
							toggle={() => toggleSidebar("secondary", ui, updateUI)}
						/>
					</Show>
				</section>
			</header>
			<div class="flex grow split">
				<Split
					sizes={ui.sidebars.sizes}
					snapOffset={140}
					gutterAlign="end"
					minSize={[0, 300, 0]}
					onDragEnd={sizes => {
						const [left, _middle, right] = sizes

						if (Math.floor(left) == 0) {
							updateUI("sidebars", "primary", false)
							ui.sidebars.primary = false
						}
						if (Math.floor(right) == 0) {
							updateUI("sidebars", "secondary", false)
							ui.sidebars.secondary = false
						}
						updateUI("sidebars", "sizes", sizes)
					}}>
					<Sidebar which="primary" open={() => ui.sidebars.primary}>
						<PrimarySidebar />
					</Sidebar>
					<main id="main" class="main flex">
						<Suspense>
							<FileViewer fileId={fileId()} />
						</Suspense>
					</main>
					<Sidebar which="secondary" open={() => ui.sidebars.secondary}>
						<Suspense>
							<InfoPanel fileId={fileId()} />
						</Suspense>
						{/* <NoteEditor /> */}
						{/* <MetadataViewer /> */}
					</Sidebar>
				</Split>
			</div>
		</>
	)
}

export default SpacePage
