import "./plugin-editor.css"
import type {PluginShape} from "./shapes.ts"
import type {CreateSource} from "@littlebook/plugin-api/types/source.ts"
import type PluginAPI from "@littlebook/plugin-api"
import pluginEditor from "./editor/plugin-editor.tsx"

const createPlugin: CreateSource<PluginShape> = {
	id: "create-zzz-plugin",
	category: "new",
	displayName: "zzzPlugin",
	new() {
		return {
			name: "untitled plugin",
			content: {
				type: "plugin",
				text: "",
			},
		}
	},
}

export default function activeCodeMirrorPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
	api.registerSource(createPlugin)
}
