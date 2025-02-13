import Resizable, {type ContextValue} from "corvu/resizable"
import LeftSidebar from "../sidebar/left-sidebar.tsx"
import {
	createEffect,
	getOwner,
	onCleanup,
	runWithOwner,
	type ParentComponent,
	type Setter,
} from "solid-js"
import {isValidAutomergeUrl} from "@automerge/automerge-repo"
import type {SerializedDockview} from "dockview-core"
import {useHome} from "../../repo/home.ts"
import repo from "../../repo/create.ts"
import {useDockAPI} from "../../dock/dock.tsx"

const Workspace: ParentComponent<{
	sizes: number[]
	setSizes: Setter<number[]>
	setResizableContext: Setter<ContextValue | undefined>
	setLastLeftSidebarExpandedSize: Setter<number>
}> = props => {
	const dockAPI = useDockAPI()

	const [home] = useHome()

	createEffect(() => {
		for (const editor of home()?.editors ?? []) {
			// kick off the editorRegistry knowing about these
			repo.findClassic(editor)
		}
	})
	const owner = getOwner()

	function onhash() {
		const hash = location.hash.slice(1)
		if (isValidAutomergeUrl(hash)) {
			if (dockAPI.activePanelID !== hash) {
				runWithOwner(owner, () => dockAPI.openDocument(hash))
			}
		}
	}
	const loadhash = location.hash.slice(1)
	window.addEventListener("hashchange", onhash)

	onCleanup(() => {
		window.removeEventListener("hashchange", onhash)
	})

	dockAPI.onLayoutChange(() => {
		const layout: SerializedDockview = dockAPI.serializeLayout()
		localStorage.setItem("layout", JSON.stringify(layout))
		const hash = dockAPI?.activePanelID
		if (hash) {
			location.hash = hash
		} else {
			location.hash = ""
		}
	})

	const mySerializedLayout = localStorage.getItem("layout")

	if (mySerializedLayout) {
		try {
			const layout = JSON.parse(mySerializedLayout)
			dockAPI.loadLayout(layout)
		} catch {
			console.error("failed to load layout")
		}
	}

	if (isValidAutomergeUrl(loadhash)) {
		if (dockAPI.activePanelID !== loadhash) {
			dockAPI.openDocument(loadhash)
		}
	}

	return (
		<section class="workspace">
			<Resizable sizes={props.sizes} onSizesChange={props.setSizes}>
				{() => {
					props.setResizableContext(Resizable.useContext())
					return (
						<>
							<Resizable.Panel
								onResize={size => {
									if (size) {
										props.setLastLeftSidebarExpandedSize(size)
									}
								}}
								initialSize={0.2}
								collapsible={true}
								collapseThreshold={0.2}
								maxSize={0.5}
								collapsedSize={0}>
								<LeftSidebar />
							</Resizable.Panel>
							<Resizable.Handle />
							<Resizable.Panel>{props.children}</Resizable.Panel>
						</>
					)
				}}
			</Resizable>
		</section>
	)
}

export default Workspace
