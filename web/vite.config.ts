import {defineConfig, type UserConfig} from "vite"
import {VitePWA as pwa} from "vite-plugin-pwa"
import wasm from "vite-plugin-wasm"
import solid from "vite-plugin-solid"
import devtools from "solid-devtools/vite"
import {analyzer} from "vite-bundle-analyzer"
import {readdir} from "node:fs/promises"

let plugins = await readdir("./public/plugins")

export const config: UserConfig = {
	envPrefix: "LB",
	define: {
		"process.env.IS_PREACT": JSON.stringify("true"),
		"import.meta.env.SERVER_PLUGINS": plugins,
	},
	worker: {
		format: "es",
		plugins: () => [wasm()],
	},
	plugins: [
		// visualizer({
		// 	emitFile: true,
		// 	filename: "stats.html",
		// }) as PluginOption,
		analyzer(),
		wasm(),
		pwa({
			registerType: "prompt",
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
				// todo back and forward buttons
				display: "fullscreen",
				background_color: "#ffe9ed",
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico,wasm}"],
				cleanupOutdatedCaches: false,
				clientsClaim: true,
				maximumFileSizeToCacheInBytes: 999999999999999,
				additionalManifestEntries: [],
			},
			devOptions: {
				enabled: true,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
		solid(
			/* {
			babel: {
				plugins: [
					[
						"@locator/babel-jsx/dist",
						{
							env: "development",
						},
					],
				],
			},
		} */
		),
		devtools({
			autoname: true,
		}),
	],
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: "hidden",
		minify: false,
		target: ["firefox127", "safari17"],
	},
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: ["node_modules"],
			},
		},
	},
	// server: {
	// 	headers: {
	// 		"Cross-Origin-Opener-Policy": "same-origin",
	// 		"Cross-Origin-Embedder-Policy": "require-corp",
	// 	},
	// },
}

export default defineConfig(config)
