import type {FileEditor} from ":/domain/view/view.ts"
import {TextShape} from ":/plugins/base/shapes/shapes.ts"
import {init} from "@automerge/prosemirror"
import {EditorView} from "prosemirror-view"
import {EditorState} from "prosemirror-state"
import {exampleSetup} from "prosemirror-example-setup"
import "prosemirror-menu/style/menu.css"

export default {
	id: "rich",
	displayName: "rich",
	category: "editor",
	render(api) {
		const dom = document.createElement("div")
		dom.className = "editor content"
		const {pmDoc, schema, plugin} = init(api.handle, ["text"])
		const state = EditorState.create({
			doc: pmDoc,
			schema: schema,
			plugins: [...exampleSetup({schema}), plugin],
		})
		new EditorView(dom, {state})
		return dom
	},
	schema: TextShape,
} satisfies FileEditor<TextShape>
