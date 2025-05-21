import type PluginAPI from ":/plugins/plugin-api.ts"
import pluginEditor from "./plugin-editor.tsx"

export default function activeMonacoPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
}
