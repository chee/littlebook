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
import type {Remote} from "comlink"
import LittlebookPluginAPITypes from "./types/LittlebookPluginAPITypes.ts"
import type {LittlebookPluginShape} from "../shapes/shapes.ts"
import {cd, getFileContentWithJSXPragma} from "../util/path.ts"
import bundle from "./esbuild/bundle.ts"
import walkImports from "./babel/walk-imports.ts"

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
	async onFileUpdated(env, filePath, code) {
		ata(code, filePath)
	},
})

const typescriptATA = setupTypeAcquisition({
	projectName: "hehe",
	typescript: ts,
	logger: console,
	delegate: {
		receivedFile: (code: string, path: string) => {
			typescriptWorker.getEnv().createFile(path, code)
		},
	},
})

function ata(code: string, filePath: string) {
	typescriptATA(code)
	walkImports(code, async importPath => {
		if (importPath.startsWith(".")) {
			const fullPath = cd(filePath, importPath)
			const content = await getRelativeImportContent(fullPath)
			content && typescriptWorker.getEnv().createFile(fullPath, content)
		} else if (importPath.startsWith("https://")) {
			// download-types x-typescript-typeswise
		}
	})
}

// todo handle ../automerge: and /automerge: imports
async function getRelativeImportContent(path: string) {
	const [, automergeUrl] = path.split("/")
	const handle = await repo.find<LittlebookPluginShape>(
		automergeUrl as AutomergeUrl
	)
	const start = path.indexOf("/src/")
	const pathParts = path.slice(start + 1).split("/") as ["src", ...string[]]
	if (pathParts[0] !== "src") {
		throw new Error(`Expected path to start with "src", got "${path}"`)
	}
	return getFileContentWithJSXPragma({handle, path: pathParts})
}

const pluginEditorWorker = {
	async compile(url: AutomergeUrl) {
		const handle = await repo.find<LittlebookPluginShape>(url)
		return bundle(handle)
	},
	tsWorker: typescriptWorker,
	ata(code: string, filePath: string) {
		ata(code, filePath)
	},
}

export type PluginEditorWorker = Remote<typeof pluginEditorWorker>

Comlink.expose(pluginEditorWorker)
