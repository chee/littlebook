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
import {transformModulePaths} from "@bigmistqke/repl"
import type {Remote} from "comlink"
import LittlebookPluginAPITypes from "./types/LittlebookPluginAPITypes.ts"
import type {LittlebookPluginShape} from "../shapes/shapes.ts"
import {cd, getFileContent, getFileContentWithJSXPragma} from "../util/path.ts"
import roll from "./esbuild/roll.ts"

const repo = new Repo({
	network: [new WebSocketClientAdapter(`wss://galaxy.observer`)],
	storage: new IndexedDBStorageAdapter("littlebook"),
	enableRemoteHeadsGossiping: true,
})

const compilerOptions = {
	target: ts.ScriptTarget.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	allowImportingTsExtensions: true,
	lib: ["esnext", "dom"],
	module: ts.ModuleKind.ESNext,
	allowJs: true,
	checkJs: true,
	noEmit: true,
	composite: true,
	strict: true,
} as ts.CompilerOptions

const vfs = (async function () {
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
})()

const typescriptWorker = createWorker({
	env: vfs,
	async onFileUpdated(_env, filePath, code) {
		// the vfs
		ata(code)
		const env = typescriptWorker.getEnv()
		transformModulePaths(
			code,
			importPath => (
				(async () => {
					if (!importPath.startsWith(".")) return

					const fullPath = cd(filePath, importPath)
					const [, automergeUrl] = fullPath.split("/")
					const handle = await repo.find<LittlebookPluginShape>(
						automergeUrl as AutomergeUrl
					)
					const start = fullPath.indexOf("/src/")
					const path = fullPath.slice(start + 1).split("/") as [
						"src",
						...string[]
					]
					if (path[0] !== "src") {
						throw new Error(
							`Expected path to start with "src", got "${path}"`
						)
					}
					const content = getFileContentWithJSXPragma({handle, path})
					if (content != null) {
						env.createFile(fullPath, content)
					}
				})(),
				importPath
			)
		)
	},
})

const ata = setupTypeAcquisition({
	projectName: "hehe",
	typescript: ts,
	logger: console,
	delegate: {
		receivedFile: (code: string, path: string) => {
			typescriptWorker.getEnv().createFile(path, code)
		},
	},
})

const pluginEditorWorker = {
	async compile(url: AutomergeUrl) {
		const handle = await repo.find<PluginShape>(url)
		return roll(handle)
	},
	tsWorker: typescriptWorker,
}

export type PluginEditorWorker = Remote<typeof pluginEditorWorker>

Comlink.expose(pluginEditorWorker)
