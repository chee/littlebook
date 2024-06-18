// todo dockview
import {Panel, PanelGroup, ResizeHandle} from "solid-resizable-panels"
import PrimarySidebar from "../../sidebar/primary-sidebar.tsx"
import {Badge} from "../../pwa/pwa.tsx"
// import {useEffect} from "preact/compat"
import {useLittlebookAPI} from "../../api/use-api.ts"
import * as defaultPlugins from "../../../plugins/plugin-api.ts"
// import type {FunctionalComponent} from "preact"
import SidebarToggle from "../../sidebar/sidebar-toggle.tsx"
// import {Switch, Route, useSearch, useRoute} from "wouter-preact"
import ProjectPage from "../projects/project-page.tsx"
import cl from "../../lib/cl.ts"
import breakpoints from "../../styles/breakpoints.ts"
// import {useHotkeys} from "react-hotkeys-hook"
import {
	Switch,
	createEffect,
	createSignal,
	type ParentComponent,
} from "solid-js"
import * as sidebars from "./sidebar-state.ts"
import "../../styles/elements/topnav.scss"
import {Route, action, useParams, type RouteSectionProps} from "@solidjs/router"
// import {useAuth} from "../../automerge/auth/use-automerge.ts"
// import {useSignalEffect} from "@preact/signals"
// import {DockPanel, DockView} from "solid-dockview"
// todo my own styles
// import "dockview-core/dist/styles/dockview.css"

const Littlebook: ParentComponent<RouteSectionProps> = props => {
	const params = useParams()
	// const auth = useAuth()
	// console.log({auth}, "from space p/*  */age")

	// const lb = useLittlebookAPI()

	// const ui = useSpaceState()

	// const routing = useRouting()
	// const [is, params] = useRoute<{
	// 	projectId: lb.ProjectId
	// 	spaceId: lb.SpaceId
	// 	fileId: lb.FileId
	// }>("/space/:spaceId/project?/:slug?/:projectId?/file?/:fileId?")

	// if (is == false) {
	// route({
	// 	shareId: ui.space.shareId.value,
	// })
	// }

	// useEffect(() => {
	// 	ui.projects.selected.value = ui.routing.projectId || null
	// }, [ui.routing.projectId])

	// useEffect(() => {
	// 	ui.files.selected.value = ui.routing.fileId || null
	// }, [ui.routing.fileId])

	// todo usePlugins
	// useEffect(() => {
	// 	defaultPlugins.text.activate(lb)
	// 	defaultPlugins.img.activate(lb)
	// 	defaultPlugins.excalidrawElements.activate(lb)
	// 	defaultPlugins.excalidraw.activate(lb)
	// 	defaultPlugins.unknown.activate(lb)
	// 	return () => {
	// 		defaultPlugins.text.deactivate(lb)
	// 		defaultPlugins.img.deactivate(lb)
	// 		defaultPlugins.excalidrawElements.deactivate(lb)
	// 		defaultPlugins.excalidraw.deactivate(lb)
	// 		defaultPlugins.unknown.deactivate(lb)
	// 	}
	// }, [])

	// useHotkeys(
	// 	"escape",
	// 	() => {
	// 		ui.files.renaming.value = null
	// 		ui.projects.renaming.value = null
	// 	},
	// 	{
	// 		enableOnFormTags: true,
	// 	},
	// )

	createEffect(() => {
		console.log(props.children)
	})

	return (
		<>
			<header class="space-header topnav">
				<section class="pl-4 topnav-left">
					<SidebarToggle which="primary" />
				</section>
				<section class="left-section topnav-middle" />
				<section class="right-section pl-r topnav-right">
					{/* {ui.projects.selected.value && <SidebarToggle which="secondary" />} */}
				</section>
			</header>
			<PanelGroup direction="row" class="flex grow">
				<Panel
					id="sidebar"
					class={cl("flex grow max-w-full", breakpoints.m || "full-screen")}
					initialSize={breakpoints.m ? 19.1 : 100}
					minSize={breakpoints.m ? 20 : 100}
					// onCollapse={() => {
					// 	primary.open.value = false
					// }}
					// onExpand={() => {
					// primary.open.value = true
					// }}
					collapsible={true}>
					<PrimarySidebar />
				</Panel>
				<ResizeHandle class="resize-handle resize-handle-row" />
				<Panel id="main" initialSize={80.9}>
					<main id="main" class="h-full flex">
						{props.children}
					</main>
					<Badge />
				</Panel>
			</PanelGroup>
		</>
	)
}

export default Littlebook
