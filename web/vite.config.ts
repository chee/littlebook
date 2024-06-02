import {defineConfig} from "vite"
import preact from "@preact/preset-vite"

export default defineConfig({
	optimizeDeps: {
		exclude: ["@evolu/common-web", "@sqlite.org/sqlite-wasm"],
	},
	plugins: [preact()],
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
	},
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
})
