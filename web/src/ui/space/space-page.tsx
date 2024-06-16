import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import PrimarySidebar from "../sidebar/primary-sidebar.tsx"
import {Badge} from "../pwa.tsx"
import {useEffect} from "preact/compat"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import * as defaultPlugins from "../../contents/plugins/default.ts"
import type {FunctionalComponent} from "preact"
import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import {Switch, Route, useSearch, useRoute} from "wouter-preact"
import ProjectPage from "../projects/project-page.tsx"
import cl from "../cl.ts"
import useMinWidth from "../styles/use-breakpoints.ts"
import {useSpaceState} from "./space-state.tsx"
import {useHotkeys} from "react-hotkeys-hook"

import "styles/elements/topnav.scss"
import {useSignalEffect} from "@preact/signals"

const Littlebook: FunctionalComponent = ({children}) => {
	const lb = useLittlebookAPI()
	const ui = useSpaceState()

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

	const {sidebars} = ui.layout
	const {primary, secondary} = sidebars

	useEffect(() => {
		const sidebar = primary
		sidebar.open.value = sidebar.ref.current
			? sidebar.ref.current.isExpanded()
			: false
	}, [primary.ref.current])

	useEffect(() => {
		const sidebar = secondary
		sidebar.open.value = sidebar.ref.current
			? sidebar.ref.current.isExpanded()
			: false
	}, [secondary.ref.current])
	const skinny = !useMinWidth("m")

	useHotkeys(
		"escape",
		() => {
			ui.files.renaming.value = null
			ui.projects.renaming.value = null
		},
		{
			enableOnFormTags: true,
		},
	)

	return (
		<>
			<header class="space-header topnav">
				<section class="pl-4 topnav-left">
					<SidebarToggle which="primary" />
				</section>
				<section class="left-section topnav-middle" />
				<section class="right-section pl-r topnav-right">
					{ui.projects.selected.value && <SidebarToggle which="secondary" />}
				</section>
			</header>
			<PanelGroup
				direction="horizontal"
				autoSaveId={"space+"}
				class="flex grow">
				<Panel
					class={cl("flex grow max-w-full")}
					defaultSize={19.1}
					minSize={skinny ? 100 : 14}
					style={{minWidth: primary.open.value ? 180 : 0}}
					maxSize={skinny ? 100 : 50}
					collapsible={true}
					onCollapse={() => {
						primary.open.value = false
					}}
					onExpand={() => {
						primary.open.value = true
					}}
					// @ts-expect-error ref def is wrong
					ref={primary.ref}>
					<PrimarySidebar />
				</Panel>
				<PanelResizeHandle
					hitAreaMargins={{coarse: 20, fine: 20}}
					class="w-px fill-paper-200"
				/>
				<Panel defaultSize={80.9}>
					<main id="main" class="h-full">
						<Switch>
							<Route path="/space/:space-id/projects/:slug/:projectId">
								<ProjectPage />
							</Route>
						</Switch>
					</main>
					<Badge />
				</Panel>
			</PanelGroup>
		</>
	)
}

export default Littlebook
