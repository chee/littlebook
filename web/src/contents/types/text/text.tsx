import {updateText} from "@automerge/automerge-repo"
import type {ContentView} from "../type-registries.ts"
import * as coders from "../coders.ts"
import type {ContentCoder} from "../coders.ts"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

const TextContentView: ContentView<TextModel> = ({content, changeContent}) => {
	return (
		<textarea
			class="textarea has-fixed-size is-borderless h-100 is-white is-family-code pt-1 pb-1 is-flush"
			onInput={event => {
				changeContent(content => {
					if (!(event.target instanceof HTMLTextAreaElement)) return
					updateText(content, ["value"], event.target.value)
				})
			}}>
			{content.value}
		</textarea>
	)
}

export function activate(lb: lb.API) {
	lb.coders.register<TextModel>(type, coder)
	lb.views.content.register([type], TextContentView)
	lb.contentTypes.setDisplayName(type, "plain text")
}

export function deactivate(lb: lb.API) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(TextContentView)
}
