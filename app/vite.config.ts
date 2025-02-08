import {defineConfig} from "vite"
import solid from "vite-plugin-solid"
import devtools from "solid-devtools/vite"
import wasm from "vite-plugin-wasm"
import dts from "vite-plugin-dts"

export default defineConfig({
	envPrefix: "pointplace",
	plugins: [
		solid(),
		devtools({autoname: true}),
		wasm(),
		dts({
			tsconfigPath: "./tsconfig.app.json",
		}),
	],
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
		lib: {
			entry: "./src/index.tsx",
			name: "pointplace",
			formats: ["es"],
			fileName: "pointplace",
		},
	},
	server: {
		port: 1111,
	},
})
