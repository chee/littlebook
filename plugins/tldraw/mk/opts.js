import * as esbuild from "esbuild"
import {wasmLoader} from "esbuild-plugin-wasm"

console.log(globalThis.process.env.NODE_ENV)

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["index.ts"],
	logLevel: "info",
	bundle: true,
	sourcemap: false,
	minify: globalThis.process.env.NODE_ENV == "production",
	format: "esm",
	outdir: "output",
	target: ["safari17", "firefox127"],
	treeShaking: true,
	loader: {
		// ".svg": "dataurl",
		".css": "text",
		// ".png": "dataurl",
		// ".json": "dataurl",
		// ".woff": "dataurl",
		// ".woff2": "dataurl",
	},
	plugins: [wasmLoader()],
	external: ["@automerge/automerge", "@automerge/vanillajs"],
}
