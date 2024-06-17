import {defineConfig, type UserConfig} from "vite"
import {VitePWA as pwa} from "vite-plugin-pwa"
import wasm from "vite-plugin-wasm"
import {fileURLToPath} from "node:url"
import {nodePolyfills} from "vite-plugin-node-polyfills"
import solidPlugin from "vite-plugin-solid"
import devtools from "solid-devtools/vite"

function wordlist(list: string) {
	return fileURLToPath(
		new URL(`node_modules/bip39/wordlists/${list}.json`, import.meta.url),
	)
}

export const config: UserConfig = {
	worker: {
		format: "es",
		plugins: () => [wasm()],
	},
	plugins: [
		nodePolyfills(),
		wasm(),
		devtools({
			autoname: true,
		}),
		solidPlugin(),
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
				maximumFileSizeToCacheInBytes: 999999999999999,
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
		target: ["firefox127", "safari14"],
		rollupOptions: {
			input: {
				index: fileURLToPath(new URL("./index.html", import.meta.url)),
				export: fileURLToPath(new URL("./export/index.html", import.meta.url)),
				signout: fileURLToPath(
					new URL("./signout/index.html", import.meta.url),
				),
			},
			external: [
				...[
					"chinese_simplified",
					"chinese_traditional",
					"czech",
					"french",
					"italian",
					"japanese",
					"korean",
					"portuguese",
					"spanish",
				].map(wordlist),
			],
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: ["./src/ui/styles/", "node_modules"],
			},
		},
	},
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
}

export default defineConfig(config)
