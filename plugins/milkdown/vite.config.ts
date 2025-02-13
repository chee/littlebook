import {defineConfig} from "vite"
import solid from "vite-plugin-solid"
import dts from "vite-plugin-dts"

export default defineConfig({
	plugins: [
		solid(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: "./lib/main.tsx",
			name: "Milkdown",
			fileName: "milkdown",
			formats: ["es"],
		},
		minify: false,
		rollupOptions: {
			// todo faq
			external: ["@pointplace/types", "@automerge/automerge-repo"],
		},
	},
})
