import type {LittlebookPluginShape} from "../../shapes/shapes.ts"

import type {DocHandle} from "@automerge/vanillajs"
import esbuild from "esbuild-wasm"
// @ts-expect-error i don't know why
import esbuildWasm from "esbuild-wasm/esbuild.wasm?url"
import esbuildVirtual from "./plugin-virtual.ts"
import {findEntryFileName} from "../../util/path.ts"
import {solid} from "./plugin-solid.ts"
import {eternal} from "./plugin-dynamic-external.ts"
import {littlebookFileTreeToVirtualFileSystem} from "./virtual.ts"

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
		minify: true,
		format: "esm",
		treeShaking: true,
		plugins: [
			solid({files: virtualFileSystem, jsxImportSource}),
			eternal,
			esbuildVirtual(virtualFileSystem),
		],
		outdir: ".",
	})

	return build
}
