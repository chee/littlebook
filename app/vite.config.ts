import {defineConfig} from "vite"
import solid from "vite-plugin-solid"
import devtools from "solid-devtools/vite"
import wasm from "vite-plugin-wasm"
import {VitePWA} from "vite-plugin-pwa"
import autoprefixer from "autoprefixer"
import netlify from "@netlify/vite-plugin"
import paths from "vite-tsconfig-paths"
import {vitePluginNativeImportMaps as maps} from "vite-plugin-native-import-maps"

export default defineConfig({
	envPrefix: "LITTLEBOOK_",
	define: {
		"process.env.NODE_DEBUG": "false",
	},
	plugins: [
		paths({
			configNames: ["tsconfig.browser.json"],
		}),
		netlify(),
		solid(),
		devtools({
			autoname: true,
			locator: true,
		}),
		wasm(),
		VitePWA({
			strategies: "injectManifest",
			registerType: "autoUpdate",
			srcDir: "src/core",
			filename: "serviceworker.ts",
			devOptions: {
				enabled: true,
				// enabled: false,
				type: "module",
			},
			manifest: {
				name: "littlebook",
				short_name: "littlebook",
				description: "",
				theme_color: "#00FDBC",
			},
			workbox: {
				maximumFileSizeToCacheInBytes: 5000 * 1024 * 1024,
			},
			injectManifest: {
				maximumFileSizeToCacheInBytes: 5000 * 1024 * 1024,
				rollupFormat: "iife",
			},
		}),
	],
	worker: {
		format: "es",
		plugins: () => [paths(), wasm()],
	},
	build: {
		outDir: "output",
		emptyOutDir: true,
		sourcemap: true,
		minify: false,
		target: ["firefox127", "safari17", "esnext"],
	},
	css: {
		postcss: {
			plugins: [autoprefixer({})],
		},
	},
	server: {
		port: 1111,
		allowedHosts: true,
	},
})
