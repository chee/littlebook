import type {Heads} from "@automerge/automerge-repo"
import * as coders from "../../../contents/types/coders.ts"
import type {ContentCoder} from "../../../contents/types/coders.ts"
import {
	EditorViewElement,
	type ContentChangeFn,
} from "../../../contents/views/content-view.ts"
import {EditorView} from "@codemirror/view"
import {applyAmPatchesToCm} from "@automerge/automerge-codemirror/dist/amToCodemirror.js"
import type {Text} from "@codemirror/state"

import "./text.scss"
import {isReconcileTx} from "./reconcile.ts"
import type {ContentViewHelpers} from "../../../ui/files/content-helpers.ts"
import {render} from "solid-js/web"
import {createSignal} from "solid-js"

const type = "public.plain-text" as lb.UniformTypeIdentifier

type TextModel = string

const coder: ContentCoder<TextModel> = coders.text()

// adapted from https://github.com/automerge/automerge-codemirror/blob/main/src/plugin.ts
class TextContentView extends EditorViewElement<string> {
	isProcessingCmTransaction = false
	reconciledHeads?: Heads
	view?: EditorView
	// constructor() {
	// super()

	// this.attachShadow({
	// 	mode: "closed",
	// 	delegatesFocus: true,
	// })
	// }
	connectedCallback() {
		this._upgradeProperty("content")
		this._upgradeProperty("helpers")
	}
	#helpers!: ContentViewHelpers<string>

	set helpers(helpers) {
		console.log({helpers})
		if (!helpers) return
		this.#helpers = helpers
		this.reconciledHeads = helpers.getHeads()
		const div = document.createElement("div")
		console.log(this.helpers, this.content, "help, cont")
		this.view = new EditorView({
			doc: this.content,
			extensions: [
				// basicSetup,
				// this.codemirrorPlugin,
				EditorView.updateListener.of(update => {
					this.isProcessingCmTransaction = true
					const transactionsWithChanges = update.transactions.filter(
						tr => !isReconcileTx(tr) && !tr.changes.empty,
					)
					if (!transactionsWithChanges.length) return
					this.changeContent((_content, helpers) => {
						for (const tr of transactionsWithChanges) {
							tr.changes.iterChanges(
								(
									fromA: number,
									toA: number,
									fromB: number,
									_toB: number,
									inserted: Text,
								) => {
									helpers.splice([], fromB, toA - fromA, inserted.toString())
								},
							)
						}
					})
					this.reconciledHeads = this.helpers.getHeads()
					this.isProcessingCmTransaction = false
				}),
			],
			parent: this,
		})
	}

	get helpers() {
		return this.#helpers
	}
	_upgradeProperty(prop: any) {
		if (Object.hasOwn(this, prop)) {
			const value: typeof prop = this[prop]
			delete this[prop]
			this[prop] = value
		}
	}

	set content(_string: string) {
		if (!this.#helpers) {
			return
		}
		if (this.isProcessingCmTransaction) {
			return
		}
		const currentHeads = this.#helpers.getHeads()
		if (this.#helpers.equals(currentHeads, this.reconciledHeads)) {
			return
		}
		// get the diff between the reconciled heads and the new heads
		// and apply that to the codemirror doc
		const patches = this.#helpers.diff(this.reconciledHeads!, currentHeads)
		applyAmPatchesToCm(this.view!, ["value"], patches)
		this.reconciledHeads = currentHeads
	}

	disconnectedCallback() {
		this.view = undefined
	}
}

export function createPlainTextView(
	target: Element,
	changeContent: (fn: ContentChangeFn<string>) => void,
	_A: ContentViewHelpers<string>,
) {
	const textarea = document.createElement("textarea")
	target.append(textarea)
	const oninput = () => {
		changeContent((content, A) => {
			A.updateText([], textarea.value)
		})
	}
	textarea.addEventListener("input", oninput)

	return [
		(content: string) => {
			textarea.value = content
		},
		() => textarea.removeEventListener("input", oninput),
	]
}

export function createSolidTextView(
	target: Element,
	changeContent: (fn: ContentChangeFn<string>) => void,
	helpers: ContentViewHelpers<string>,
) {
	const [c, sc] = createSignal("")

	function TextView({content}: {content: string}) {
		let textarea: HTMLTextAreaElement | undefined
		return (
			<textarea
				ref={textarea}
				oninput={() =>
					changeContent((_content, am) => {
						textarea && am.updateText([], textarea.value)
					})
				}>
				{content}
			</textarea>
		)
	}

	render(() => <TextView content={c()} />, target)

	return [
		(content: string) => {
			sc(content)
		},
	]
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
