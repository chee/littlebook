/* eslint-disable solid/components-return-once */
import {
	createEffect,
	createRoot,
	createSignal,
	For,
	getOwner,
	onCleanup,
	Owner,
	runWithOwner,
	Suspense,
	untrack,
} from "solid-js"
import type {Accessor} from "solid-js"
import {
	createDockview,
	type DockviewApi,
	type SerializedDockview,
	createSplitview,
	createPaneview,
	SplitviewPanel,
	type IFrameworkPart,
} from "dockview-core"
import "./app.css"
import "dockview-core/dist/styles/dockview.css"
import "./dockview.css"
import {
	isValidAutomergeUrl,
	type AutomergeUrl,
	type ChangeFn,
	type Doc,
	type DocHandle,
	type DocHandleChangePayload,
	type Patch,
} from "@automerge/automerge-repo"
import {createStore, produce, type Store} from "solid-js/store"
import {apply, fromAutomerge} from "cabbages"
import repo from "../repo/create.ts"
import type {AutomergeValue} from "@automerge/automerge/next"
import homeURL, {type FolderDocument} from "../repo/home.ts"
import {useHandle} from "automerge-repo-solid-primitives"
import {Dynamic} from "solid-js/web"
import Resizable, {type ContextValue} from "corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import PageHeader from "../components/page-header/page-header.tsx"
import {Icon} from "@iconify-icon/solid"

export type DocumentStore<T> = [Store<Doc<T>>, (fn: ChangeFn<T>) => void]

export function autoproduce<T>(patches: Patch[]) {
	return produce<T>(doc => {
		for (const patch of patches) {
			const [path, range, val] = fromAutomerge(patch)
			apply(path, doc, range, val)
		}
	})
}

type AutomergeObject = Record<string, AutomergeValue>

export function createDocumentProjection<T extends object = AutomergeObject>(
	handle: Accessor<DocHandle<T>>
) {
	const [doc, set] = createStore<T>(handle()?.docSync())
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle().on("change", patch)
	onCleanup(() => handle().off("change", patch))
	return doc
}

export function createDocumentStore<T extends object = AutomergeObject>(
	handle: Accessor<DocHandle<T>>
) {
	const [doc, set] = createStore<T>(handle()?.docSync())
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle().on("change", patch)
	onCleanup(() => handle().off("change", patch))
	return [doc, (change: ChangeFn<T>) => handle().change(change)] as const
}

export default function App() {
	const homeHandle = repo.find<FolderDocument>(homeURL())
	const [home] = createDocumentStore(() => homeHandle)
	const [resizableContext, setResizableContext] =
		createSignal<ContextValue | null>(null)

	const dock = (<div class="dock" />) as HTMLDivElement

	function onhash() {
		const hash = location.hash.slice(1)
		if (isValidAutomergeUrl(hash)) {
			const existing = dv.getPanel(hash)
			if (existing) {
				existing.api.setActive()
			} else {
				dv.addPanel({id: hash, component: "document"})
			}
		}
	}

	window.addEventListener("hashchange", onhash)
	onCleanup(() => {
		window.removeEventListener("hashchange", onhash)
	})

	const dv = createDockview(dock, {
		// disableAutoResizing: true,/*  */
		// singleTabMode: "fullwidth",

		createTabComponent(options) {
			const handle = repo.find(options.id)
			const [doc, change] = createDocumentStore(() => handle)
			const el = (
				<div class="dock-tab">
					<div class="dock-tab__icon">
						{<Icon icon={doc.icon ?? "solar:document-text-bold"} />}
					</div>
					<div class="dock-tab__name">{doc.name}</div>
					<button
						class="dock-tab__close"
						aria-label={`close panel ${doc.name}`}
						onclick={() => dv.getPanel(options.id).api.close()}>
						<Icon icon="solar:close-square-linear" />
					</button>
				</div>
			) as HTMLDivElement

			return {
				element: el,
				init() {
					// console.log(x.api.tabComponent)
				},
			}
		},
		// createLeftHeaderActionComponent(options) {
		// 	const el = (<div>left</div>) as HTMLDivElement
		// 	return {
		// 		element: el,
		// 		init(x) {},
		// 		dispose() {},
		// 	}
		// },
		createRightHeaderActionComponent() {
			const el = (<div>right</div>) as HTMLDivElement
			return {
				element: el,
				init(x) {},
				dispose() {},
			}
		},
		// createPrefixHeaderActionComponent() {
		// 	const el = (<div>prefix</div>) as HTMLDivElement
		// 	return {
		// 		element: el,
		// 		init() {},
		// 		dispose() {},
		// 	}
		// },
		createComponent(options) {
			if (!isValidAutomergeUrl(options.id)) return
			const handle = repo.find<{text: string; name: string}>(options.id)
			const [doc, change] = createDocumentStore(() => handle)
			const element = (
				<div style={{padding: "1rem"}}>
					<Suspense fallback="waiting for godot">{doc?.text}</Suspense>
				</div>
			) as HTMLDivElement

			return {
				init() {},
				element,
			}
		},
	})

	const disposable = dv.onDidLayoutChange(() => {
		const layout: SerializedDockview = dv.toJSON()
		localStorage.setItem("layout", JSON.stringify(layout))
		location.hash = dv.activePanel.id
	})

	onCleanup(() => disposable.dispose())

	const mySerializedLayout = localStorage.getItem("layout")

	if (mySerializedLayout) {
		try {
			const layout = JSON.parse(mySerializedLayout)
			dv.fromJSON(layout)
		} catch {
			// console.error("layout")
		}
	}

	const defaultSizes = [0.2, 0.8]

	const [sizes, setSizes] = makePersisted(
		// eslint-disable-next-line solid/reactivity
		createSignal<number[]>(defaultSizes),
		{
			name: "workspace-layout",
		}
	)

	if (!sizes().length) {
		setSizes(defaultSizes)
	}

	const leftSidebarCollapsed = () => resizableContext()?.sizes()[0] === 0
	const toggleLeftSidebar = () => {
		if (leftSidebarCollapsed()) {
			resizableContext()?.expand(0, "following")
			// todo restore to last known size
			if (leftSidebarCollapsed()) {
				setSizes(prev => [
					lastLeftSidebarExpandedSize(),
					1 - lastLeftSidebarExpandedSize(),
				])
				console.log(sizes())
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
			<section class="workspace">
				<Resizable sizes={sizes()} onSizesChange={setSizes}>
					{() => {
						setResizableContext(Resizable.useContext())

						return (
							<>
								<Resizable.Panel
									onResize={size => {
										if (size && !leftSidebarCollapsed()) {
											setLastLeftSidebarExpandedSize(size)
										}
									}}
									initialSize={0.2}
									collapsible={true}
									collapseThreshold={0.2}
									collapsedSize={0}>
									<aside class="sidebar sidebar--left">
										<DocumentList urls={home.children} dv={dv} />
									</aside>
								</Resizable.Panel>
								<Resizable.Handle />
								<Resizable.Panel>{dock}</Resizable.Panel>
								{/* <Resizable.Handle /> */}
								{/* <Resizable.Panel> */}
								{/* <aside class="sidebar sidebar--right"> */}
								{/* right sidebar */}
								{/* </aside> */}
								{/* </Resizable.Panel> */}
							</>
						)
					}}
				</Resizable>
			</section>
		</div>
	)
}

function DocumentList(props: {urls: AutomergeUrl[]; dv: DockviewApi}) {
	const o = getOwner()
	function add(url: AutomergeUrl) {
		const existing = props.dv.getPanel(url)
		if (existing) {
			existing.api.setActive()
		} else {
			props.dv.addPanel({
				id: url,
				component: "document",
				tabComponent: "document",
			})
		}
	}

	const [active, setActive] = createSignal<AutomergeUrl | undefined>(
		props.dv.activePanel?.id as AutomergeUrl
	)

	const onactive = props.dv.onDidActivePanelChange(panel => {
		setActive(panel?.id as AutomergeUrl)
		console.log(panel?.id)
	})

	const [panels, setPanels] = createSignal<AutomergeUrl[]>(
		(props.dv.panels.map(panel => panel.id) as AutomergeUrl[]) ?? []
	)

	const onlayout = props.dv.onDidLayoutChange(() => {
		setPanels(props.dv.panels.map(panel => panel.id) as AutomergeUrl[])
	})

	onCleanup(() => onactive.dispose())
	return (
		<div class="sidebar-widget">
			<header class="sidebar-widget__header">
				<span>documents</span>
				<div class="sidebar-widget__header-actions">
					<button aria-label="add document">
						<Icon icon="solar:add-circle-linear" />
					</button>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<ul class="document-list">
					<For each={props.urls}>
						{url => {
							const handle = repo.find(url)
							const store = createDocumentProjection(() => handle)
							const pressed = () =>
								active() == url
									? "true"
									: panels().includes(url)
									? "mixed"
									: "false"

							return (
								<li>
									<button
										class="document-list__button"
										onclick={() => runWithOwner(o, () => add(url))}
										aria-pressed={pressed()}>
										{store.name ?? url}
									</button>
								</li>
							)
						}}
					</For>
				</ul>
			</div>
		</div>
	)
}
