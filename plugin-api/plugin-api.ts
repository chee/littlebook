import {createContext, useContext} from "solid-js"
import type {SourceRegistry} from "./registries/source-registry.ts"
import type {ViewRegistry} from "./registries/view-registry.ts"
import type {View} from "./types/view.ts"
import type {Source} from "./types/source.ts"
import debug from "debug"
const log = debug("littlebook:plugin-api")

export default class PluginAPI {
	private viewRegistry: ViewRegistry
	private sourceRegistry: SourceRegistry

	constructor(options: {
		viewRegistry: ViewRegistry
		sourceRegistry: SourceRegistry
	}) {
		this.viewRegistry = options.viewRegistry
		this.sourceRegistry = options.sourceRegistry
	}
	// callCommand<T>(commandId: string, args?: T): void
	// registerCommand<T>(command: Command): void

	registerView<T>(view: View<T>) {
		this.viewRegistry.register(view)
		log("view registered", view.id)
	}

	registerSource<T>(source: Source<T>) {
		this.sourceRegistry.register(source)
		log("source registered", source.id)
	}
}

export const PluginAPIContext = createContext<PluginAPI>()

export function usePluginAPI() {
	const context = useContext(PluginAPIContext)
	if (!context) {
		throw new Error(
			"[plugin-api]: `usePluginAPI` must be used within a `PluginAPIProvider` component"
		)
	}
	return context
}
