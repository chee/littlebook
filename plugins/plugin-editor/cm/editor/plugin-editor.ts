import {autocompletion} from "@codemirror/autocomplete"
import {tsxLanguage} from "@codemirror/lang-javascript"
import {EditorView, keymap, lineNumbers} from "@codemirror/view"
import {
	tsAutocomplete,
	tsFacet,
	tsGoto,
	tsHover,
	tsLinterWorker,
	tsSync,
	tsTwoslash,
} from "@valtown/codemirror-ts"
import {automergeSyncPlugin} from "@automerge/automerge-codemirror"

import type {FileEditor} from ":/domain/view/view.ts"

import {type WorkerShape} from "@valtown/codemirror-ts/worker"
import * as Comlink from "comlink"
import {PluginShape} from "../../shapes.ts"
import {lycheeHighlightStyle} from "./theme.ts"
import {syntaxHighlighting} from "@codemirror/language"
import {minimalSetup} from "codemirror"
import {indentWithTab, emacsStyleKeymap} from "@codemirror/commands"

const innerWorker = new Worker(new URL("./worker.ts", import.meta.url), {
	type: "module",
})
const worker = Comlink.wrap<WorkerShape>(innerWorker)
await worker.initialize()

export default {
	id: "plugin-editor-codemirror",
	displayName: "Plugin Editor (CodeMirror)",
	category: "editor",
	render(props) {
		const view = new EditorView({
			doc: props.handle.doc()?.text,
			extensions: [
				minimalSetup,
				automergeSyncPlugin({
					handle: props.handle,
					path: ["text"],
				}),
				tsFacet.of({worker, path: `/index.tsx`}),
				autocompletion({
					override: [tsAutocomplete()],
				}),
				tsSync(),
				tsLinterWorker(),
				tsHover(),
				tsGoto(),
				tsTwoslash(),
				tsxLanguage,
				// lycheeTheme,
				syntaxHighlighting(lycheeHighlightStyle),
				lineNumbers(),
				keymap.of([indentWithTab, ...emacsStyleKeymap]),
			],
			parent: document.createElement("div"),
		})
		return view.dom
	},
	schema: PluginShape,
} satisfies FileEditor<PluginShape>
