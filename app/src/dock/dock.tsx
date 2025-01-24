import {
	createDockview,
	type CreateComponentOptions,
	type DockviewApi,
	type DockviewGroupPanelApi,
	type DockviewIDisposable,
	type DockviewPanelApi,
	type IDockviewGroupPanel,
	type SerializedDockview,
} from "dockview-core"
import {
	createContext,
	createEffect,
	onCleanup,
	useContext,
	type Component,
	type JSX,
} from "solid-js"
import "./dock.css"
import type {AutomergeUrl} from "@automerge/automerge-repo/slim"
import {createStore} from "solid-js/store"

export const DockviewAPIContext = createContext<DockviewApi>()

export function useDockviewAPI() {
	const context = useContext(DockviewAPIContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockviewContext` must be used within a `Dock` component"
		)
	}

	return context
}

export const DockAPIContext = createContext<DockAPI>()

export function useDockAPI() {
	const context = useContext(DockAPIContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockContext` must be used within a `Dock` component"
		)
	}

	return context
}

function createDockAPI(dockviewAPI: DockviewApi) {
	const [api, updateAPI] = createStore({
		openDocument(id: AutomergeUrl) {
			const existing = dockviewAPI.getPanel(id)
			if (existing) {
				existing.api.setActive()
			} else {
				dockviewAPI.addPanel({
					id,
					component: "document",
					tabComponent: "document",
					renderer: "always",
				})
			}
		},
		loadLayout(layout: SerializedDockview) {
			try {
				dockviewAPI.fromJSON(layout)
			} catch {}
		},
		onLayoutChange(fn: () => void) {
			const disposer = dockviewAPI.onDidLayoutChange(fn)
			onCleanup(() => disposer.dispose())
		},
		closePanel(id: AutomergeUrl) {
			dockviewAPI.getPanel(id)?.api.close()
		},
		serializeLayout() {
			return dockviewAPI.toJSON()
		},
		activePanelID: dockviewAPI.activePanel?.id,
		panelIDs: dockviewAPI.panels.map(p => p.id),
	})

	const disposers: DockviewIDisposable[] = []

	disposers.push(
		dockviewAPI.onDidActivePanelChange(panel => {
			updateAPI("activePanelID", panel?.id)
		})
	)

	disposers.push(
		dockviewAPI.onDidLayoutChange(() => {
			updateAPI(
				"panelIDs",
				dockviewAPI.panels.map(p => p.id)
			)
		})
	)

	onCleanup(() => {
		for (const disposer of disposers) {
			disposer.dispose()
		}
	})

	return api
}

export type DockAPI = ReturnType<typeof createDockAPI>

const Dock: Component<{
	tab: Component<{
		id: CreateComponentOptions["id"]
		dockAPI: DockAPI
		dockviewAPI: DockviewApi
		panelAPI: DockviewPanelApi
	}>
	panel: Component<{
		id: CreateComponentOptions["id"]
		dockAPI: DockAPI
		dockviewAPI: DockviewApi
		panelAPI: DockviewPanelApi
	}>
	rightHeaderAction: Component<{
		dockviewAPI: DockviewApi
		dockAPI: DockAPI
		group: IDockviewGroupPanel
		groupAPI: DockviewGroupPanelApi
	}>
	children?(api: DockAPI): void | JSX.Element
}> = props => {
	const element = (<div style={{display: "contents"}} />) as HTMLDivElement

	const dockviewAPI = createDockview(element, {
		createTabComponent(options) {
			const element = (<div style={{display: "contents"}} />) as HTMLElement
			return {
				element,
				init(params) {
					element.append(
						(
							<div style={{display: "contents"}}>
								<DockviewAPIContext.Provider value={dockviewAPI}>
									<DockAPIContext.Provider value={dockAPI}>
										<props.tab
											dockAPI={dockAPI}
											dockviewAPI={params.containerApi}
											panelAPI={params.api}
											id={options.id}
										/>
									</DockAPIContext.Provider>
								</DockviewAPIContext.Provider>
							</div>
						) as HTMLDivElement
					)
				},
			}
		},
		createRightHeaderActionComponent() {
			const element = (<div style={{display: "contents"}} />) as HTMLElement

			return {
				element,
				init(params) {
					element.append(
						(
							<div style={{display: "contents"}}>
								<DockviewAPIContext.Provider value={dockviewAPI}>
									<DockAPIContext.Provider value={dockAPI}>
										<props.rightHeaderAction
											dockAPI={dockAPI}
											dockviewAPI={params.containerApi}
											group={params.group}
											groupAPI={params.api}
										/>
									</DockAPIContext.Provider>
								</DockviewAPIContext.Provider>
							</div>
						) as HTMLDivElement
					)
				},
				dispose() {},
			}
		},
		createComponent(options) {
			const element = (<div style={{display: "contents"}} />) as HTMLElement
			return {
				element,
				init(params) {
					element.append(
						(
							<div style={{display: "contents"}}>
								<DockviewAPIContext.Provider value={dockviewAPI}>
									<DockAPIContext.Provider value={dockAPI}>
										<props.panel
											dockAPI={dockAPI}
											dockviewAPI={params.containerApi}
											panelAPI={params.api}
											id={options.id}
										/>
									</DockAPIContext.Provider>
								</DockviewAPIContext.Provider>
							</div>
						) as HTMLDivElement
					)
				},
			}
		},
	})

	const dockAPI = createDockAPI(dockviewAPI)

	onCleanup(() => {
		dockviewAPI.dispose()
	})

	createEffect(() => props.children?.(dockAPI))

	return (
		<DockviewAPIContext.Provider value={dockviewAPI}>
			<DockAPIContext.Provider value={dockAPI}>
				{element}
			</DockAPIContext.Provider>
		</DockviewAPIContext.Provider>
	)
}

export default Dock
