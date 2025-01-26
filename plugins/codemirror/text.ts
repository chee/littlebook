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

export const id = "codemirror"
export const displayName = "Codemirror Text Editor"

export const contentTypes = ["text"]

// todo should something like this be part of the API, and caled by the
// editor.tsx before passing the doc to the plugin?
function shape(doc: any): doc is {
	text: string
	language?: "python" | "markdown" | "javascript" | "html"
} {
	return "text" in doc && typeof doc.text == "string"
}

export function render(props: {
	handle: DocHandle<unknown>
	shadow: ShadowRoot
	cleanup(fn: () => void): void
}) {
	const languageCompartment = new Compartment()
	const lineNumbersCompartment = new Compartment()
	const theme = new Compartment()
	const darkmatch = window.matchMedia("(prefers-color-scheme: dark)")
	const getSchemeTheme = () => {
		return darkmatch.matches ? dracula : github
	}
	const style = new CSSStyleSheet()
	style.replaceSync(/*css*/ `
		.cm-editor {
			height: 100%;			
			font-size: var(--font-size);
			font-family: var(--family-mono);
			background: var(--fill);
			color: var(--line);
		}
	`)
	try {
		props.shadow.adoptedStyleSheets = [style]
	} catch {}

	const file = props.handle.docSync()
	if (!shape(file)) {
		console.error("doc is wrong shape")
		return
	}

	const view = new EditorView({
		doc: file?.text ?? "",
		parent: props.shadow,
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

	const lang = file?.language && languages[file.language]

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

	props.cleanup(() => view.destroy())
}

export default {render}
