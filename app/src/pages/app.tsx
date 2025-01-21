import {createEffect, createSignal, on, onCleanup, Show} from "solid-js"
import {type DockviewApi, type SerializedDockview} from "dockview-core"
import "./app.css"

import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/automerge-repo"
import repo from "../repo/create.ts"
import homeURL, {HomeDocument} from "../repo/home.ts"
import {type ContextValue} from "corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import PageHeader from "../components/page-header/page-header.tsx"
import Icon from "../components/icon/icon.tsx"
import {Button} from "@kobalte/core/button"
import Editor from "../components/editor/editor.tsx"
import Dock from "../dock/dock.tsx"
import DockTab from "../dock/dock-tab.tsx"
import Workspace from "../components/workspace/workspace.tsx"

export default function App() {
	const [resizableContext, setResizableContext] =
		createSignal<ContextValue | null>(null)
	const [dockAPI, setDockAPI] = createSignal<DockviewApi | null>(null)

	createEffect(
		on([dockAPI], ([dockAPI]) => {
			if (!dockAPI) return
			function onhash() {
				const hash = location.hash.slice(1)
				if (isValidAutomergeUrl(hash)) {
					const existing = dockAPI.getPanel(hash)
					if (existing) {
						existing.api.setActive()
					} else {
						dockAPI.addPanel({id: hash, component: "document"})
						repo
							.find<HomeDocument>(homeURL())
							.change(
								doc =>
									doc.children.includes(hash) ||
									doc.children.push(hash)
							)
					}
				}
			}
			window.addEventListener("hashchange", onhash)
			onCleanup(() => {
				window.removeEventListener("hashchange", onhash)
			})
			const disposable = dockAPI.onDidLayoutChange(() => {
				const layout: SerializedDockview = dockAPI.toJSON()
				localStorage.setItem("layout", JSON.stringify(layout))
				location.hash = dockAPI.activePanel?.id
			})

			onCleanup(() => disposable?.dispose())

			const mySerializedLayout = localStorage.getItem("layout")

			if (mySerializedLayout) {
				try {
					const layout = JSON.parse(mySerializedLayout)
					dockAPI?.fromJSON(layout)
				} catch {
					/* empty */
				}
			}
		})
	)

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
				dockviewAPI={dockAPI()}
				setResizableContext={setResizableContext}>
				<Dock
					tab={props => (
						<DockTab
							id={props.id as AutomergeUrl}
							dockviewAPI={props.dockviewAPI}
							panelAPI={props.panelAPI}
						/>
					)}
					rightHeaderAction={_props => (
						<div class="dock-header-actions">
							<Button
								class="dock-header-actions__button"
								aria-label="more actions">
								<Icon icon="solar:menu-dots-bold" inline />
							</Button>
						</div>
					)}
					panel={props => (
						<Show when={isValidAutomergeUrl(props.id)}>
							<div style={{height: "100%"}}>
								<Editor url={props.id as AutomergeUrl} />
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
