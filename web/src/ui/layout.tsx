import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "./sidebar/sidebar.tsx"
import {Badge} from "./pwa.tsx"
import {useEffect, type FC} from "preact/compat"
import "./header/layout.css"
import Header from "./header/header.tsx"
import {useLittlebookAPI} from "../api/use-littlebook-api.ts"
import * as defaultPlugins from "../contents/plugins/default.ts"
import type {FunctionalComponent} from "preact"

const Littlebook: FunctionalComponent = ({children}) => {
	const lb = useLittlebookAPI()
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
					<main id="main">{children}</main>
				</Panel>
			</PanelGroup>
		</PanelGroup>
	)
}

export default Littlebook