import type {ViewID} from "@littlebook/plugin-api/types/view.ts"
import codemirrorEditor from "./codemirror-editor.ts"
import minimal from "./minimal.ts"
import type PluginAPI from "@littlebook/plugin-api"
import {CodeShape} from "@littlebook/plugin-api/shapes/shapes.ts"

export default function CodeMirrorPlugin(api: PluginAPI) {
	api.registerView(codemirrorEditor)
	api.registerView(minimal)
	api.registerView({
		id: "@littlebook/text.language" as ViewID,
		category: "indicator",
		displayName: "Language Indicator",
		schema: CodeShape,
		render(api) {
			const span = document.createElement("span")
			span.textContent = api.doc().language || "plain"
			api.onChange(() => (span.textContent = api.doc().language || "plain"))
			return span
		},
	})
}
