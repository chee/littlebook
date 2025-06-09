import {jsonLanguage, jsonParseLinter, json} from "@codemirror/lang-json"
// import {
// 	jsonCompletion,
// 	jsonSchemaHover,
// 	jsonSchemaLinter,
// 	stateExtensions,
// } from "codemirror-json-schema"
import {linter} from "@codemirror/lint"
import {createBaseEditor, type BaseEditorOpts} from "../base/base-editor.tsx"
import type {DocHandle, Prop} from "@automerge/vanillajs"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import {hoverTooltip} from "@codemirror/view"
import {Compartment} from "@codemirror/state"
import type {PluginEditorWorker} from "../../worker/worker.ts"
import type {LBPSrcFilePath} from "../../util/path.ts"

export default function createJSONEditor(opts: BaseEditorOpts) {
	const schemaCompartment = new Compartment()
	const lastPathPart = opts.path[opts.path.length - 1]
	// fetch("https://json.schemastore.org/" + lastPathPart).then(
	// 	async response => {
	// 		if (response.ok) {
	// 			const text = await response.text()
	// 			schemaCompartment.reconfigure(stateExtensions(JSON.parse(text)))
	// 		} else {
	// 			console.error("Failed to fetch schema for " + lastPathPart)
	// 		}
	// 	}
	// )

	const baseEditor = createBaseEditor({
		...opts,
		extensions: [
			json(),
			linter(jsonParseLinter(), {delay: 100}),
			// linter(jsonSchemaLinter(), {delay: 100}),
			// jsonLanguage.data.of({
			// 	autocomplete: jsonCompletion(),
			// }),
			// hoverTooltip(jsonSchemaHover()),
			// schemaCompartment.of(stateExtensions()),
		],
	})
	return baseEditor
}
