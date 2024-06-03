import {defineConfig} from "vite"
import preact from "@preact/preset-vite"
import {VitePWA as pwa} from "vite-plugin-pwa"
import wasm from "vite-plugin-wasm"

export default defineConfig({
	optimizeDeps: {
		exclude: ["@evolu/common-web", "@sqlite.org/sqlite-wasm"],
	},
	worker: {
		format: "es",
		plugins: () => [wasm()],
	},
	plugins: [
		wasm(),
		preact(),
		pwa({
			registerType: "autoUpdate",
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "littlebook",
				short_name: "littlebook",
				description: "my notebook",
				theme_color: "#36f9c0",
				display: "fullscreen",
				background_color: "#ffe9ed",
			},

			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico,wasm}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: true,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
		target: "esnext",
	},
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
})
