import {defineConfig} from "vite"
import solid from "vite-plugin-solid"
import devtools from "solid-devtools/vite"
import wasm from "vite-plugin-wasm"

export default defineConfig({
	envPrefix: "pointplace",
	plugins: [solid(), devtools({autoname: true}), wasm()],
	worker: {
		format: "es",
		plugins: () => [wasm()],
	},
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
		target: ["firefox127", "safari17"],
	},
})
