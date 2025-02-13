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
import {Editor, type EditorAPI, type FileMenu} from "@pointplace/types"
import * as v from "valibot"
import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/automerge-repo"

export const id = "codemirror"
export const displayName = "codemirror"

export const contentTypes = ["public.text", "public.code"]

const schema = v.object({
	text: v.string(),
	language: v.optional(v.string()),
	storedURL: v.optional(v.custom<AutomergeUrl>(isValidAutomergeUrl)),
})

type CodemirrorFile = v.InferOutput<typeof schema>

export function render(
	props: EditorAPI<CodemirrorFile> & {
		path?: (string | number)[]
	}
) {
	const path = props.path ?? ["text"]
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

	const file = props.handle.doc()

	const view = new EditorView({
		doc: file?.text ?? "",
		parent,
		extensions: [
			minimalSetup,
			indentUnit.of("\t"),
			languageCompartment.of([]),
			lineNumbersCompartment.of([]),
			EditorView.lineWrapping,
			automergeSyncPlugin({
				handle: props.handle,
				path,
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

	props.onCleanup(() => {
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
						addKeymap: true,
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
		console.log(change.patches)
		if (
			change.patches.some(patch => {
				return patch.path[0] == "language"
			})
		) {
			console.log("language changed")
			onlang()
		}
		const doc = change.patchInfo.after

		if (doc.language == "markdown") {
			const firstLine = doc.text.slice(0, doc.text.indexOf("\n"))
			const title = firstLine.slice(2).trim()
			if (firstLine && firstLine.startsWith("# ") && title) {
				props.updateName(title)
			} else {
				props.updateName("untitled")
			}
		}
	})

	props.onCleanup(() => {
		props.handle.off("change", onlang)
		view.destroy()
	})

	return parent
}

export function getFileMenu() {
	return [
		{
			type: "sub",
			label: "set language",
			sub: [
				{
					type: "choice",
					choices: [
						{label: "plain", value: ""},
						{label: "javascript", value: "javascript"},
						{label: "python", value: "python"},
						{label: "html", value: "html"},
						{label: "markdown", value: "markdown"},
						{label: "json", value: "json"},
					],
					value(opts) {
						return opts.file.language ?? ""
					},
					action(opts) {
						opts.fileHandle.change(file => {
							file.language = opts.value
						})
					},
				},
			],
		},
	] satisfies FileMenu<CodemirrorFile>
}

export default {
	render,
	getFileMenu,
	id,
	contentTypes,
	schema,
	displayName,
} satisfies Editor<CodemirrorFile>
