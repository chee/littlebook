import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {EditorView, lineNumbers} from "@codemirror/view"
import {Compartment} from "@codemirror/state"
import {minimalSetup} from "codemirror"
import {
	LanguageDescription,
	indentUnit,
	type LanguageSupport,
} from "@codemirror/language"
import {dracula} from "@uiw/codemirror-theme-dracula"
import {githubLight as github} from "@uiw/codemirror-theme-github"
import type {DocHandle} from "@automerge/automerge-repo"

export default {
	render(props: {
		handle: DocHandle<{
			text: string
			language?: "python" | "markdown" | "javascript" | "html"
		}>
		cleanup(fn: () => void): void
	}) {
		const container = document.createElement("div")
		const editor = document.createElement("div")
		const style = document.createElement("style")
		style.textContent = /*css*/ `
		:host {
			height: 100%;
			background: var(--content-color-fill);
			color: var(--content-color-line);
			border: 0;
			font-family: var(--family-mono);
		}
		.cm-editor {
			height: 100%;
			padding: var(--space-1);
		}
		.cm-editor.cm-focused.cm-focused {
			outline: 0;
		}
	`
		container.append(editor, style)

		const languageCompartment = new Compartment()
		const lineNumbersCompartment = new Compartment()
		const theme = new Compartment()
		const darkmatch = window.matchMedia("(prefers-color-scheme: dark)")
		const getSchemeTheme = () => {
			return darkmatch.matches ? dracula : github
		}

		const doc = props.handle.docSync()

		const view = new EditorView({
			doc: doc?.text ?? "",
			extensions: [
				minimalSetup,
				indentUnit.of("\t"),
				languageCompartment.of([]),
				lineNumbersCompartment.of([]),
				automergeSyncPlugin({
					handle: props.handle,
					path: ["text"],
				}),
				theme.of(getSchemeTheme()),
			],
			parent: editor,
		})

		const onschemechange = (event: MediaQueryListEvent) => {
			view.dispatch({
				effects: theme.reconfigure(getSchemeTheme()),
			})
		}

		darkmatch.addEventListener("change", onschemechange)
		props.cleanup(() => {
			darkmatch.removeEventListener("change", onschemechange)
		})

		const languages: {
			[key: string]: () => Promise<LanguageSupport>
		} = {
			python: () => import("@codemirror/lang-python").then(mod => mod.python()),
			javascript: () =>
				import("@codemirror/lang-javascript").then(mod => mod.javascript()),
			html: () => import("@codemirror/lang-html").then(mod => mod.html()),
			markdown: () =>
				import("@codemirror/lang-markdown")
					.then(mod => mod.markdown)
					.then(async markdown => {
						return markdown({
							codeLanguages: [
								LanguageDescription.of({
									name: "javascript",
									alias: ["js", "jsx", "ts", "tsx", "typescript"],
									filename: /\.[jt]sx?$/,
									load: languages.javascript,
								}),
								LanguageDescription.of({
									name: "html",
									filename: /\.html$/,
									load: languages.html,
								}),
								LanguageDescription.of({
									name: "python",
									alias: ["py"],
									filename: /\.py$/,
									load: languages.python,
								}),
							],
						})
					}),
		}

		const lang = doc?.language && languages[doc.language]

		if (lang) {
			lang()?.then(ext => {
				view.dispatch({
					effects: [
						languageCompartment.reconfigure(ext),
						lineNumbersCompartment.reconfigure(lineNumbers()),
					],
				})
			})
		}

		return container
	},
}
