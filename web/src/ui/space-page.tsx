import {
	Panel,
	PanelGroup,
	PanelResizeHandle,
	type ImperativePanelHandle,
} from "react-resizable-panels"
import PrimarySidebar from "./sidebar/sidebar.tsx"
import {Badge} from "./pwa.tsx"
import {useCallback, useEffect, useRef, useState, type FC} from "preact/compat"
import {useLittlebookAPI} from "../api/use-littlebook-api.ts"
import * as defaultPlugins from "../contents/plugins/default.ts"
import type {FunctionalComponent, Ref, RefObject} from "preact"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import {Switch, Route} from "wouter-preact"
import ProjectPage from "./projects/project-page.tsx"
import {useLocalState} from "../auth/use-local-state.ts"
import cl from "./cl.ts"
import useNamedBreakpoint from "./hooks/use-breakpoint.ts"
import {useSpaceUIState} from "./space-ui-state.tsx"
import {useHotkeys} from "react-hotkeys-hook"

const Littlebook: FunctionalComponent = ({children}) => {
	const lb = useLittlebookAPI()
	const ui = useSpaceUIState()
	const {spaceId} = useLocalState()
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
			? sidebar.ref.current.isCollapsed()
			: false
	}, [primary.ref.current])

	useEffect(() => {
		const sidebar = secondary
		sidebar.open.value = sidebar.ref.current
			? sidebar.ref.current.isCollapsed()
			: false
	}, [secondary.ref.current])
	const skinny = !useNamedBreakpoint("sm")

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
			<header
				class="space-header flex items-center justify-between sticky top-0 py-2
			z-40 w-full bg-cover border-b-1 border-cover-300 bg-cover-200 dark:bg-cover-950">
				<section class="pl-4">
					<SidebarToggle which="primary" />
				</section>
				<section class="left-section flex-1 flex items-center justify-center" />
				<section class="right-section pl-r">
					<SidebarToggle which="secondary" />
				</section>
			</header>
			<PanelGroup
				direction="horizontal"
				autoSaveId={"space+" + spaceId}
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
					class="w-px bg-cover-100"
				/>
				<Panel defaultSize={80.9}>
					<main id="main" class="h-full">
						<Switch>
							<Route path="/projects/:slug/:projectId">
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
