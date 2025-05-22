import automergeDocEditor from ":/plugins/base/views/editors/automerge-doc-editor.tsx"
import githubMarkdownPreview from ":/plugins/base/views/github-markdown-preview.tsx"
import PluginAPI from ":/plugins/plugin-api.ts"
// import activateCodemirror from "@littlebook/codemirror"
// import activateProsemirror from "@littlebook/prosemirror"
// import activePluginEditor from "@littlebook/plugin-editor"
// import activateRepl from "@littlebook/repl"
import * as v from "valibot"
import {createEffect} from "solid-js"

export default function registerBaseViews(api: PluginAPI) {
	// todo export plugins from these instead
	// activateCodemirror(api)
	// activateProsemirror(api)
	// activePluginEditor(api)
	// activateRepl(api)
	api.registerView(githubMarkdownPreview)
	api.registerView(automergeDocEditor)

	api.registerView({
		id: "image",
		displayName: "Image",
		category: "readonly",
		render(props) {
			const img = document.createElement("img")
			const src = () =>
				URL.createObjectURL(
					new Blob([props.doc().bytes], {type: props.doc().mime}),
				)
			createEffect(() => (img.src = src()))
			img.style.width = "100%"
			img.style.height = "100%"
			img.style.objectFit = "contain"
			return img
		},
		schema: v.object({
			type: v.literal("image"),
			mime: v.string(),
			bytes: v.instance(Uint8Array),
		}),
	})
}
