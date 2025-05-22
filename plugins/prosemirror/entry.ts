import type PluginAPI from "@littlebook/plugin-api/plugin-api.ts"
import rich from "./rich.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(rich)
}
