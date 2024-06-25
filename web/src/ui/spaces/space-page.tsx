import {Show, type ParentComponent} from "solid-js"
// todo dockview
import breakpoints from "../styles/breakpoints.ts"
import PrimarySidebar from "./sidebar/primary-sidebar.tsx"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import "./topnav.scss"
import "./resize-handle.scss"
import {type RouteSectionProps, useParams} from "@solidjs/router"
import sidebarStore from "./sidebar/sidebar-state.ts"
import {SplitPane} from "solid-split-pane"
import Sidebar from "./sidebar/sidebar.tsx"

const SpacePage: ParentComponent<RouteSectionProps> = props => {
	// todo if we do not have access to the team associated with this shareId,
	// send us back to /
	// eventually tell us that though
	const [sidebarState] = sidebarStore
	const params = useParams<{projectId?: lb.ProjectId}>()

	return (
		<>
			<header class="space-header topnav">
				<section class="pl-xs topnav-left">
					<SidebarToggle which="primary" />
				</section>
				<section class="left-section topnav-middle" />
				<section class="right-section pl-r topnav-right">
					<Show when={params?.projectId}>
						<SidebarToggle which="secondary" />
					</Show>
				</section>
			</header>
			<div class="flex grow">
				<Sidebar open={sidebarState.primary} which="primary">
					<PrimarySidebar />
				</Sidebar>
				<main id="main" class="flex pt-2 grow">
					{props.children}
				</main>
			</div>
		</>
	)
}

export default SpacePage
