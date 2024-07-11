import {ContentViewElement} from "../../web/src/files/contents/content-view.ts"
import "./text.css"
import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView, lineNumbers} from "@codemirror/view"
import {Compartment} from "@codemirror/state"
import {minimalSetup} from "codemirror"
import {
	LanguageDescription,
	indentUnit,
	type LanguageSupport,
} from "@codemirror/language"

import pkg from "./package.json" with {type: "json"}
const config = pkg.littlebook

// todo put UniformType on window?
const types = {
	python: "public.python-script",
	markdown: "net.daringfireball.markdown",
	javascript: "com.netscape.javascript-source",
	html: "public.html",
}

class CodemirrorTextEditorView extends ContentViewElement<string> {
	codemirror!: EditorView
	constructor() {
		super()
		this.attachShadow({mode: "open"})
		const style = document.createElement("style")
		style.textContent = /*css*/ `
			:host {
				height: 100%;
				background: var(--content-color-fill);
				color: var(--content-color-line);
			}
			.cm-editor {
				height: 100%;
			}
		`
		this.shadowRoot?.append(style)
	}

	languages: {
		[key: string]: () => Promise<LanguageSupport>
	} = {
		[types.python]: () =>
			import("@codemirror/lang-python").then(mod => mod.python()),
		[types.javascript]: () =>
			import("@codemirror/lang-javascript").then(mod => mod.javascript()),
		[types.html]: () => import("@codemirror/lang-html").then(mod => mod.html()),
		[types.markdown]: () =>
			import("@codemirror/lang-markdown")
				.then(mod => mod.markdown)
				.then(async markdown => {
					return markdown({
						codeLanguages: [
							LanguageDescription.of({
								name: "javascript",
								alias: ["js", "jsx", "ts", "tsx", "typescript"],
								filename: /\.[jt]sx?$/,
								load: this.languages[types.javascript],
							}),
							LanguageDescription.of({
								name: "html",
								filename: /\.html$/,
								load: this.languages[types.html],
							}),
							LanguageDescription.of({
								name: "python",
								alias: ["py"],
								filename: /\.py$/,
								load: this.languages[types.python],
							}),
						],
					})
				}),
	}

	connectedCallback() {
		const languageCompartment = new Compartment()
		// const tabSize = new Compartment()
		const lineNumbersCompartment = new Compartment()
		if (typeof this.content.value == "string" && !this.codemirror) {
			this.codemirror = new EditorView({
				doc: this.content.value,
				extensions: [
					minimalSetup,
					indentUnit.of("\t"),
					languageCompartment.of([]),
					lineNumbersCompartment.of([]),
					automergeSyncPlugin({
						handle: this.handle,
						path: ["value"],
					}),
				],
				parent: this.shadowRoot!,
			})
		}

		const lang = this.languages[this.file.contentType]
		if (lang) {
			lang()?.then(ext => {
				this.codemirror?.dispatch({
					effects: [
						languageCompartment.reconfigure(ext),
						lineNumbersCompartment.reconfigure(lineNumbers()),
					],
				})
			})
		}
	}
}

export default function activate() {
	const tag = config.editors[0].element
	if (!customElements.get(tag)) {
		customElements.define(tag, CodemirrorTextEditorView)
	}
}
