import * as esbuild from "esbuild"

await esbuild.build({
	entryPoints: ["index.ts"],
	bundle: true,
	sourcemap: true,
	minify: true,
	format: "esm",
	outfile: "index.js",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	target: ["safari17", "firefox127"],
	external: ["@automerge/automerge", "@excalidraw/excalidraw"],
})
