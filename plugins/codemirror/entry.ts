import type {PluginAPI} from "@littlebook/types"
import codemirrorEditor from "./codemirror-editor.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(codemirrorEditor)
}
