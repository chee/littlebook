import {Suspense} from "solid-js"
import PrimarySidebar from "./primary-sidebar/primary-sidebar.tsx"
import Sidebar from "./sidebar/sidebar.tsx"
import {useUI} from "../ui/use-ui-state.tsx"
import FileArea from "../files/file-area/file-area.tsx"
import {
	getActiveItemId,
	getSplitSizes,
	stabilizeSidebars,
	toggleSidebar,
	updateSidebarsFromSplitSizes,
} from "../ui/ui-state.ts"
import useDocument from "../documents/use-document.ts"
// import InfoPanel from "../files/info-panel.tsx"
import Split from "../elements/split/split.ts"
import "./space.scss"
import {makeResizeObserver} from "@solid-primitives/resize-observer"
import {throttle} from "@solid-primitives/scheduled"
import SidebarToggle from "./sidebar/sidebar-toggle.tsx"

export default function Space() {
	const [ui, updateUI] = useUI()
	const active = () => getActiveItemId(ui)
	const [activeDoc] = useDocument<lb.Item>(active)
	const fileId = () => {
		const doc = activeDoc.latest
		return (doc?.type == "file" && doc.id) || undefined
	}
	const {observe} = makeResizeObserver(
		throttle(() => {
			stabilizeSidebars(ui, updateUI)
		}, 100),
		{box: "content-box"},
	)

	observe(document.body)

	return (
		<>
			<div class="space">
				<Split
					sizes={getSplitSizes(ui)}
					snapOffset={140}
					gutterSize={4}
					gutterAlign="end"
					minSize={0}
					onGutterClick={index => {
						toggleSidebar(index == 1 ? "primary" : "secondary", ui, updateUI)
					}}
					onDragEnd={sizes => {
						updateSidebarsFromSplitSizes(sizes, ui, updateUI)
					}}>
					<Sidebar which="primary" open={() => ui.layout.primary.open}>
						<PrimarySidebar />
					</Sidebar>
					<main id="main" class="space-areas">
						<Suspense>
							<FileArea
								fileId={fileId()}
								headerItems={{
									left: ui.layout.primary.open || (
										<SidebarToggle
											open={() => false}
											toggle={() => toggleSidebar("primary", ui, updateUI)}
										/>
									),
								}}
							/>
						</Suspense>
						{/* <Show when={fileId()}>
							<Sidebar which="secondary" open={() => false}>
								<Suspense>
									<InfoPanel fileId={fileId()} />
								</Suspense>
								{/* <NoteEditor /> */
						/*}
								{/* <MetadataViewer /> */
						/*}
							</Sidebar>
						</Show>
						*/}
					</main>
				</Split>
			</div>
		</>
	)
}
