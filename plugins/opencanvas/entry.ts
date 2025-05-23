import {createOpenCanvas04} from "./src/sources/createOpenCanvas.ts"
import excalidrawView from "./src/views/excalidraw/excalidraw-view.tsx"
// import readonlyView from "./src/views/readonly/readonly-view.tsx"
import {TldrawView} from "./src/views/tldraw/tldraw-view.tsx"
import PluginAPI from "@littlebook/plugin-api"

export default function activateOpenCanvas(api: PluginAPI) {
	api.registerView(TldrawView)
	api.registerView(excalidrawView)
	// api.registerView(readonlyView)
	api.registerSource(createOpenCanvas04)
}
