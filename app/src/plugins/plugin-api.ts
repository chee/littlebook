import {createContext, useContext} from "solid-js"
import type {SourceRegistry} from "../registries/source-registry.ts"
import type {ViewRegistry} from "../registries/view-registry.ts"
import type {Editor} from "@pointplace/types/src/view.ts"
import type {ContentTypeRegistry} from "../registries/content-type-registry.ts"
import type {SinkRegistry} from "../registries/sink-registry.ts"
import type {ContentType, Sink, Source} from "@pointplace/types"
const log = window.log.extend("plugin-api")

export default class PluginAPI {
	#editorRegistry: ViewRegistry
	#sourceRegistry: SourceRegistry
	#contentTypeRegistry: ContentTypeRegistry
	#sinkRegistry: SinkRegistry

	constructor(options: {
		editorRegistry: ViewRegistry
		sourceRegistry: SourceRegistry
		contentTypeRegistry: ContentTypeRegistry
		sinkRegistry: SinkRegistry
	}) {
		this.#editorRegistry = options.editorRegistry
		this.#sourceRegistry = options.sourceRegistry
		this.#contentTypeRegistry = options.contentTypeRegistry
		this.#sinkRegistry = options.sinkRegistry
	}

	registerEditor<T>(editor: Editor<T>) {
		this.#editorRegistry.register(editor)
		log("editor registered", editor.id)
	}

	registerSource<T>(source: Source<T>) {
		this.#sourceRegistry.register(source)
		log("source registered", source.id)
	}

	registerSink<T>(sink: Sink<T>) {
		this.#sinkRegistry.register(sink)
		log("sink registered", sink.id)
	}

	registerContentType<T>(contentType: ContentType<T>) {
		this.#contentTypeRegistry.register(contentType)
		log("content type registered", contentType.id)
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
