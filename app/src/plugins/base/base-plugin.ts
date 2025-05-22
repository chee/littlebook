import type PluginAPI from "../../../../plugin-api/plugin-api.ts"
import registerBaseSources from "./base-sources.ts"
import registerBaseViews from "./base-views.ts"

export default function activateBasePlugin(api: PluginAPI) {
	registerBaseSources(api)
	registerBaseViews(api)
}
