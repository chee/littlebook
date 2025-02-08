import {createContext, useContext} from "solid-js"
import type {CoderRegistry} from "../registries/coder-registry.ts"
import type {Coder} from "../../../schemas/src/coder.ts"
import type {EditorRegistry} from "../registries/editor-registry.ts"
import type {Editor} from "../../../schemas/src/editor.ts"
import type {ContentTypeRegistry} from "../registries/content-type-registry.ts"
import type {PublisherRegistry} from "../registries/publisher-registry.ts"
import type {ContentType} from "../registries/content-type/content-type-schema.ts"
import type {Publisher} from "../../../schemas/src/publisher.ts"

export default class PluginAPI {
	#editorRegistry: EditorRegistry
	#coderRegistry: CoderRegistry
	#contentTypeRegistry: ContentTypeRegistry
	#publisherRegistry: PublisherRegistry

	constructor(options: {
		editorRegistry: EditorRegistry
		coderRegistry: CoderRegistry
		contentTypeRegistry: ContentTypeRegistry
		publisherRegistry: PublisherRegistry
	}) {
		this.#editorRegistry = options.editorRegistry
		this.#coderRegistry = options.coderRegistry
		this.#contentTypeRegistry = options.contentTypeRegistry
		this.#publisherRegistry = options.publisherRegistry
	}

	registerEditor(editor: Editor) {
		this.#editorRegistry.register(editor)
		log("editor registered", editor.id)
	}

	registerCoder(coder: Coder) {
		this.#coderRegistry.register(coder)
		log("coder registered", coder.id)
	}

	registerPublisher(publisher: Publisher) {
		this.#publisherRegistry.register(publisher)
		log("publisher registered", publisher.id)
	}

	registerContentType(contentType: ContentType) {
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
