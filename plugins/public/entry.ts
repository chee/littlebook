import type {PluginAPI} from "@pointplace/types"
import codemirrorEditor from "./codemirror-editor.ts"

// todo
export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerEditor(codemirrorEditor)
}
