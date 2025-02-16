import * as esbuild from "esbuild"

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["entry.ts"],
	treeShaking: true,
	logLevel: "info",
	bundle: true,
	sourcemap: false,
	minify: true,
	format: "esm",
	outdir: "output",
	target: ["safari17", "firefox127"],
	alias: {
		"@automerge/automerge": "@automerge/automerge/slim",
	},
}
