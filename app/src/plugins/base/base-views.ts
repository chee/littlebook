import automergeDocEditor from ":/plugins/base/views/editors/automerge-doc-editor.tsx"
import githubMarkdownPreview from ":/plugins/base/views/github-markdown-preview.tsx"
import * as v from "valibot"
import {createEffect} from "solid-js"
import type PluginAPI from "@littlebook/plugin-api"

export default async function registerBaseViews(api: PluginAPI) {
	await import("@littlebook/plugin-editor").then(activate => activate.default(api))
	await import("@littlebook/codemirror").then(activate => activate.default(api))
	await import("@littlebook/prosemirror").then(activate => activate.default(api))
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
