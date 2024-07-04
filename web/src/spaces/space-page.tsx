import {Suspense, type ParentComponent} from "solid-js"
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
						toggle={() => toggleSidebar("primary", updateUI)}
					/>
				</section>
				<section class="topnav-middle" />
				<section class="topnav-right">
					<SidebarToggle
						open={() => ui.sidebars.secondary}
						flip={true}
						toggle={() => toggleSidebar("secondary", updateUI)}
					/>
				</section>
			</header>
			<div class="flex grow split">
				<Split
					sizes={ui.sidebars.sizes.map(n => n || 33)}
					// withInstance={split => {
					// 	console.log(split)
					// }}

					onDragEnd={sizes => {
						updateUI("sidebars", "sizes", sizes)
					}}>
					<Sidebar open={() => ui.sidebars.primary} which="primary">
						<PrimarySidebar />
					</Sidebar>
					<main id="main" class="flex grow main">
						<Suspense>
							<FileViewer fileId={fileId()} />
						</Suspense>
					</main>
					<Sidebar open={() => ui.sidebars.secondary} which="secondary">
						<Suspense>
							<InfoPanel fileId={fileId()} />
						</Suspense>

						{/* <MetadataViewer /> */}
					</Sidebar>
				</Split>
			</div>
		</>
	)
}

export default SpacePage
