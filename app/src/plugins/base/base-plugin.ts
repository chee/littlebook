import type PluginAPI from "../../../../plugin-api/plugin-api.ts"
import registerBaseSources from "./base-sources.ts"
import registerBaseViews from "./base-views.ts"
import opencanvas from "@littlebook/opencanvas"
import automergeDocEditor from ":/plugins/base/views/editors/automerge-doc-editor.tsx"
import pluginEditor from "@littlebook/plugin-editor"

export default async function activateBasePlugin(api: PluginAPI) {
	pluginEditor(api)
	registerBaseSources(api)
	opencanvas(api)
	registerBaseViews(api)
	await import("@littlebook/codemirror").then(activate =>
		activate.default(api),
	)
	await import("@littlebook/prosemirror").then(activate =>
		activate.default(api),
	)
	api.registerView(automergeDocEditor)
}
