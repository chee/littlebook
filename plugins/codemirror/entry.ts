import type PluginAPI from "@pointplace/app/src/plugins/plugin-api.ts"
import codemirrorEditor from "./codemirror-editor.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerEditor(codemirrorEditor)
}
