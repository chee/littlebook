import * as esbuild from "esbuild"

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
	loader: {
		".svg": "dataurl",
		".css": "text",
		".png": "dataurl",
		".json": "dataurl",
		".woff": "dataurl",
		".woff2": "dataurl",
	},
}
