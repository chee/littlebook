import type {DocHandle} from "@automerge/vanillajs"
import esbuild from "esbuild-wasm"
// @ts-expect-error ???
import esbuildWasm from "esbuild-wasm/esbuild.wasm?url"
import esbuildVirtual from "./plugin-virtual.ts"
import {findEntryFileName} from "../path.ts"
import {solid} from "./plugin-solid.ts"
import {eternal} from "./plugin-dynamic-external.ts"
import {littlebookFileTreeToVirtualFileSystem} from "./virtual.ts"
import type {LittlebookPluginShape} from "../shapes.ts"

let done = false
async function initializeEsbuild() {
	if (done) return
	await esbuild.initialize({wasmURL: esbuildWasm})
	done = true
}

export default async function bundle(handle: DocHandle<LittlebookPluginShape>) {
	await initializeEsbuild()
	const doc = handle.doc()
	const virtualFileSystem = littlebookFileTreeToVirtualFileSystem(
		doc.src,
		`/${handle.url}`
	)

	const entry = findEntryFileName(doc)
	const jsxImportSource =
		doc.meta.jsxImportSource == "string"
			? doc.meta.jsxImportSource
			: undefined

	const build = await esbuild.build({
		entryPoints: [`/${handle.url}/${entry}`],
		bundle: true,
		minify: false,
		sourcemap: "inline",
		format: "esm",
		treeShaking: true,
		loader: {".css": "text"},
		plugins: [
			solid({files: virtualFileSystem, jsxImportSource}),
			eternal,
			esbuildVirtual(virtualFileSystem),
		],
		outdir: ".",
	})

	return build
}
