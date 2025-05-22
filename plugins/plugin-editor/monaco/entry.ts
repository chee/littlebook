import type PluginAPI from "@littlebook/plugin-api"
import pluginEditor from "./plugin-editor.tsx"

export default function activeMonacoPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
}
