import {updateText} from "@automerge/automerge-repo"
import type {ContentView, ContentCoder} from "../content-type-registry.ts"
import type {LittlebookAPI} from "../../api/api.ts"
import * as coders from "../coders.ts"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

const TextContentView: ContentView<TextModel> = ({content, changeContent}) => {
	return (
		<textarea
			style={{width: "100%", height: "100%", resize: "none"}}
			onInput={event => {
				changeContent(content => {
					if (!(event.target instanceof HTMLTextAreaElement)) return
					console.log(content.value)
					updateText(content, ["value"], event.target.value)
				})
			}}>
			{content.value}
		</textarea>
	)
}

export function activate(lb: LittlebookAPI) {
	lb.coders.register<TextModel>(type, coder)
	lb.views.content.register([type], TextContentView)
}

export function deactivate(lb: LittlebookAPI) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(TextContentView)
}
