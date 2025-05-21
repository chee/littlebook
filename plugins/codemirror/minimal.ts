import type {FileEditor, FileEditorAPI} from ":/domain/view/view.ts"
import {CodeShape} from ":/plugins/base/shapes/shapes.ts"
import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView} from "@codemirror/view"
import {minimalSetup} from "codemirror"
// import {CodeSchema, FileEditor, type FileEditorAPI} from "+types+"

function render(props: FileEditorAPI<CodeShape>) {
	const editor = new EditorView({
		doc: props.handle.doc()?.text,
		extensions: [
			minimalSetup,
			automergeSyncPlugin({
				handle: props.handle,
				path: ["text"],
			}),
		],
		parent: document.createElement("div"),
	}).dom
	return editor
}

export default {
	id: "text-editor",
	displayName: "Text Editor",
	category: "editor",
	render,
	schema: CodeShape,
} satisfies FileEditor<CodeShape>
