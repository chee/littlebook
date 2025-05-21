import automonaco from "automerge-monaco"
import type {FileEditor} from ":/domain/view/view.ts"
import * as monaco from "monaco-editor"
import * as v from "valibot"
import lite from "./themes/lite.ts"
import {PluginShape} from "../shapes.ts"

export type WorkerLoader = () => Worker
const workerLoaders: Partial<Record<string, WorkerLoader>> = {
	TextEditorWorker: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/editor/editor.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
	editorWorkerService: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/editor/editor.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
	typescript: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/language/typescript/ts.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
	css: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/language/css/css.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
	html: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/language/html/html.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
	json: () =>
		new Worker(
			new URL(
				"monaco-editor/esm/vs/language/json/json.worker.js",
				import.meta.url,
			),
			{type: "module"},
		),
}

window.MonacoEnvironment = {
	getWorker: function (_workerId, label) {
		console.log("getWorker", _workerId, label)
		const workerFactory = workerLoaders[label]
		if (workerFactory != null) {
			return workerFactory()
		}
		throw new Error(`Worker ${label} not found`)
	},
}

export default {
	id: "plugin-editor-monaco",
	displayName: "Plugin Editor (Monaco)",
	category: "editor",
	render(props) {
		const div = document.createElement("div")
		div.style.height = "100%"
		div.style.width = "100%"

		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			moduleResolution:
				monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			target: monaco.languages.typescript.ScriptTarget.ESNext,
			module: monaco.languages.typescript.ModuleKind.ESNext,
			allowSyntheticDefaultImports: true,
			allowNonTsExtensions: true,
			jsx: monaco.languages.typescript.JsxEmit.Preserve,
			jsxImportSource: "solid-js",
			lib: ["esnext", "dom"],
		})

		monaco.editor.defineTheme("lite", lite)
		const model = monaco.editor.createModel(
			props.handle.doc().text,
			"typescript",
			monaco.Uri.parse(props.handle.url + ".tsx"),
		)
		const editor = monaco.editor.create(div, {
			model,
			automaticLayout: true,
			minimap: {
				enabled: false,
			},
			fontSize: 16,
			fontFamily: "var(--family-mono)",
			theme: "lite",
		})

		automonaco(editor, props.handle, ["text"])
		editor.onDidChangeModelContent(() => {
			const code = editor.getValue()
			console.log("change")
		})

		return div
	},
	schema: PluginShape,
} satisfies FileEditor<PluginShape>
