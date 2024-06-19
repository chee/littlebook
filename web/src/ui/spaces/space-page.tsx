import type {ParentComponent} from "solid-js"
// todo dockview
import {Panel, PanelGroup, ResizeHandle} from "solid-resizable-panels"
import breakpoints from "../styles/breakpoints.ts"
import PrimarySidebar from "./sidebar/primary-sidebar.tsx"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import "./topnav.scss"
import "./resize-handle.scss"
import {type RouteSectionProps, useParams} from "@solidjs/router"
import sidebarStore from "./sidebar/sidebar-state.ts"

const SpacePage: ParentComponent<RouteSectionProps> = props => {
	// todo if we do not have access to the team associated with this shareId,
	// send us back to /
	// eventually tell us that though
	const [sidebarState, updateSidebarState] = sidebarStore
	let primarySidebarRef: undefined | HTMLDivElement
	const params = useParams<{projectId?: lb.ProjectId}>()
	return (
		<>
			<header class="space-header topnav">
				<section class="pl-4 topnav-left">
					<SidebarToggle which="primary" />
				</section>
				<section class="left-section topnav-middle" />
				<section class="right-section pl-r topnav-right">
					{params.projectId && <SidebarToggle which="secondary" />}
				</section>
			</header>
			<PanelGroup direction="row" class="flex grow">
				<Panel
					id="sidebar"
					class="flex grow max-w-full sidebar-panel"
					initialSize={breakpoints.m ? 19.1 : 100}
					minSize={breakpoints.m ? 20 : 100}
					ref={primarySidebarRef}
					onCollapse={() => {
						updateSidebarState({primary: false})
					}}
					onExpand={() => {
						updateSidebarState({primary: true})
					}}
					collapsible={true}>
					<PrimarySidebar />
				</Panel>
				<ResizeHandle class="resize-handle resize-handle-row" />
				<Panel id="main" initialSize={80.9}>
					<main id="main" class="h-full flex pt-2">
						{props.children}
					</main>
				</Panel>
			</PanelGroup>
		</>
	)
}

export default SpacePage
