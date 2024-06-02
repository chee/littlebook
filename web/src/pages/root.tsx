import {Outlet} from "react-router-dom"
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import Sidebar from "../components/sidebar.tsx"
import type {Database} from "../evolu.ts"
import {type Mnemonic, useEvolu} from "@evolu/react"
import {Schema} from "@effect/schema"
import {Badge} from "../pwa.tsx"

export default function Root() {
	const evolu = useEvolu<Database>()

	return (
		<PanelGroup autoSaveId="root" direction="horizontal">
			<Panel defaultSize={25} minSize={10} maxSize={40}>
				<Badge />
				<button
					type="button"
					onClick={() => {
						const mnem = window.prompt("mnemonic?") as Mnemonic
						mnem && evolu.restoreOwner(mnem)
					}}>
					restore
				</button>
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
