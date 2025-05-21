import rich from "./rich.ts"
import type PluginAPI from ":/plugins/plugin-api.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(rich)
}
