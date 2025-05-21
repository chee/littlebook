import type PluginAPI from ":/plugins/plugin-api.ts"
import pluginEditor from "./editor/plugin-editor.ts"

export default function activeCodeMirrorPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
}
