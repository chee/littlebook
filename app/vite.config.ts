import {defineConfig, type Plugin} from "vite"
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
	esbuild: {
		jsx: "preserve",
	},
	optimizeDeps: {
		exclude: [
			// todo might remove rollup
			"@rollup/browser",
			"@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js",
			"@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js",
		],
	},
	envPrefix: "LITTLEBOOK_",
	define: {
		"process.env.NODE_DEBUG": "false",
		"process.versions.node": JSON.stringify("22.22"),
		global: "globalThis",
	},
	plugins: [
		wasiWorkaround(),
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
		netlify(),
		solid({
			include: [
				"**/*.{jsx,tsx}",
				"node_modules/**/*.{jsx,tsx}",
				"../plugins/**/*.{jsx,tsx}",
			],
			exclude: ["../plugins/opencanvas/**"],
		}),
		react({include: ["../plugins/opencanvas/**/*.{jsx,tsx}"]}),
		/* 		devtools({
			autoname: true,
			locator: true,
		}), */
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
		// todo temporary
		sourcemap: false,
		minify: true,
		target: ["firefox137", "safari18", "esnext"],
		rollupOptions: {jsx: "preserve"},
	},
	css: {postcss: {plugins: [autoprefixer({})]}},
	server: {
		port: 1111,
		allowedHosts: true,
	},
	resolve: {
		alias: {
			fs: "memfs",
			path: "pathe",
			url: "url/url.js",
			stream: "readable-stream-no-circular",
			"readable-stream": "readable-stream-no-circular",
			os: "os-browserify",
		},
	},
})

function wasiWorkaround(): Plugin {
	return {
		name: "wasi-workaround",
		enforce: "pre",
		transform(code, id) {
			// https://github.com/hi-ogawa/reproductions/blob/6d069f934ab38d14e461f6221226a30f216f2e53/oxc-wasi-vite/vite.config.ts
			// Vite bug? sometimes, the request with `?import&url` fails as Vite responds wasm binary.
			//   node_modules/@oxc-parser/binding-wasm32-wasi/parser.wasm32-wasi.wasm?import&url
			// Using `new URL(...)` seems to work more consistently.
			if (
				id.includes(
					"@oxc-parser/binding-wasm32-wasi/parser.wasi-browser.js",
				)
			) {
				return code.replace(
					`import __wasmUrl from './parser.wasm32-wasi.wasm?url'`,
					`const __wasmUrl = new URL("./parser.wasm32-wasi.wasm", import.meta.url);`,
				)
			}
		},
	}
}
