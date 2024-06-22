import {DocHandle, updateText} from "@automerge/automerge-repo"
import * as coders from "../../../contents/types/coders.ts"
import type {ContentCoder} from "../../../contents/types/coders.ts"
import {EditorViewElement} from "../../../contents/views/content-view.ts"

import "./text.scss"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

class TextContentView extends EditorViewElement<string> {
	static displayName = "textarea"
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

import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView} from "@codemirror/view"

class CodemirrorTextEditorView extends EditorViewElement<string> {
	static displayName = "fancy text editor"
	codemirror!: EditorView
	constructor() {
		super()
		this.attachShadow({mode: "open"})
		const style = document.createElement("style")
		style.textContent = /*css*/ `
			:host {
				height: 100%;
				background: var(--littlebook-content-fill);
			}
			.cm-editor {
				height: 100%;
			}
		`
		this.shadowRoot?.append(style)
	}

	connectedCallback() {
		if (typeof this.value == "string" && !this.codemirror) {
			this.codemirror = new EditorView({
				doc: this.value,
				extensions: [
					// basicSetup,
					automergeSyncPlugin({
						handle: this.handle,
						path: ["value"],
					}),
				],
				parent: this.shadowRoot!,
			})
		}
	}
}

export default function text(lb: lb.plugins.API) {
	lb.registerEditorView([type], CodemirrorTextEditorView)
	lb.registerContentType({
		coder,
		type,
		views: {
			editor: TextContentView,
		},
	})
}
