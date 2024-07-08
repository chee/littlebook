import * as esbuild from "esbuild"

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["text.ts"],
	logLevel: "info",
	bundle: true,
	sourcemap: true,
	minify: process.env.NODE_ENV != "development",
	format: "esm",
	outdir: "output",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	target: ["safari17", "firefox127"],
	loader: {".svg": "dataurl"},
	alias: {
		"@automerge/automerge": "@automerge/automerge/slim",
	},
}
