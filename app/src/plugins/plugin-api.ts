import type {Coder, CoderRegistry} from "../registries/coder-registry.ts"
import type {Editor, EditorRegistry} from "../registries/editor-registry.ts"

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
