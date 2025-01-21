import {
	createDockview,
	type CreateComponentOptions,
	type DockviewApi,
	type DockviewGroupPanelApi,
	type DockviewPanelApi,
	type IDockviewGroupPanel,
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

export const DockviewAPIContext = createContext<DockviewApi>()

export function useDockviewAPIContext() {
	const context = useContext(DockviewAPIContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockviewContext` must be used within a `Dock` component"
		)
	}

	return context
}

const Dock: Component<{
	tab: Component<{
		id: CreateComponentOptions["id"]
		dockviewAPI: DockviewApi
		panelAPI: DockviewPanelApi
	}>
	panel: Component<{
		id: CreateComponentOptions["id"]
		dockviewAPI: DockviewApi
		panelAPI: DockviewPanelApi
	}>
	rightHeaderAction: Component<{
		dockviewAPI: DockviewApi
		group: IDockviewGroupPanel
		groupAPI: DockviewGroupPanelApi
	}>
	children?(api: DockviewApi): void | JSX.Element
}> = props => {
	const element = (<div style={{display: "contents"}} />) as HTMLDivElement

	const api = createDockview(element, {
		createTabComponent(options) {
			const element = (<div style={{display: "contents"}} />) as HTMLElement
			return {
				element,
				init(params) {
					element.append(
						(
							<div style={{display: "contents"}}>
								<props.tab
									dockviewAPI={params.containerApi}
									panelAPI={params.api}
									id={options.id}
								/>
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
								<props.rightHeaderAction
									dockviewAPI={params.containerApi}
									group={params.group}
									groupAPI={params.api}
								/>
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
								<props.panel
									dockviewAPI={params.containerApi}
									panelAPI={params.api}
									id={options.id}
								/>
							</div>
						) as HTMLDivElement
					)
				},
			}
		},
	})

	onCleanup(() => {
		api.dispose()
	})

	createEffect(() => props.children?.(api))

	return (
		<DockviewAPIContext.Provider value={api}>
			{element}
		</DockviewAPIContext.Provider>
	)
}

export default Dock
