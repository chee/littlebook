import codemirrorEditor from "./codemirror-editor.ts"
import minimal from "./minimal.ts"
import type PluginAPI from ":/plugins/plugin-api.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(codemirrorEditor)
	api.registerView(minimal)
}
