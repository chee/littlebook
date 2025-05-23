import "./plugin-editor.css"
import {autocompletion} from "@codemirror/autocomplete"
import {tsxLanguage} from "@codemirror/lang-javascript"
import {
	EditorView,
	keymap,
	lineNumbers,
	rectangularSelection,
} from "@codemirror/view"

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
import {PluginShape} from "../shapes.ts"
import {lycheeHighlightStyle} from "./theme.ts"
import {indentUnit, syntaxHighlighting} from "@codemirror/language"
import {minimalSetup} from "codemirror"
import {indentWithTab, emacsStyleKeymap} from "@codemirror/commands"
import type {FileEditor, ViewID} from "@littlebook/plugin-api/types/view.ts"
import type {Exposed} from "../worker/worker.ts"
import type {DocHandle} from "@automerge/vanillajs"
import {EditorState} from "@codemirror/state"

const innerWorker = new Worker(
	new URL("../worker/worker.ts", import.meta.url),
	{
		type: "module",
	}
)
const w = Comlink.wrap(innerWorker) as Exposed
const worker = w.worker as unknown as WorkerShape
await worker.initialize()

function getPath(handle: DocHandle<{text: string}>) {
	return `/${handle.url}.tsx`
}

enum mod {
	shift = 1,
	control = 2,
	option = 3,
	command = 4,
}

export function modshift(event: {
	ctrlKey: boolean
	shiftKey: boolean
	altKey: boolean
	metaKey: boolean
}) {
	let bits = 0
	bits |= +event.shiftKey << mod.shift
	bits |= +event.ctrlKey << mod.control
	bits |= +event.altKey << mod.option
	bits |= +event.metaKey << mod.command

	return bits
}

function createView(handle: DocHandle<{text: string}>) {
	return new EditorView({
		doc: handle.doc()?.text,
		extensions: [
			minimalSetup,
			automergeSyncPlugin({
				handle,
				path: ["text"],
			}),
			indentUnit.of("\t"),
			tsFacet.of({worker, path: getPath(handle)}),
			autocompletion({override: [tsAutocomplete()]}),
			tsSync(),
			tsLinterWorker(),
			tsHover(),
			tsGoto({
				gotoHandler(currentPath, hoverData, view) {
					console.log(currentPath, hoverData, view)
					return undefined
				},
			}),
			tsTwoslash(),
			tsxLanguage,
			// lycheeTheme,
			syntaxHighlighting(lycheeHighlightStyle),
			lineNumbers(),
			keymap.of([indentWithTab, ...emacsStyleKeymap]),
			EditorState.allowMultipleSelections.of(true),
			EditorState.tabSize.of(2),
			EditorView.clickAddsSelectionRange.of(event => {
				const mask = modshift(event)

				if (mask == 1 << mod.option) return true
				return false
			}),
			rectangularSelection({
				eventFilter(event) {
					const mask = modshift(event)
					if (mask == ((1 << mod.shift) | (1 << mod.option))) return true
					return false
				},
			}),
		],

		parent: (<div />) as HTMLElement,
	})
}

async function transject(handle: DocHandle<{text: string}>) {
	const transformed = await w.getTransformedFile(getPath(handle))
	if (transformed) {
		const blob = new Blob([transformed], {
			type: "text/javascript",
		})
		const url = URL.createObjectURL(blob)
		return import(/* @vite-ignore */ url)
	}
	return Promise.reject("No transformed file")
}

export default {
	id: "plugin-editor-codemirror" as ViewID,
	displayName: "Plugin Editor (CodeMirror)",
	category: "editor",
	render(props) {
		const tryTransject = () =>
			transject(props.handle)
				.then(() => props.toast.show("done", {modifiers: "yay"}))
				.catch(err => {
					console.log(err)
					props.toast.show("error", {
						body: (
							<pre style={{"white-space": "pre-line"}}>
								{err.message}
								<details>
									<summary>Stack trace</summary>
									{err.stack}
								</details>
							</pre>
						) as HTMLElement,
						modifiers: "error",
					})
				})
		props.registerKeybinding("cmd+s", event => {
			event.preventDefault()
			tryTransject()
		})

		const view = createView(props.handle)
		return (
			<plugin-editor style={{width: "100%", height: "100%"}}>
				<div
					style={{
						position: "absolute",
						top: "10px",
						right: "20px",
						"z-index": 1000,
					}}>
					<button class="primary button" onClick={tryTransject}>
						Run
					</button>
				</div>
				{view.dom}
			</plugin-editor>
		) as HTMLElement
	},
	schema: PluginShape,
} satisfies FileEditor<PluginShape>

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"plugin-editor": JSX.IntrinsicElements["div"]
		}
	}
}
