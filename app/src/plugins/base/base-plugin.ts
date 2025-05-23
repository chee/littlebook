import type PluginAPI from "../../../../plugin-api/plugin-api.ts"
import registerBaseSources from "./base-sources.ts"
import registerBaseViews from "./base-views.ts"
import "@littlebook/opencanvas/output/opencanvas.css"
import opencanvas from "@littlebook/opencanvas"
import automergeDocEditor from ":/plugins/base/views/editors/automerge-doc-editor.tsx"

export default async function activateBasePlugin(api: PluginAPI) {
	opencanvas(api)
	registerBaseSources(api)
	registerBaseViews(api)
	await import("@littlebook/plugin-editor").then(activate =>
		activate.default(api),
	)
	await import("@littlebook/codemirror").then(activate =>
		activate.default(api),
	)
	await import("@littlebook/prosemirror").then(activate =>
		activate.default(api),
	)
	api.registerView(automergeDocEditor)
}
