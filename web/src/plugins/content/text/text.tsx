import {updateText} from "@automerge/automerge-repo"
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
		this.textarea.addEventListener("input", this.#listen)
	}

	set content(string: string) {
		this.textarea.value = string
	}

	get content() {
		return this.textarea.value
	}

	disconnectedCallback() {
		this.textarea.removeEventListener("input", this.#listen)
	}

	#listen = () => {
		this.changeContent(content => {
			updateText(content, ["value"], this.textarea.value)
		})
		this.textarea.value
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
