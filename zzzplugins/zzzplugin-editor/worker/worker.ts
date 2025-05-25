import {createSystem, createVirtualTypeScriptEnvironment} from "@typescript/vfs"
import ts from "typescript"
import * as Comlink from "comlink"
import {createWorker} from "@valtown/codemirror-ts/worker"
import {setupTypeAcquisition} from "@typescript/ata"
import fsMap from "./libmap/_map.ts"
import {
	Repo,
	WebSocketClientAdapter,
	IndexedDBStorageAdapter,
	type AutomergeUrl,
} from "@automerge/vanillajs/slim"
import {automergeWasmBase64} from "@automerge/automerge/automerge.wasm.base64"
import {next as Automerge} from "@automerge/automerge/slim"
// import {transformModulePaths} from "@bigmistqke/repl"
import type {Remote} from "comlink"
import solid from "../babel/babel-preset-solid.js"
import * as babel from "@babel/standalone"
import LittlebookPluginAPITypes from "./types/LittlebookPluginAPITypes.ts"

const repo = new Repo({
	network: [new WebSocketClientAdapter(`wss://galaxy.observer`)],
	storage: new IndexedDBStorageAdapter("littlebook"),
	enableRemoteHeadsGossiping: true,
})

const compilerOptions = {
	target: ts.ScriptTarget.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	jsx: ts.JsxEmit.Preserve,
	jsxImportSource: "solid-js",

	lib: ["esnext", "dom"],
	module: ts.ModuleKind.ESNext,
	allowJs: true,
	composite: true,
	strict: true,
} as ts.CompilerOptions

const worker = createWorker({
	env: (async function () {
		await Automerge.initializeBase64Wasm(automergeWasmBase64)
		const system = createSystem(fsMap)
		const vfs = createVirtualTypeScriptEnvironment(
			system,
			[],
			ts,
			compilerOptions
		)
		vfs.createFile("global.d.ts", LittlebookPluginAPITypes)

		return vfs
	})(),
	onFileUpdated(_env, _path, code) {
		// todo if there is an /automerge: import, find the file and inject it to
		// the vfs
		ata(code)
		const env = worker.getEnv()
		transformModulePaths(code, path => {
			if (path.startsWith("./automerge:")) {
				repo.find<{text: string}>(path.slice(2) as AutomergeUrl).then(h => {
					env.createFile(path.slice(1) + ".tsx", h.doc().text)
				})
			}
			return path
		})
	},
})

const ata = setupTypeAcquisition({
	projectName: "hehe",
	typescript: ts,
	logger: console,
	delegate: {
		receivedFile: (code: string, path: string) => {
			worker.getEnv().createFile(path, code)
		},
	},
})

const exposed = {
	async fix(path: string, start: number, end: number) {
		const env = worker.getEnv()
	},
	async getTranspiledFile(path: string) {
		const env = worker.getEnv()
		const file = env.getSourceFile(path)
		if (!file) throw new Error(`File not found for path ${path}`)
		const transpiled = ts.transpileModule(file.text, {compilerOptions})
		return transpiled.outputText
	},
	async getTransformedFile(path: string) {
		const env = worker.getEnv()
		const file = env.getSourceFile(path)
		if (!file) throw new Error(`File not found for path ${path}`)

		const transformed = babel.transform(file.text, {
			presets: [
				"typescript",
				[
					"env",
					{
						loose: true,
						modules: false,
					},
				],
				[solid, {generate: "dom"}],
			],
			filename: path,
		})
		const redirected = transformModulePaths(
			transformed.code!,
			(path, isImport) => {
				if (isImport) {
					if ([".", "/"].includes(path[0])) {
						return `${location.origin}/${path.replace(
							/^[./]+/,
							""
						)}?${Math.random()}`
					}
				}
				return path
			}
		)!
		return redirected
	},
	worker,
}

export type Exposed = Remote<typeof exposed>

Comlink.expose(exposed)
