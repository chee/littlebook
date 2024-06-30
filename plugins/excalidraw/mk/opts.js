import * as esbuild from "esbuild"

/** @type {esbuild.BuildOptions} */
export default {
	entryPoints: ["index.ts"],
	logLevel: "info",
	bundle: true,
	sourcemap: true,
	minify: false,
	format: "esm",
	outfile: "index.js",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	target: ["safari17", "firefox127"],
	external: [
		"@automerge/automerge",
		"react",
		"react-dom",
		"preact",
		"@excalidraw/excalidraw",
	],
}
