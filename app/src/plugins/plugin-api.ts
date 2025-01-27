import type {CoderRegistry} from "../registries/coder/coder-registry.ts"
import type {Coder} from "../registries/coder/coder-schema.ts"
import type {EditorRegistry} from "../registries/editor/editor-registry.ts"

export default class PluginAPI {
	#editorRegistry: EditorRegistry
	#coderRegistry: CoderRegistry
	constructor(options: {
		editorRegistry: EditorRegistry
		coderRegistry: CoderRegistry
	}) {
		this.#editorRegistry = options.editorRegistry
		this.#coderRegistry = options.coderRegistry
	}

	registerEditor(editor: Editor) {
		this.#editorRegistry.register(editor)
	}

	registerCoder(coder: Coder) {
		this.#coderRegistry.register(coder)
	}
}
