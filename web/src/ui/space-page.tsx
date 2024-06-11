import {
	Panel,
	PanelGroup,
	PanelResizeHandle,
	ImperativePanelHandle,
} from "react-resizable-panels"
import Sidebar from "./sidebar/sidebar.tsx"
import {Badge} from "./pwa.tsx"
import {useEffect, useRef, useState, type FC} from "preact/compat"
import {useLittlebookAPI} from "../api/use-littlebook-api.ts"
import * as defaultPlugins from "../contents/plugins/default.ts"
import type {FunctionalComponent} from "preact"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import {Switch, Route} from "wouter-preact"
import ProjectPage from "./projects/project-page.tsx"
import {useLocalState} from "../auth/use-local-state.ts"

const Littlebook: FunctionalComponent = ({children}) => {
	const lb = useLittlebookAPI()
	const {spaceId} = useLocalState()
	// todo usePlugins
	// biome-ignore lint/correctness/useExhaustiveDependencies: first time
	useEffect(() => {
		defaultPlugins.text.activate(lb)
		defaultPlugins.img.activate(lb)
		defaultPlugins.excalidrawElements.activate(lb)
		defaultPlugins.excalidraw.activate(lb)
		defaultPlugins.unknown.activate(lb)
		return () => {
			defaultPlugins.text.deactivate(lb)
			defaultPlugins.img.deactivate(lb)
			defaultPlugins.excalidrawElements.deactivate(lb)
			defaultPlugins.excalidraw.deactivate(lb)
			defaultPlugins.unknown.deactivate(lb)
		}
	}, [])

	const sidebarPanelRef = useRef<ImperativePanelHandle>(null)

	const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(
		sidebarPanelRef.current ? sidebarPanelRef.current.isCollapsed() : false,
	)

	useEffect(() => {
		setSidebarIsCollapsed(
			sidebarPanelRef.current ? sidebarPanelRef.current.isCollapsed() : false,
		)
	}, [sidebarPanelRef.current])

	const toggleSidebar = () => {
		const panel = sidebarPanelRef.current

		if (panel?.isCollapsed()) {
			panel?.expand()
		} else {
			panel?.collapse()
		}
	}

	return (
		<PanelGroup direction="horizontal" autoSaveId={"space+" + spaceId}>
			<Panel
				defaultSize={19.1}
				minSize={20}
				style={{minWidth: sidebarIsCollapsed ? 0 : 200}}
				maxSize={40}
				collapsible={true}
				onCollapse={() => {
					setSidebarIsCollapsed(true)
				}}
				onExpand={() => {
					setSidebarIsCollapsed(false)
				}}
				// @ts-expect-error ref def is wrong
				ref={sidebarPanelRef}>
				<Sidebar toggle={toggleSidebar} isCollapsed={sidebarIsCollapsed} />
			</Panel>
			<PanelResizeHandle class="pl-1 pr-1 has-background-light" />
			<Panel defaultSize={80.9}>
				<main id="main" class="h-100">
					<Switch>
						<Route path="/projects/:slug/:projectId">
							<ProjectPage
								sidebarIsCollapsed={sidebarIsCollapsed}
								toggleSidebar={toggleSidebar}
							/>
						</Route>
					</Switch>
				</main>
				<Badge />
			</Panel>
		</PanelGroup>
	)
}

export default Littlebook
