import {defineConfig} from "vite"

export default defineConfig({
	build: {
		lib: {
			entry: "./lib/main.ts",
			name: "Solid Hotkeys",
			fileName: "solid-hotkeys",
			formats: ["es"],
		},
	},
})
