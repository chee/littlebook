import {createContext, useContext} from "solid-js"
import type {SourceRegistry} from "../registries/source-registry.ts"
import type {ViewRegistry} from "../registries/view-registry.ts"
// import type {SinkRegistry} from "../registries/sink-registry.ts"
import type {View} from "../domain/view/view.ts"
import type {Source} from "../domain/source/source.ts"
import debug from ":/core/debug.ts"
const log = debug.extend("plugin-api")

export default class PluginAPI {
	private viewRegistry: ViewRegistry
	private sourceRegistry: SourceRegistry

	// private sinkRegistry: SinkRegistry

	constructor(options: {
		viewRegistry: ViewRegistry
		sourceRegistry: SourceRegistry
		// sinkRegistry: SinkRegistry
	}) {
		this.viewRegistry = options.viewRegistry
		this.sourceRegistry = options.sourceRegistry
		// this.sinkRegistry = options.sinkRegistry
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

	// registerSink<T>(sink: Sink<T>) {
	// 	this.sinkRegistry.register(sink)
	// 	log("sink registered", sink.id)
	// }
}

export const PluginAPIContext = createContext<PluginAPI>()

export function usePluginAPI() {
	const context = useContext(PluginAPIContext)
	if (!context) {
		throw new Error(
			"[plugin-api]: `usePluginAPI` must be used within a `PluginAPIProvider` component",
		)
	}
	return context
}
