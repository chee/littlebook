import * as esbuild from "esbuild"

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["text.ts"],
	logLevel: "info",
	bundle: true,
	sourcemap: false,
	minify: process.env.NODE_ENV != "development",
	format: "esm",
	outdir: "output",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	target: ["safari17", "firefox127"],
	loader: {
		".svg": "dataurl",
		".png": "dataurl",
		".css": "dataurl",
		".json": "dataurl",
		".woff": "dataurl",
		".woff2": "dataurl",
	},
	alias: {
		"@automerge/automerge": "@automerge/automerge/slim",
	},
}
