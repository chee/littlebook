import {Outlet} from "react-router-dom"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "../components/sidebar.tsx"
import {Badge} from "../pwa.tsx"

export default function Root() {
	return (
		<PanelGroup autoSaveId="root" direction="horizontal">
			<Panel defaultSize={25} minSize={10} maxSize={40}>
				<Badge />
				<Sidebar />
			</Panel>
			<PanelResizeHandle />
			<Panel>
				<main id="main">
					<Outlet />
				</main>
			</Panel>
			<PanelResizeHandle />
			<Panel defaultSize={25} minSize={10} maxSize={40}>
				<Sidebar />
			</Panel>
		</PanelGroup>
	)
}
