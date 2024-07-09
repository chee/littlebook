import {
	createEffect,
	createSignal,
	For,
	Match,
	Show,
	Suspense,
	Switch,
} from "solid-js"
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
import {throttle} from "@solid-primitives/scheduled"
import {makeResizeObserver} from "@solid-primitives/resize-observer"
import getSpaceLayout from "./space-layout.ts"
import getDock, {isTopLeft, isTopRight, type PaneId} from "./area/dock.ts"
import Resizable, {type ContextValue as ResizeContext} from "@corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"

export default function Space() {
	const [layout, updateLayout] = getSpaceLayout()
	const [dock] = getDock()
	const [resizeContext, setResizeContext] = createSignal<ResizeContext>()

	const {observe: observeResize} = makeResizeObserver(
		throttle(() => {
			stabilizeSidebars(layout, updateLayout)
		}, 100),
		{box: "content-box"},
	)

	observeResize(document.body)
	observeMouse()

	createEffect(() => {
		stabilizeSidebars(layout, updateLayout)
		resizeContext()?.resize(0, layout.primary.size)
	})

	const [columns, setColumns] = makePersisted(createSignal<number[]>(), {
		name: "workspace-columns",
	})

	return (
		<Resizable
			sizes={getSplitSizes(layout)}
			onSizesChange={sizes => {
				updateSidebarsFromSplitSizes(sizes, layout, updateLayout)
			}}>
			{() => {
				setResizeContext(Resizable.useContext())
				return (
					<>
						<Resizable.Panel minSize={0.15} collapsible>
							<Sidebar which="primary" open={() => layout.primary.open}>
								<PrimarySidebar />
							</Sidebar>
						</Resizable.Panel>
						<Resizable.Handle />
						<Resizable.Panel>
							<main id="main" class="space-areas">
								<Suspense>
									<Resizable sizes={columns()} onSizesChange={setColumns}>
										{() => {
											return (
												<For each={dock.grid}>
													{(pane, index) => (
														<Grid
															index={index}
															length={() => dock.grid.length}
															pane={pane}
															orientation="horizontal"
														/>
													)}
												</For>
											)
										}}
									</Resizable>
								</Suspense>
							</main>
						</Resizable.Panel>
						<Resizable.Handle />
						<Resizable.Panel minSize={0.15} collapsible>
							<Sidebar open={() => layout.secondary.open} which="secondary">
								<SecondarySidebar />
							</Sidebar>
						</Resizable.Panel>
					</>
				)
			}}
		</Resizable>
	)
}

function Grid(props: {
	pane: PaneId | PaneId[]
	orientation: "horizontal" | "vertical"
	index(): number
	length(): number
}) {
	const [layout, updateLayout] = getSpaceLayout()
	const [dock, _updateDock] = getDock()

	const orient = props.orientation == "vertical" ? "horizontal" : "vertical"
	const last = () => props.length() == props.index() + 1
	return (
		<Switch>
			<Match when={Array.isArray(props.pane) && props.pane.length}>
				<Resizable orientation={orient}>
					<For each={props.pane as PaneId[]}>
						{(pane, index) => (
							<Grid
								index={index}
								length={() => pane.length}
								pane={pane}
								orientation={orient}
							/>
						)}
					</For>
				</Resizable>
			</Match>
			<Match when={!Array.isArray(props.pane)}>
				<Resizable.Panel initialSize={1 / props.length()}>
					<FileArea
						paneId={props.pane as PaneId}
						fileId={dock.panes[props.pane as PaneId].itemId as lb.FileId}
						headerItems={{
							left: isTopLeft(props.pane as PaneId) && (
								<SidebarToggle
									open={() => false}
									toggle={() => toggleSidebar("primary", layout, updateLayout)}
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
				<Show when={!last()}>
					<Resizable.Handle />
				</Show>
			</Match>
		</Switch>
	)
}
