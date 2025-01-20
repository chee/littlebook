import * as esbuild from "esbuild"

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["index.ts"],
	logLevel: "info",
	bundle: true,
	sourcemap: false,
	minify: globalThis.process.env.NODE_ENV != "development",
	format: "esm",
	outdir: "output",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	target: ["safari17", "firefox127"],
	loader: {
		".svg": "dataurl",
		".css": "text",
		".png": "dataurl",
		".json": "dataurl",
		".woff": "dataurl",
		".woff2": "dataurl",
	},
}
