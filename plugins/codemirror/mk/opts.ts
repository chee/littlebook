import type {BuildOptions} from "esbuild"
import {wasmLoader} from "esbuild-plugin-wasm"

export default {
	entryPoints: ["entry.ts"],
	splitting: true,
	treeShaking: true,
	logLevel: "info",
	bundle: true,
	sourcemap: true,
	minify: true,
	format: "esm",
	outdir: "output",
	target: ["safari17", "firefox127"],
	plugins: [wasmLoader()],
	external: ["@automerge/automerge", "@automerge/vanillajs"],
} satisfies BuildOptions
