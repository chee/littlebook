import {For, Match, Suspense, Switch} from "solid-js"
import PrimarySidebar from "./primary-sidebar/primary-sidebar.tsx"
import Sidebar from "./sidebar/sidebar.tsx"

import FileArea from "../files/file-area/file-area.tsx"
import {
	getSplitSizes,
	stabilizeSidebars,
	toggleSidebar,
	updateSidebarsFromSplitSizes,
} from "./space-layout.ts"
import "./space.scss"

import SidebarToggle from "./sidebar/sidebar-toggle.tsx"
import observeMouse from "../lib/mouse.ts"
import SecondarySidebar from "./secondary-sidebar/secondary-sidebar.tsx"
import Split from "../elements/split/split.ts"
import {throttle} from "@solid-primitives/scheduled"
import {makeResizeObserver} from "@solid-primitives/resize-observer"
import getSpaceLayout from "./space-layout.ts"
import getDock, {isTopLeft, isTopRight, type PaneId} from "./area/dock.ts"
import Resizable from "@corvu/resizable"

export default function Space() {
	const [layout, updateLayout] = getSpaceLayout()
	const [dock] = getDock()

	const {observe: observeResize} = makeResizeObserver(
		throttle(() => {
			stabilizeSidebars(layout, updateLayout)
		}, 100),
		{box: "content-box"},
	)

	observeResize(document.body)
	observeMouse()

	return (
		<div class="space">
			<Split
				sizes={getSplitSizes(layout)}
				snapOffset={140}
				gutterSize={4}
				gutterAlign="end"
				minSize={0}
				onGutterClick={index => {
					toggleSidebar(
						index == 1 ? "primary" : "secondary",
						layout,
						updateLayout,
					)
				}}
				onDragEnd={sizes => {
					updateSidebarsFromSplitSizes(sizes, layout, updateLayout)
				}}>
				<Sidebar which="primary" open={() => layout.primary.open}>
					<PrimarySidebar />
				</Sidebar>
				<main id="main" class="space-areas">
					<Suspense>
						<Resizable>
							<For each={dock.grid}>
								{pane => <Grid pane={pane} orientation="horizontal" />}
							</For>
						</Resizable>
					</Suspense>
				</main>
				<Sidebar open={() => layout.secondary.open} which="secondary">
					<SecondarySidebar />
				</Sidebar>
			</Split>
		</div>
	)
}

function Grid(props: {
	pane: PaneId | PaneId[]
	orientation: "horizontal" | "vertical"
}) {
	const [layout, updateLayout] = getSpaceLayout()
	const [dock, _updateDock] = getDock()

	const orient = props.orientation == "vertical" ? "horizontal" : "vertical"

	return (
		<>
			<Switch>
				<Match when={Array.isArray(props.pane)}>
					<Resizable orientation={orient}>
						<For each={props.pane as PaneId[]}>
							{pane => <Grid pane={pane} orientation={orient} />}
						</For>
					</Resizable>
				</Match>
				<Match when={!Array.isArray(props.pane)}>
					<Resizable.Panel>
						<FileArea
							paneId={props.pane as PaneId}
							fileId={dock.panes[props.pane as PaneId].itemId as lb.FileId}
							headerItems={{
								left: isTopLeft(props.pane as PaneId) && (
									<SidebarToggle
										open={() => false}
										toggle={() =>
											toggleSidebar("primary", layout, updateLayout)
										}
									/>
								),
								right: isTopRight(props.pane as PaneId) && (
									<SidebarToggle
										open={() => false}
										toggle={() =>
											toggleSidebar("secondary", layout, updateLayout)
										}
									/>
								),
							}}
						/>
					</Resizable.Panel>
					<Resizable.Handle />
				</Match>
			</Switch>
		</>
	)
}
