import {defineConfig} from "vite"
import solid from "vite-plugin-solid"
import devtools from "solid-devtools/vite"
import wasm from "vite-plugin-wasm"
import paths from "vite-tsconfig-paths"

export default defineConfig({
	envPrefix: "littlebook",
	plugins: [
		solid(),
		devtools({autoname: true}),
		wasm(),
		paths({
			configNames: ["tsconfig.json", "tsconfig.app.json"],
		}),
	],
	worker: {format: "es", plugins: () => [wasm()]},
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
		target: ["firefox127", "safari17"],
	},
	server: {
		port: 1110,
	},
})
