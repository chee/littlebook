import {createEffect, type ParentComponent} from "solid-js"
import PrimarySidebar from "./sidebar/primary-sidebar.tsx"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import "./topnav.scss"
import "./resize-handle.scss"
import type {RouteSectionProps} from "@solidjs/router"
import Sidebar from "./sidebar/sidebar.tsx"
import InfoPanel from "../files/info-panel.tsx"
import MetadataViewer from "../files/metadata-viewer.tsx"
import createBoolean from "../lib/create-boolean.ts"

import ContentViewer from "../files/content-viewer.tsx"
import "dockview-core/dist/styles/dockview.css"

const SpacePage: ParentComponent<RouteSectionProps> = () => {
	const [primarySidebarOpen, togglePrimary] = createBoolean()
	const [secondarySidebarOpen, toggleSecondary] = createBoolean()

	return (
		<>
			<header class="space-header topnav">
				<section class="pl-xs topnav-left">
					<SidebarToggle open={primarySidebarOpen} toggle={togglePrimary} />
				</section>
				<section class="left-section topnav-middle" />
				<section class="right-section pl-r topnav-right">
					<SidebarToggle
						open={secondarySidebarOpen}
						flip={true}
						toggle={toggleSecondary}
					/>
				</section>
			</header>
			<div class="flex grow">
				<Sidebar open={primarySidebarOpen} which="primary">
					<PrimarySidebar />
				</Sidebar>
				<main id="main" class="flex grow">
					<ContentViewer />
				</main>
				<Sidebar open={secondarySidebarOpen} which="secondary">
					<InfoPanel />
					<MetadataViewer />
				</Sidebar>
			</div>
		</>
	)
}

export default SpacePage
