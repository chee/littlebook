import {EditorViewElement} from "../../../contents/content-view.ts"
import "./text.scss"
import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView, lineNumbers} from "@codemirror/view"
import {Compartment} from "@codemirror/state"
import {minimalSetup} from "codemirror"
import {
	LanguageDescription,
	indentUnit,
	type LanguageSupport,
} from "@codemirror/language"
import {
	UniformType,
	type UniformTypeIdentifier,
} from "../../../contents/uniform-type.ts"
import * as coders from "../../../contents/coders.ts"

const python = UniformType.create("public.python-script", "python code", [
	UniformType.script,
	UniformType.sourceCode,
])

const markdown = UniformType.create("net.daringfireball.markdown", "markdown", [
	UniformType.plainText,
])

const types = {
	python: python.identifier,
	markdown: markdown.identifier,
	javascript: UniformType.javaScript.identifier,
	html: UniformType.html.identifier,
}

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

	languages: {
		[key: UniformTypeIdentifier]: () => Promise<LanguageSupport>
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

		if (typeof this.value == "string" && !this.codemirror) {
			this.codemirror = new EditorView({
				doc: this.value,
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

export default function text(lb: lb.plugins.API) {
	lb.registerEditorView(UniformType.plainText, CodemirrorTextEditorView)
	lb.registerCoder(UniformType.plainText, coders.text())
}
