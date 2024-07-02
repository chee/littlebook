import UniformType, {
	type ResolvableUniformTypes,
} from "../files/uniform-type.ts"
import {
	editorViewRegistry,
	previewRegistry,
	type EditorViewConstructor,
	type PreviewConstructor,
} from "../files/content-view.ts"
import {coderRegistry} from "../files/content-coders.ts"

// todo register a destructor at this moment.s

export function registerEditorView<T extends lb.AnyContentValue>(
	types: ResolvableUniformTypes,
	view: EditorViewConstructor<T>,
) {
	editorViewRegistry.register(types, view)
}

export function registerPreview<T extends lb.AnyContentValue>(
	types: ResolvableUniformTypes,
	view: PreviewConstructor<T>,
) {
	previewRegistry.register(types, view)
}

export function registerCoder<T extends lb.AnyContentValue>(
	types: ResolvableUniformTypes,
	coder: lb.ContentCoder<T>,
) {
	coderRegistry.register(types, coder)
}

export {UniformType}
