import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView} from "@codemirror/view"
import {minimalSetup} from "codemirror"
import type {DocHandle} from "@automerge/automerge-repo"

export default {
	render(props: {
		handle: DocHandle<{text: string}>
		cleanup(fn: () => void): void
	}) {
		const editor = new EditorView({
			doc: props.handle.docSync()?.text,
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
	},
}
