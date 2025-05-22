import type PluginAPI from "@littlebook/plugin-api"
import pluginEditor from "./editor/plugin-editor.ts"

export default function activeCodeMirrorPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
}
