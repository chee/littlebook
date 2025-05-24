import type {LittlebookPluginShape} from "../../shapes/shapes.ts"

import type {DocHandle} from "@automerge/vanillajs"
import esbuild from "esbuild-wasm"
// @ts-expect-error i don't know why
import esbuildWasm from "esbuild-wasm/esbuild.wasm?url"
import esbuildVirtual from "../virtual/esbuild-plugin-virtual.ts"
import transformFile from "../babel/transform-file.ts"
import {pluginToVFS} from "../virtual/util.ts"
import {findEntryFileName} from "../../util/path.ts"
import {solid} from "./solid.ts"

// todo enable extension fixing in babel and here?
// function replaceExtension(name: string, extension: string) {
// 	return name.replace(/\.[^.]+$/, `${extension}`)
// }

// async function transformVFS(
// 	virtual: Record<string, string>,
// 	handle: DocHandle<LittlebookPluginShape>
// ) {
// 	const vfs: Record<string, string> = {}
// 	for (const [name, code] of Object.entries(virtual)) {
// 		if (
// 			name.endsWith(".ts") ||
// 			name.endsWith(".tsx") ||
// 			name.endsWith(".jsx")
// 		) {
// 			const transformedCode = await transformFile(handle, name, code)
// 			vfs[replaceExtension(name, ".js")] = transformedCode.code!
// 		} else {
// 			vfs[name] = code
// 		}
// 	}
// 	return vfs
// }

let done = false
async function initializeEsbuild() {
	if (done) return
	await esbuild.initialize({wasmURL: esbuildWasm})
	done = true
}

export default async function roll(handle: DocHandle<LittlebookPluginShape>) {
	await initializeEsbuild()
	const doc = handle.doc()
	const virtualFileSystem = pluginToVFS(doc.src, `/${handle.url}`)
	const entry = findEntryFileName(doc)

	const build = await esbuild.build({
		entryPoints: [`/${handle.url}/${entry}`],
		bundle: true,
		minify: true,
		format: "esm",
		treeShaking: true,
		plugins: [
			solid({
				files: virtualFileSystem,
				jsxImportSource:
					typeof doc.meta.jsxImportSource == "string"
						? doc.meta.jsxImportSource
						: undefined,
			}),
			eternalExternal,
			esbuildVirtual(virtualFileSystem),
		],
		outdir: ".",
	})

	return build
}

// make everything external except for relative paths
const eternalExternal = {
	name: "eternal-external",
	setup(build: esbuild.PluginBuild) {
		build.onResolve({filter: /^[a-zA-Z]/}, args => {
			return {path: args.path, external: true}
		})
	},
}
