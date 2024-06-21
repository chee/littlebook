import * as coders from "../../../contents/types/coders.ts"
import type {ContentCoder} from "../../../contents/types/coders.ts"
import {EditorViewElement} from "../../../contents/views/content-view.ts"

import "./text.scss"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

class TextContentView extends EditorViewElement<string> {
	textarea = document.createElement("textarea")

	connectedCallback() {
		this.appendChild(this.textarea)
		this.textarea.classList.add("text-content-view")
		this.textarea.addEventListener("beforeinput", this.#beforeinput)
	}

	set content(string: string) {
		const start = this.textarea.selectionStart
		const end = this.textarea.selectionEnd

		const oldbefore = this.textarea.value.slice(0, start)
		const oldafter = this.textarea.value.slice(end)
		const newbefore = string.slice(0, start)
		const newafter = string.slice(end)
		let newstart = newbefore.length - oldbefore.length
		const newend = newafter.length - oldafter.length
		// todo fix this properly
		if (start == end) {
			newstart = newend
		}

		this.textarea.value = string
		this.textarea.selectionStart = start + newstart + 1
		this.textarea.selectionEnd = end + newend
	}

	get content() {
		return this.textarea.value
	}

	disconnectedCallback() {
		this.textarea.removeEventListener("beforeinput", this.#beforeinput)
	}

	#beforeinput = (event: InputEvent) => {
		event.preventDefault()
		let start = this.textarea.selectionStart
		let end = this.textarea.selectionEnd

		if (event.isComposing) {
			return
		}

		const newText =
			event.inputType == "insertLineBreak" ? "\n" : event.data || undefined

		if (event.inputType == "deleteContentForward") {
			end += 1
		} else if (event.inputType == "deleteContentBackward") {
			start -= 1
		} else if (event.inputType == "deleteSoftLineForward") {
		}

		const diff = end - start
		this.changeContent((_content, {splice, getCursor}) => {
			splice([], start, diff, newText)
		})
	}
}

export default function text(lb: lb.plugins.API) {
	lb.registerContentType({
		coder,
		type,
		views: {
			editor: TextContentView,
		},
	})
}
