import "./plugin-editor.css"
import type {PluginShape} from "./shapes.ts"
import activeMonacoPluginEditor from "./monaco/entry.ts"
import activeCodeMirrorPluginEditor from "./cm/entry.ts"
import type {CreateSource} from "@littlebook/plugin-api/types/source.ts"
import type PluginAPI from "@littlebook/plugin-api"

const createPlugin: CreateSource<PluginShape> = {
	id: "create-plugin",
	category: "new",
	displayName: "Plugin",
	new() {
		return [{type: "plugin", text: ""}, {name: "My Plugin"}]
	},
}

export default function activatePluginEditor(api: PluginAPI) {
	api.registerSource(createPlugin)
	activeMonacoPluginEditor(api)
	activeCodeMirrorPluginEditor(api)
}
