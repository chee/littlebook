import * as v from "valibot"
import {createEffect} from "solid-js"
import type PluginAPI from "@littlebook/plugin-api"
import type {ViewID} from "@littlebook/plugin-api/types/view.ts"
import worseMarkdownPreview from ":/plugins/base/views/worse-markdown-preview.tsx"

export default async function registerBaseViews(api: PluginAPI) {
	api.registerView(worseMarkdownPreview)

	await import(":/plugins/base/views/github-markdown-preview.tsx").then(
		mod => {
			api.registerView(mod.default)
		},
	)

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

	api.registerView({
		id: "video" as ViewID,
		displayName: "Video",
		category: "readonly",
		render(props) {
			const video = document.createElement("video")
			const src = () =>
				URL.createObjectURL(
					new Blob([props.doc().bytes], {type: props.doc().mime}),
				)
			createEffect(() => (video.src = src()))
			video.style.width = "100%"
			video.style.height = "100%"
			video.style.objectFit = "contain"
			return video
		},
		schema: v.object({
			type: v.literal("video"),
			mime: v.string(),
			bytes: v.instance(Uint8Array),
		}),
	})
}
