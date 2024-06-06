import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "./sidebar.tsx"
import {Badge} from "../pwa.tsx"
import type {FC} from "preact/compat"
import "./littlebook.css"
import Header from "./header.tsx"
import {Switch, Route} from "wouter-preact"
import ProjectPage from "../pages/project.tsx"

const Littlebook: FC = () => {
	return (
		<PanelGroup direction="vertical" autoSaveId="littlebook">
			<Header />
			<PanelGroup direction="horizontal">
				<Panel defaultSize={19.1} minSize={10} maxSize={40}>
					<Sidebar />
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={80.9}>
					<Badge />
					<main id="main">
						<Switch>
							{/* todo /inbox etc */}
							<Route
								component={ProjectPage}
								path="/projects/:slug/:projectId"
							/>
						</Switch>
					</main>
				</Panel>
			</PanelGroup>
		</PanelGroup>
	)
}

export default Littlebook
