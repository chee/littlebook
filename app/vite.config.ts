import {defineConfig} from "vite"
import devtools from "solid-devtools/vite"
import wasm from "vite-plugin-wasm"
import {VitePWA} from "vite-plugin-pwa"
import autoprefixer from "autoprefixer"
import netlify from "@netlify/vite-plugin"
import paths from "vite-tsconfig-paths"
import {vitePluginNativeImportMaps as maps} from "vite-plugin-native-import-maps"
import solid from "vite-plugin-solid"
import react from "@vitejs/plugin-react"

export default defineConfig({
	esbuild: {jsx: "preserve"},
	envPrefix: "LITTLEBOOK_",
	define: {
		"process.env.NODE_DEBUG": "false",
		"process.versions.node": JSON.stringify("22.22"),
		global: "globalThis",
	},
	plugins: [
		maps({
			shared: [
				"index.html",
				"solid-automerge",
				"solid-js",
				"solid-js/web",
				"solid-js/html",
				"solid-js/store",
				"solid-js/h",
				"solid-js/jsx-runtime",
				"@automerge/automerge",
				"@automerge/automerge-repo",
				"@automerge/vanillajs",
				"valibot",
				"@littlebook/plugin-api",
				"react",
				"react-dom",
			],
		}),
		paths({configNames: ["tsconfig.browser.json"]}),
		// netlify(),
		solid({
			include: [
				"**/*.{jsx,tsx}",
				"node_modules/**/*.{jsx,tsx}",
				"../plugins/**/*.{jsx,tsx}",
			],
			exclude: ["../plugins/opencanvas/**"],
		}),
		react({include: ["../plugins/opencanvas/**/*.{jsx,tsx}"]}),
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
				rollupFormat: "es",
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
		minify: true,
		target: ["firefox137", "safari18", "esnext"],
		rollupOptions: {jsx: "preserve"},
	},
	css: {postcss: {plugins: [autoprefixer({})]}},
	server: {
		port: 1111,
		allowedHosts: true,
	},
})
