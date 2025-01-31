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

export const contentTypes = ["public.text", "public.code"]

// todo should something like this be part of the API, and caled by the
// editor.tsx before passing the doc to the plugin?
// todo YES
function shape(doc: any): doc is {
	text: string
	language?: "python" | "markdown" | "javascript" | "html"
} {
	return doc && "text" in doc && typeof doc.text == "string"
}

export function render(props: {
	handle: DocHandle<unknown>
	cleanup(fn: () => void): void
}) {
	const parent = document.createElement("div")
	parent.style.display = "contents"
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
		if (document.adoptedStyleSheets) {
			document.adoptedStyleSheets.push(style)
		} else {
			document.adoptedStyleSheets = [style]
		}
	} catch {}

	const file = props.handle.docSync()

	if (!shape(file)) {
		console.error("doc is wrong shape")
		return
	}

	const view = new EditorView({
		doc: file?.text ?? "",
		parent,
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
		json: () => import("@codemirror/lang-json").then(mod => mod.json()),
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
								name: "json",
								filename: /\.json$/,
								load: languages.json,
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

	function onlang() {
		if (!shape(file)) {
			console.error("doc is wrong shape")
			return
		}
		const lang = file?.language && languages[file.language]
		if (lang) {
			lang().then(ext => {
				view.dispatch({
					effects: [
						languageCompartment.reconfigure(ext),
						lineNumbersCompartment.reconfigure(lineNumbers()),
					],
				})
			})
		} else {
			view.dispatch({
				effects: [
					languageCompartment.reconfigure([]),
					lineNumbersCompartment.reconfigure([]),
				],
			})
		}
	}

	onlang()

	props.handle.on("change", change => {
		if (change.patches.some(patch => patch.path.join(".") == "language")) {
			onlang()
		}
	})

	props.cleanup(() => {
		props.handle.off("change", onlang)
		view.destroy()
	})

	return parent
}

export default {render}
