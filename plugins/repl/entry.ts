import type PluginAPI from ":/plugins/plugin-api.ts"
import repl from "./repl.ts"

export default function ReplPlugin(api: PluginAPI) {
	api.registerView(repl)
}
