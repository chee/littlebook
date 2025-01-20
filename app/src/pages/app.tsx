/* eslint-disable solid/components-return-once */
import {createSignal, onCleanup, Suspense} from "solid-js"
import type {Accessor} from "solid-js"
import {createDockview, type SerializedDockview} from "dockview-core"
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
import homeURL, {
	HomeDocument,
	type DocumentBase,
	type FolderDocument,
} from "../repo/home.ts"
import Resizable, {type ContextValue} from "corvu/resizable"
import {makePersisted} from "@solid-primitives/storage"
import PageHeader from "../components/page-header/page-header.tsx"
import {Icon} from "@iconify-icon/solid"
import {Button} from "@kobalte/core/button"
import DocumentList from "../components/sidebar/document-list/document-list.tsx"
import LeftSidebar from "../components/sidebar/left-sidebar.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import Editor from "../components/editor/editor.tsx"

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
				repo
					.find<HomeDocument>(homeURL())
					.change(doc => doc.children.includes(hash) || doc.children.push(hash))
			}
		}
	}

	window.addEventListener("hashchange", onhash)

	onCleanup(() => {
		window.removeEventListener("hashchange", onhash)
	})

	const dv = createDockview(dock, {
		createTabComponent(options) {
			const handle = repo.find<DocumentBase>(options.id as AutomergeUrl)
			const doc = createDocumentProjection(() => handle)
			const el = (
				<div class="dock-tab">
					<ContextMenu>
						<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
							<div class="dock-tab__icon">
								{<Icon icon={doc.icon ?? "solar:document-text-bold"} />}
							</div>
							<div class="dock-tab__name">{doc.name}</div>
						</ContextMenu.Trigger>
						<ContextMenu.Portal>
							<ContextMenu.Content class="pop-menu__content">
								<ContextMenu.Item
									class="pop-menu__item"
									onSelect={() => dv.getPanel(options.id)?.api.close()}>
									close tab
								</ContextMenu.Item>
								<ContextMenu.Item
									class="pop-menu__item"
									onSelect={() => {
										for (const panel of dv.panels) {
											if (panel.id != options.id) panel.api.close()
										}
									}}>
									close other tabs
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Portal>
					</ContextMenu>
					<Button
						class="dock-tab__close"
						aria-label={`close panel ${doc.name}`}
						onclick={() => dv.getPanel(options.id).api.close()}>
						<Icon icon="solar:close-square-linear" />
					</Button>
				</div>
			) as HTMLDivElement

			const disposers: (() => void)[] = []

			return {
				element: el,
				init() {
					onCleanup(() => this.dispose())
					const disposer = dv.onDidActivePanelChange(panel => {
						if (panel.id == options.id) {
							el.scrollIntoView()
						}
					})
					disposers.push(() => disposer.dispose())
				},
				dispose() {
					for (const dispose of disposers) {
						dispose()
					}
				},
			}
		},
		createRightHeaderActionComponent() {
			const el = (
				<div class="dock-header-actions">
					<Button class="dock-header-actions__button" aria-label="more actions">
						<Icon icon="solar:menu-dots-bold" />
					</Button>
				</div>
			) as HTMLDivElement
			return {
				element: el,
				init() {
					onCleanup(() => this.dispose())
				},
				dispose() {},
			}
		},
		createComponent(options) {
			if (!isValidAutomergeUrl(options.id)) return
			const element = (
				<div style={{height: "100%"}}>
					<Editor url={options.id as AutomergeUrl} />
				</div>
			) as HTMLElement
			return {
				init() {
					onCleanup(() => this.dispose())
				},
				element,
				dispose() {},
			}
		},
	})

	const disposable = dv.onDidLayoutChange(() => {
		const layout: SerializedDockview = dv.toJSON()
		localStorage.setItem("layout", JSON.stringify(layout))
		location.hash = dv.activePanel?.id
	})

	onCleanup(() => disposable.dispose())

	const mySerializedLayout = localStorage.getItem("layout")

	if (mySerializedLayout) {
		try {
			const layout = JSON.parse(mySerializedLayout)
			dv.fromJSON(layout)
		} catch {
			/* empty */
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
									<LeftSidebar dv={dv} />
								</Resizable.Panel>
								<Resizable.Handle />
								<Resizable.Panel>{dock}</Resizable.Panel>
							</>
						)
					}}
				</Resizable>
			</section>
		</div>
	)
}
