import "./plugin-editor.css"
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

import {type WorkerShape} from "@valtown/codemirror-ts/worker"
import * as Comlink from "comlink"
import {PluginShape} from "../../shapes.ts"
import {lycheeHighlightStyle} from "./theme.ts"
import {syntaxHighlighting} from "@codemirror/language"
import {minimalSetup} from "codemirror"
import {indentWithTab, emacsStyleKeymap} from "@codemirror/commands"
import type {FileEditor, ViewID} from "@littlebook/plugin-api/types/view.ts"
import {transformModulePaths} from "@bigmistqke/repl"
import * as babel from "@babel/standalone"
import type {Exposed} from "./worker.ts"

const innerWorker = new Worker(new URL("./worker.ts", import.meta.url), {
	type: "module",
})
const w = Comlink.wrap(innerWorker) as Exposed
const worker = w.worker as unknown as WorkerShape
await worker.initialize()

export default {
	id: "plugin-editor-codemirror" as ViewID,
	displayName: "Plugin Editor (CodeMirror)",
	category: "editor",
	render(props) {
		const dom = document.createElement("div")
		dom.style.width = "100%"
		dom.style.height = "100%"
		const path = () => `/${props.handle.url}.tsx`

		const view = new EditorView({
			doc: props.handle.doc()?.text,
			extensions: [
				minimalSetup,
				automergeSyncPlugin({
					handle: props.handle,
					path: ["text"],
				}),
				tsFacet.of({worker, path: path()}),
				autocompletion({override: [tsAutocomplete()]}),
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
			parent: dom,
		})
		const injectButtonContainer = document.createElement("div")
		injectButtonContainer.style.position = "absolute"
		injectButtonContainer.style.top = "10px"
		injectButtonContainer.style.right = "10px"
		injectButtonContainer.style.zIndex = "1000"
		const injectButton = document.createElement("button")
		injectButton.innerText = "Run"
		injectButton.className = "primary button"
		injectButton.onclick = async () => {
			const transformed = await w.getTransformedFile(path())
			console.log({transformed})
			if (transformed) {
				const blob = new Blob([transformed], {type: "text/javascript"})
				const url = URL.createObjectURL(blob)
				import(/* @vite-ignore */ url)
			}
		}
		injectButtonContainer.appendChild(injectButton)
		dom.appendChild(injectButtonContainer)
		return dom ?? view.dom
	},
	schema: PluginShape,
} satisfies FileEditor<PluginShape>
