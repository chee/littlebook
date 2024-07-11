import ContentViewer from "../content-viewer/content-viewer.tsx"
import useDocument from "../../documents/use-document.ts"
import {
	createSignal,
	getOwner,
	runWithOwner,
	Suspense,
	type JSXElement,
} from "solid-js"

import "./file-area.scss"
import Popout from "../../elements/popout/popout.tsx"
import Menu from "../../elements/menu/menu.tsx"
import getDock, {type PaneId, rm} from "../../space/area/dock.ts"
import {
	contentViewRegistry,
	type SolidContentView,
} from "../contents/content-view.ts"
import clsx from "clsx"

import {getElementBounds} from "@solid-primitives/bounds"
import getLayout from "../../space/space-layout.ts"

type FileAreaProps = {
	paneId?: PaneId
	fileId?: lb.FileId
	headerItems?: {
		left?: JSXElement
		right?: JSXElement
	}
}
export default function FileArea(props: FileAreaProps) {
	let [file, _change] = useDocument<lb.File>(() => props.fileId)
	let [showingMenu, setShowingMenu] = createSignal(false)
	let [showingViewSelector, setShowingViewSelector] = createSignal(false)
	let [view, setView] = createSignal<
		string | SolidContentView<any> | undefined
	>()

	let [dock, updateDock] = getDock()
	let [dotdotdot, setDotdotdot] = createSignal<HTMLButtonElement>()

	let views = () =>
		file() &&
		Array.from(contentViewRegistry.get(file()!.contentType)).reduce(
			(obj, item) => {
				if (typeof item == "string") {
					// todo displayName
					obj[item] = contentViewRegistry.getDisplayName(item)
				}
				return obj
			},
			{} as Record<string, string>,
		)

	let [layout] = getLayout()

	let translate = () => (layout.secondary.open ? "-50%" : "-100%")
	let owner = getOwner()

	return (
		<Suspense>
			<Popout
				when={showingMenu}
				close={() => setShowingMenu(false)}
				box={getElementBounds(dotdotdot())}
				style={{translate: translate()}}>
				<Menu
					options={{
						view: "select view",
						close: "close",
					}}
					select={option => {
						setShowingMenu(false)
						if (option == "view") {
							setShowingViewSelector(true)
							return
						}
						if (option == "close") {
							runWithOwner(owner, () => {
								rm(props.paneId!)
							})
						}
					}}
				/>
			</Popout>
			<Popout
				when={showingViewSelector}
				close={() => setShowingMenu(false)}
				box={getElementBounds(dotdotdot())}
				style={{translate: translate()}}>
				<Menu
					options={views() || {}}
					select={option => {
						setShowingViewSelector(false)
						setView(option)
					}}
				/>
			</Popout>
			<div
				class={clsx(
					"file-viewer",
					props.paneId && props.paneId == dock.active && "active",
				)}
				onclick={() => {
					updateDock("active", props.paneId)
				}}
				onfocusin={() => {
					updateDock("active", props.paneId)
				}}>
				<header class="file-viewer-head headstrip">
					<div class="file-viewer-head-left headstrip-left">
						{props.headerItems?.left}
					</div>
					<div class="file-viewer-head-middle headstrip-middle">
						<div class="file-viewer-head-file-name">
							<span class="file-viewer-head-file-icon">
								{file.latest?.icon}
							</span>
							<span class="file-viewer-head-file-name__name">
								{file.latest?.name}
							</span>
						</div>
					</div>
					<div class="file-viewer-head-right headstrip-right">
						<button
							ref={setDotdotdot}
							type="button"
							onclick={() => {
								setShowingMenu(true)
							}}>
							...
						</button>

						{props.headerItems?.right}
					</div>
				</header>
				<div class="file-viewer-body" style={{width: "100%"}}>
					<Suspense>
						<ContentViewer fileId={props.fileId} view={view()} />
					</Suspense>
				</div>
			</div>
		</Suspense>
	)
}
