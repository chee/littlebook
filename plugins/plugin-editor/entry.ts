import "./plugin-editor.css"
import type {PluginShape} from "./shapes.ts"
import type {CreateSource} from "@littlebook/plugin-api/types/source.ts"
import type PluginAPI from "@littlebook/plugin-api"
import pluginEditor from "./editor/plugin-editor.tsx"

// const createPlugin: CreateSource<PluginShape> = {
// 	id: "create-plugin",
// 	category: "new",
// 	displayName: "Plugin",
// 	new() {
// 		return [
// 			{
// 				type: "plugin",
// 				package: "",
// 				tsconfig: "",
// 				javascript: "",
// 				css: "",
// 			},
// 			{name: "My Plugin"},
// 		]
// 	},
// }

const createPlugin: CreateSource<PluginShape> = {
	id: "create-plugin",
	category: "new",
	displayName: "Plugin",
	new() {
		return [
			{
				type: "plugin",
				text: "",
			},
			{name: "My Plugin"},
		]
	},
}

export default function activeCodeMirrorPluginEditor(api: PluginAPI) {
	api.registerView(pluginEditor)
	api.registerSource(createPlugin)
}
