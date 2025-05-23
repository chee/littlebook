import githubMarkdownPreview from ":/plugins/base/views/github-markdown-preview.tsx"
import * as v from "valibot"
import {createEffect} from "solid-js"
import type PluginAPI from "@littlebook/plugin-api"
import type {ViewID} from "@littlebook/plugin-api/types/view.ts"

export default async function registerBaseViews(api: PluginAPI) {
	api.registerView(githubMarkdownPreview)

	api.registerView({
		id: "image" as ViewID,
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
