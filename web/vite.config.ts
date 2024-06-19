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
		// nodePolyfills(),
		wasm(),
		devtools({
			autoname: true,
		}),
		// solidPlugin(),
	],
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
		target: ["firefox127", "safari14"],
	},
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: ["node_modules"],
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
