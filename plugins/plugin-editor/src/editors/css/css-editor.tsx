import {css, cssCompletionSource, cssLanguage} from "@codemirror/lang-css"
import {createBaseEditor, type BaseEditorOpts} from "../base/base-editor.tsx"
import type {EditorView} from "@codemirror/view"

export default function createStyleEditor(opts: BaseEditorOpts): EditorView {
	const baseEditor = createBaseEditor({
		...opts,
		extensions: [
			css(),
			cssLanguage.data.of({
				autocomplete: cssCompletionSource,
			}),
			// colorPicker,
		],
	})
	return baseEditor
}
