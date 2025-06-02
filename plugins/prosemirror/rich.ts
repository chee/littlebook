import {init} from "@automerge/prosemirror"
import {EditorView} from "prosemirror-view"
import {EditorState} from "prosemirror-state"
import {exampleSetup} from "prosemirror-example-setup"

import {TextShape} from "@littlebook/plugin-api/shapes/shapes.ts"
import type {FileEditor} from "@littlebook/plugin-api/types/view.ts"

export default {
	id: "rich",
	displayName: "rich",
	category: "editor",
	styles: [import("prosemirror-menu/style/menu.css?inline")],
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
