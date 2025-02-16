import {createContext, useContext} from "solid-js"
import type {SourceRegistry} from "../registries/source-registry.ts"
import type {Coder} from "@pointplace/types/src/source.ts"
import type {ViewRegistry} from "../registries/view-registry.ts"
import type {Editor} from "@pointplace/types/src/view.ts"
import type {ContentTypeRegistry} from "../registries/content-type-registry.ts"
import type {SinkRegistry} from "../registries/sink-registry.ts"
import type {Publisher} from "@pointplace/types/src/sink.ts"
import type {ContentType} from "@pointplace/types"
const log = window.log.extend("plugin-api")

export default class PluginAPI {
	#editorRegistry: ViewRegistry
	#coderRegistry: SourceRegistry
	#contentTypeRegistry: ContentTypeRegistry
	#publisherRegistry: SinkRegistry

	constructor(options: {
		editorRegistry: ViewRegistry
		coderRegistry: SourceRegistry
		contentTypeRegistry: ContentTypeRegistry
		publisherRegistry: SinkRegistry
	}) {
		this.#editorRegistry = options.editorRegistry
		this.#coderRegistry = options.coderRegistry
		this.#contentTypeRegistry = options.contentTypeRegistry
		this.#publisherRegistry = options.publisherRegistry
	}

	registerEditor<T>(editor: Editor<T>) {
		this.#editorRegistry.register(editor)
		log("editor registered", editor.id)
	}

	registerCoder<T>(coder: Coder<T>) {
		this.#coderRegistry.register(coder)
		log("coder registered", coder.id)
	}

	registerPublisher<T>(publisher: Publisher<T>) {
		this.#publisherRegistry.register(publisher)
		log("publisher registered", publisher.id)
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
