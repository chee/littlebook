import {createContext, useContext} from "solid-js"
import type {SourceRegistry} from "../registries/source-registry.ts"
import type {ViewRegistry} from "../registries/view-registry.ts"
import type {FileEditor} from "@littlebook/types/src/view.ts"
import type {SinkRegistry} from "../registries/sink-registry.ts"
import type {Sink, Source} from "@littlebook/types"
const log = window.log.extend("plugin-api")

export default class PluginAPI {
	private viewRegistry: ViewRegistry
	private sourceRegistry: SourceRegistry
	private sinkRegistry: SinkRegistry

	constructor(options: {
		viewRegistry: ViewRegistry
		sourceRegistry: SourceRegistry
		sinkRegistry: SinkRegistry
	}) {
		this.viewRegistry = options.viewRegistry
		this.sourceRegistry = options.sourceRegistry
		this.sinkRegistry = options.sinkRegistry
	}

	registerView<T>(editor: FileEditor<T>) {
		this.viewRegistry.register(editor)
		log("view registered", editor.id)
	}

	registerSource<T>(source: Source<T>) {
		this.sourceRegistry.register(source)
		log("source registered", source.id)
	}

	registerSink<T>(sink: Sink<T>) {
		this.sinkRegistry.register(sink)
		log("sink registered", sink.id)
	}
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
