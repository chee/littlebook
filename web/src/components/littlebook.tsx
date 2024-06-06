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
		<article class="littlebook">
			<Header />
			<PanelGroup autoSaveId="root" direction="horizontal">
				<Panel defaultSize={25} minSize={10} maxSize={40}>
					<Sidebar />
				</Panel>
				<PanelResizeHandle />
				<Panel>
					<Badge />
					<main id="main">
						<Switch>
							{/* todo /inbox etc */}
							<Route component={ProjectPage} path="/projects/:projectId" />
						</Switch>
					</main>
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={25} minSize={10} maxSize={40}>
					{/* <Sidebar /> */}
				</Panel>
			</PanelGroup>
			<footer>footer</footer>
		</article>
	)
}

export default Littlebook
