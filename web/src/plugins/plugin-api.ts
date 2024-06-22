import registries from "../contents/types/type-registries"
import type {EditorViewConstructor} from "../contents/views/content-view.ts"

// todo register a destructor at this moment.
export function registerContentType<T extends lb.AnyContent>(
	config: lb.plugins.ContentType<T>,
) {
	const contentType = config.type
	const isPlainType = typeof contentType == "string"
	const typename = isPlainType ? contentType : contentType.name
	registries.coders.register(typename, config.coder)
	if (config.views.editor) {
		registries.views.editor.register([typename], config.views.editor)
	}
	if (config.views.preview) {
		registries.views.preview.register([typename], config.views.preview)
	}
	if (!isPlainType) {
		registries.contentTypes.register(contentType)
	}
}

export function registerEditorView<T extends lb.AnyContent>(
	types: lb.UniformTypeIdentifier[],
	view: EditorViewConstructor<T>,
) {
	registries.views.editor.register(types, view)
}
