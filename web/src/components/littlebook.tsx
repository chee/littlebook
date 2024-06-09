import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "./sidebar.tsx"
import {Badge} from "../pwa.tsx"
import {useEffect, type FC} from "preact/compat"
import "./littlebook.css"
import Header from "./header.tsx"
import {Switch, Route} from "wouter-preact"
import ProjectPage from "./project.tsx"
import {useLittlebookAPI} from "../hooks/api.ts"
import * as defaultPlugins from "../plugins/default.ts"

const Littlebook: FC = () => {
	const lb = useLittlebookAPI()
	// todo usePlugins
	// biome-ignore lint/correctness/useExhaustiveDependencies: first time
	useEffect(() => {
		defaultPlugins.text.activate(lb)
		defaultPlugins.img.activate(lb)
		return () => {
			defaultPlugins.text.deactivate(lb)
			defaultPlugins.img.deactivate(lb)
		}
	}, [])

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
