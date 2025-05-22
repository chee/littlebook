import codemirrorEditor from "./codemirror-editor.ts"
import minimal from "./minimal.ts"
import type PluginAPI from "@littlebook/plugin-api"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(codemirrorEditor)
	api.registerView(minimal)
}
