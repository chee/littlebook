import {createDockview, type DockviewApi} from "dockview-core"
import {
	createContext,
	onCleanup,
	useContext,
	type Component,
	type JSX,
	type ParentComponent,
	Show,
	splitProps,
	createRoot,
} from "solid-js"
import "./dock.css"
import {createDockAPI} from "./dock-api.ts"
import {Dynamic} from "solid-js/web"
import type {DocumentURL} from "@pointplace/types"

export interface DockComponentProps {
	// the id of the file to open
	id: DocumentURL
	dockAPI: DockAPI
}

export interface DockHeaderActionProps {
	groupID: string
	dockAPI: DockAPI
}

function createDockContext(dockOptions: {
	components: Record<string, Component<DockComponentProps>>
	tabComponents?: Record<string, Component<DockComponentProps>>
	rightHeaderActionComponent?: Component<DockHeaderActionProps>
	watermarkComponent?: Component
}) {
	const element = (<div style={{display: "contents"}} />) as HTMLDivElement

	const dockviewAPI = createDockview(element, {
		createComponent(options) {
			const component = () => dockOptions.components[options.name]
			if (!component()) {
				console.error(`no such panel component ${options.name}`)
			}

			const element = (
				<div style={{display: "contents"}}>
					<Show when={component()}>
						<Dynamic
							component={component()}
							id={options.id as DocumentURL}
							dockAPI={dockAPI}
						/>
					</Show>
				</div>
			) as HTMLElement
			return {
				element,
				init() {},
			}
		},
		createTabComponent(options) {
			const component = () => dockOptions.tabComponents?.[options.name]
			if (!component()) {
				console.error(`no such tab component ${options.name}`)
			}

			const element = (
				<div style={{display: "contents"}}>
					<Show when={component()}>
						<Dynamic
							component={component()}
							id={options.id as DocumentURL}
							dockAPI={dockAPI}
						/>
					</Show>
				</div>
			) as HTMLElement
			return {
				element,
				init() {},
			}
		},
		createRightHeaderActionComponent(options) {
			const component = () => dockOptions.rightHeaderActionComponent

			const element = (
				<div style={{display: "contents"}}>
					<Show when={component()}>
						<Dynamic
							component={component()}
							groupID={options.id}
							dockAPI={dockAPI}
						/>
					</Show>
				</div>
			) as HTMLElement
			return {
				element,
				init() {},
				dispose() {},
			}
		},
		createWatermarkComponent() {
			const component = () => dockOptions.watermarkComponent ?? "div"

			const element = createRoot(() => (
				<div style={{display: "contents"}}>
					<Show when={component()}>
						<Dynamic component={component()} />
					</Show>
				</div>
			)) as HTMLElement
			return {
				element,
				init() {},
				dispose() {},
			}
		},
	})

	const dockAPI = createDockAPI(dockviewAPI)
	return {element, dockAPI, dockviewAPI}
}

type DockContext = ReturnType<typeof createDockContext>

export const DockProvider: ParentComponent<
	Parameters<typeof createDockContext>[0]
> = dockProviderProps => {
	const [props, dockContextOptions] = splitProps(dockProviderProps, [
		"children",
	])

	const dockContext = createDockContext(dockContextOptions)

	onCleanup(() => {
		dockContext.dockviewAPI.dispose()
	})

	return (
		<DockContext.Provider value={dockContext}>
			<DockAPIContext.Provider value={dockContext.dockAPI}>
				<DockviewAPIContext.Provider value={dockContext.dockviewAPI}>
					<DockElementContext.Provider value={dockContext.element}>
						{props.children}
					</DockElementContext.Provider>
				</DockviewAPIContext.Provider>
			</DockAPIContext.Provider>
		</DockContext.Provider>
	)
}

export const Dock: Component = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
	const element = useContext(DockElementContext)

	return (
		<div class="dock" {...props}>
			{element}
		</div>
	)
}

export const DockContext = createContext<DockContext>()

export const DockviewAPIContext = createContext<DockviewApi>()

export type DockAPI = ReturnType<typeof createDockAPI>
export const DockAPIContext = createContext<DockAPI>()

export function useDockAPI() {
	const context = useContext(DockAPIContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockAPI` must be used within a `Dock` component"
		)
	}

	return context
}

export const DockElementContext = createContext<HTMLElement>()

export function useDockElement() {
	const context = useContext(DockElementContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockElement` must be used within a `Dock` component"
		)
	}

	return context
}

export function useDockviewAPI() {
	const context = useContext(DockviewAPIContext)

	if (context === undefined) {
		throw new Error(
			"[dock]: `useDockviewContext` must be used within a `Dock` component"
		)
	}

	return context
}

export default DockProvider
