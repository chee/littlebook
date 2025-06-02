import * as Comlink from "comlink"
import {createSystem, createVirtualTypeScriptEnvironment} from "@typescript/vfs"
import ts from "typescript"
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
import LittlebookImportTypes from "./types/import-types.ts"
import type {LittlebookPluginShape} from "../shapes/shapes.ts"
import {cd, getFileContentWithJSXPragma} from "../util/path.ts"
import {walkImportsAndRequires} from "./babel/walk-imports.ts"
import {fetchXTypescriptTypes as fetchXTypescriptTypes} from "./types/x-typescript-types.ts"
import debug from "debug"
const log = debug("littlebook:plugin-editor:worker")

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
	vfs.createFile(
		"/node_modules/littlebook/index.d.ts",
		LittlebookPluginAPITypes
	)
	vfs.createFile("/imports.d.ts", LittlebookImportTypes)
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

const files = new Map<string, string>()

const javascriptFilenameRegex = /\.(m|c)?(t|j)sx?$/

function ata(code: string, filePath: string) {
	if (!javascriptFilenameRegex.test(filePath)) {
		log("skipping ata for not javascript file:", filePath)
		return
	}

	typescriptATA(code)

	walkImportsAndRequires(code, async (identifier, nodePath) => {
		const env = typescriptWorker.getEnv()
		env.createFile(
			`/node_modules/https://esm.sh/valibot/index.d.ts`,
			`declare module "https://esm.sh/valibot" {}`
		)
		if (identifier == "littlebook") {
		} else if (identifier.startsWith(".")) {
			const fullPath = cd(filePath, identifier)
			const content = await getRelativeImportContent(fullPath)
			content && env.createFile(fullPath, content)
		} else if (identifier.startsWith("https://")) {
			const content = await fetchXTypescriptTypes(identifier, files)
			if (!content) return

			for (const [path, code] of content.entries()) {
				env.createFile(
					`/node_modules/${path}/index.d.ts`,
					`declare module "${path}" {${code}}`
				)
			}
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
	tsWorker: typescriptWorker,
	ata(code: string, filePath: string) {
		ata(code, filePath)
	},
}

export type PluginEditorWorker = Remote<typeof pluginEditorWorker>

Comlink.expose(pluginEditorWorker)
