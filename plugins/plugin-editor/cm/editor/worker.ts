import {createSystem, createVirtualTypeScriptEnvironment} from "@typescript/vfs"
import ts from "typescript"
import * as Comlink from "comlink"
import {createWorker} from "@valtown/codemirror-ts/worker"
import {setupTypeAcquisition} from "@typescript/ata"
import fsMap from "../map/_map.ts"
import lbdts from "../grave/lbdts.ts"

const worker = createWorker({
	env: (async function () {
		const compilerOpts = {
			target: ts.ScriptTarget.ESNext,
			moduleResolution: ts.ModuleResolutionKind.Bundler,
			jsx: ts.JsxEmit.Preserve,
			jsxImportSource: "solid-js",
		} as ts.CompilerOptions

		const system = createSystem(fsMap)

		const vfs = createVirtualTypeScriptEnvironment(system, [], ts, {
			...compilerOpts,
			// lib: ["esnext", "dom"],
		})
		vfs.createFile("global.d.ts", lbdts)
		return vfs
	})(),
	onFileUpdated(_env, _path, code) {
		ata(code)
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

Comlink.expose(worker)
