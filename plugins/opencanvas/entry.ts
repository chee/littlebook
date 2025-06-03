import {createOpenCanvas04} from "./src/sources/createOpenCanvas.ts"
// import readonlyView from "./src/views/readonly/readonly-view.tsx"
import PluginAPI from "@littlebook/plugin-api"

export default async function activateOpenCanvas(api: PluginAPI) {
	await import("./src/views/excalidraw/excalidraw-view.tsx").then(mod => {
		api.registerView(mod.default)
	})
	await import("./src/views/tldraw/tldraw-view.tsx").then(mod => {
		api.registerView(mod.TldrawView)
	})

	// api.registerView(readonlyView)
	api.registerSource(createOpenCanvas04)
}
