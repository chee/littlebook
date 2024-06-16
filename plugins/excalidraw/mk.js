import * as esbuild from "esbuild"

await esbuild.build({
	entryPoints: ["index.ts"],
	bundle: true,
	sourcemap: true,
	outfile: "index.js",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
	},
	external: ["@automerge/automerge"],
})
