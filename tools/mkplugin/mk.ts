import arg from "arg"
import wasm from "vite-plugin-wasm"
import {resolve, dirname, basename} from "node:path"
import * as vite from "vite"

const args = arg({
	"--external": [s => s.split(",")],
	"-e": "--external",
	"--watch": Boolean,
	"-w": "--watch",
	"--name": String,
	"-n": "--name",
	"--entry": String,
	"-f": "--entry",
})

const external = args["--external"]?.flat()

const pluginRoot = resolve(args._[0] ?? ".")

const pluginFile = (p: string) => resolve(pluginRoot, p)

const name = args["--name"] ?? basename(pluginRoot)

const options: vite.InlineConfig = {
	build: {
		lib: {
			entry: pluginFile(args["--entry"] ?? "entry.ts"),
			name,
			fileName: name,
			formats: ["es"],
			cssFileName: name,
		},
		minify: true,
		sourcemap: false,
		// emptyOutDir: true,
		emptyOutDir: false,
		outDir: pluginFile("output"),
		watch: args["--watch"] ? {} : undefined,
		target: ["firefox127", "safari18", "esnext"],
		rollupOptions: {
			external: external?.concat([
				"@automerge/automerge",
				"@automerge/automerge-repo",
				"@automerge/vanillajs",
				"solid-js",
				"excalidraw",
				"tldraw",
			]),
			treeshake: true,
		},
	},
	plugins: [wasm()],
	logLevel: "info",
}

vite.build(options).then(watcher => {
	if ("on" in watcher) {
		// do watcher stuff?
	}
})
