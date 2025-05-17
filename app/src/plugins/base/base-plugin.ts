import type {PluginAPI} from "@littlebook/types"
import registerBaseSinks from "./base-sinks.ts"
import registerBaseSources from "./base-sources.ts"
import registerBaseViews from "./base-views.ts"

export default function activateBasePlugin(api: PluginAPI) {
	registerBaseSinks(api)
	registerBaseSources(api)
	registerBaseViews(api)
}
