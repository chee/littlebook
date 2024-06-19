import {updateText} from "@automerge/automerge-repo"
import {customElement, noShadowDOM} from "solid-element"
import {createEffect, type ParentComponent} from "solid-js"
import * as coders from "../../../contents/types/coders.ts"
import type {ContentCoder} from "../../../contents/types/coders.ts"
import type {EditorViewComponent} from "../../../contents/views/content-view.ts"
import {throttle} from "throttle-debounce"
import "./text.scss"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

const TextContentView: EditorViewComponent<TextModel, ParentComponent> = ({
	content,
	changeContent,
}) => {
	noShadowDOM()
	createEffect(() => {
		console.log(content(), "latest")
		console.log("did you SEE THAT?????? that's IN THE THING")
	})
	let textarea: HTMLTextAreaElement | undefined
	const update = throttle(200, () => {
		if (!textarea) return
		changeContent(content => {
			updateText(content, ["value"], textarea.value)
		})
	})
	return (
		<textarea ref={textarea} class="text-content-view" onChange={update}>
			{content()}
		</textarea>
	)
}

export default function excalidraw(lb: lb.plugins.API) {
	lb.registerContentType({
		coder,
		type,
		views: {
			editor: {
				define(name) {
					customElement(
						name,
						{
							content() {
								return ""
							},
							changeContent() {},
						},
						TextContentView,
					)
				},
			},
		},
	})
}
