import {
	UniformType,
	type ResolvableUniformTypes,
} from "../contents/uniform-type.ts"
import {
	editorViewRegistry,
	previewRegistry,
	type EditorViewConstructor,
	type PreviewConstructor,
} from "../contents/content-view.ts"
import {coderRegistry} from "../contents/coders.ts"

// todo register a destructor at this moment.

export function registerEditorView<T extends lb.AnyContent>(
	types: ResolvableUniformTypes,
	view: EditorViewConstructor<T>,
) {
	editorViewRegistry.register(types, view)
}

export function registerPreview<T extends lb.AnyContent>(
	types: ResolvableUniformTypes,
	view: PreviewConstructor<T>,
) {
	previewRegistry.register(types, view)
}

export function registerCoder<T extends lb.AnyContent>(
	types: ResolvableUniformTypes,
	coder: lb.ContentCoder<T>,
) {
	coderRegistry.register(types, coder)
}

export {UniformType}
