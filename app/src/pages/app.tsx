import {
	createEffect,
	createSignal,
	onCleanup,
	Show,
	useContext,
	For,
} from "solid-js"
import {type DockviewApi, type SerializedDockview} from "dockview-core"
import "./app.css"

import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/automerge-repo"
import {type ContextValue} from "corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import PageHeader from "../components/page-header/page-header.tsx"
import Icon from "../components/icon/icon.tsx"
import {Button} from "@kobalte/core/button"
import FileViewer from "../components/editor/editor.tsx"
import Dock, {type DockAPI} from "../dock/dock.tsx"
import DockTab from "../dock/dock-tab.tsx"
import Workspace from "../components/workspace/workspace.tsx"
import {EditorRegistryContext} from "../registries/editor-registry.ts"
// import tldraw from "@littlebook/tldraw"
import text from "@littlebook/text"
import {useHome} from "../repo/home.ts"
import repo from "../repo/create.ts"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"

export default function App() {
	const [resizableContext, setResizableContext] =
		createSignal<ContextValue | null>(null)

	const [dockAPI, setDockAPI] = createSignal<DockAPI | null>(null)

	// const editorRegistry = useContext(EditorRegistryContext)

	/* 	editorRegistry.register(
		{
			displayName: "Tldraw",
			id: "tldraw",
			contentTypes: ["tldraw"],
		},
		tldraw
	)

	editorRegistry.register(
		{
			displayName: "Codemirror",
			id: "codemirror",
			contentTypes: ["text"],
		},
		text
	) */

	// const [home] = useHome()
	// createEffect(() => {
	// 	for (const url of home()?.editors ?? []) {
	// 		repo.find(url)
	// 	}
	// })

	createEffect(() => {
		if (!dockAPI()) {
			return true
		}

		function onhash() {
			const hash = location.hash.slice(1)
			if (isValidAutomergeUrl(hash)) {
				dockAPI().openDocument(hash)
			}
		}

		window.addEventListener("hashchange", onhash)

		onCleanup(() => {
			window.removeEventListener("hashchange", onhash)
		})

		dockAPI().onLayoutChange(() => {
			const layout: SerializedDockview = dockAPI().serializeLayout()
			localStorage.setItem("layout", JSON.stringify(layout))
			location.hash = dockAPI()?.activePanelID
		})

		const mySerializedLayout = localStorage.getItem("layout")

		if (mySerializedLayout) {
			try {
				const layout = JSON.parse(mySerializedLayout)
				dockAPI()?.loadLayout(layout)
			} catch {
				/* empty */
			}
		}
	})

	const defaultSizes = [0.2, 0.8]

	const [sizes, setSizes] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal<number[]>(defaultSizes),
		{
			name: "workspace-layout",
		}
	)

	if (!sizes().length || sizes().every(n => n <= 0)) {
		setSizes(defaultSizes)
	}

	const leftSidebarCollapsed = () => sizes()[0] === 0

	const toggleLeftSidebar = () => {
		if (leftSidebarCollapsed()) {
			resizableContext()?.expand(0, "following")

			if (leftSidebarCollapsed()) {
				setSizes(() => [
					lastLeftSidebarExpandedSize(),
					1 - lastLeftSidebarExpandedSize(),
				])
			}
		} else {
			resizableContext()?.collapse(0, "following")
		}
	}

	const [lastLeftSidebarExpandedSize, setLastLeftSidebarExpandedSize] =
		createSignal(defaultSizes[0])

	return (
		<div class="app">
			<PageHeader
				leftSidebarCollapsed={leftSidebarCollapsed()}
				toggleLeftSidebar={toggleLeftSidebar}
			/>
			<Workspace
				sizes={sizes()}
				setSizes={setSizes}
				setLastLeftSidebarExpandedSize={setLastLeftSidebarExpandedSize}
				dockviewAPI={dockviewAPI()}
				setResizableContext={setResizableContext}>
				<Dock
					tab={props => (
						<DockTab
							id={props.id as AutomergeUrl}
							dockviewAPI={props.dockviewAPI}
							panelAPI={props.panelAPI}
						/>
					)}
					rightHeaderAction={props => (
						<div class="dock-header-actions">
							<DropdownMenu>
								<DropdownMenu.Trigger
									class="pop-menu__trigger dock-header-actions__button"
									aria-label="more actions">
									<Icon icon="solar:menu-dots-bold" inline />
								</DropdownMenu.Trigger>
								<DropdownMenu.Portal>
									<DropdownMenu.Content class="pop-menu__content">
										<DropdownMenu.Item
											class="pop-menu__item"
											onSelect={() => props.groupAPI.close()}>
											close group
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Portal>
							</DropdownMenu>
						</div>
					)}
					panel={props => (
						<Show when={isValidAutomergeUrl(props.id)}>
							<div style={{display: "contents"}}>
								<FileViewer
									url={props.id as AutomergeUrl}
									dockviewAPI={props.dockviewAPI}
								/>
							</div>
						</Show>
					)}>
					{api => {
						setDockAPI(api)
					}}
				</Dock>
			</Workspace>
		</div>
	)
}
