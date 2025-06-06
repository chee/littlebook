import {
	tsxLanguage,
	typescriptLanguage,
	javascriptLanguage,
	jsxLanguage,
	javascript,
} from "@codemirror/lang-javascript"
import {
	tsAutocomplete,
	tsFacet,
	tsGoto,
	tsHover,
	tsLinterWorker,
	tsSync,
	tsTwoslash,
} from "@valtown/codemirror-ts"
import {autocompletion} from "@codemirror/autocomplete"
import {type WorkerShape} from "@valtown/codemirror-ts/worker"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import type {DocHandle, Prop} from "@automerge/vanillajs"
import {
	getTypescriptEnvPath,
	getExtension,
	type LBPSrcFilePath,
} from "../../util/path.ts"
import {createBaseEditor, type BaseEditorOpts} from "../base/base-editor.tsx"
import type {PluginEditorWorker} from "../../worker/worker.ts"

const extLangMap = {
	js: javascriptLanguage,
	jsx: jsxLanguage,
	ts: typescriptLanguage,
	tsx: tsxLanguage,
} as const

export default function createTypescriptEditor(opts: BaseEditorOpts) {
	const ext = getExtension(opts) as keyof typeof extLangMap
	if (!(ext in extLangMap)) {
		throw new Error(
			`the extension needs to be one of js, jsx, ts, or tsx: ${opts.path.join(
				"/"
			)}`
		)
	}

	const baseEditor = createBaseEditor({
		...opts,
		extensions: [
			javascript({
				jsx: ext.endsWith("x"),
				typescript: ext.startsWith("t"),
			}),
			tsFacet.of({
				worker: opts.tsWorker,
				path: getTypescriptEnvPath(opts),
			}),
			autocompletion({override: [tsAutocomplete()]}),
			tsSync(),
			tsLinterWorker(),
			tsHover(),
			tsGoto(),
			tsTwoslash(),
			extLangMap[ext] ?? tsxLanguage,
		],
	})
	return baseEditor
}
