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
import {
	CodeShape,
	FileEditor,
	type FileEditorAPI,
	type FileMenu,
} from "@littlebook/types"
import type {DocHandleChangePayload} from "@automerge/vanillajs"
import {register} from "module"

function render(
	props: FileEditorAPI<CodeShape> & {
		path?: (string | number)[]
	},
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
		css: () => import("@codemirror/lang-css").then(mod => mod.css()),
		cpp: () => import("@codemirror/lang-cpp").then(mod => mod.cpp()),
		go: () => import("@codemirror/lang-go").then(mod => mod.go()),
		html: () => import("@codemirror/lang-html").then(mod => mod.html()),
		java: () => import("@codemirror/lang-java").then(mod => mod.java()),
		javascript: () =>
			import("@codemirror/lang-javascript").then(mod => mod.javascript()),
		json: () => import("@codemirror/lang-json").then(mod => mod.json()),
		less: () => import("@codemirror/lang-less").then(mod => mod.less()),
		lezer: () => import("@codemirror/lang-lezer").then(mod => mod.lezer()),
		liquid: () => import("@codemirror/lang-liquid").then(mod => mod.liquid()),
		php: () => import("@codemirror/lang-php").then(mod => mod.php()),
		python: () => import("@codemirror/lang-python").then(mod => mod.python()),
		rust: () => import("@codemirror/lang-rust").then(mod => mod.rust()),
		sass: () => import("@codemirror/lang-sass").then(mod => mod.sass()),
		sql: () => import("@codemirror/lang-sql").then(mod => mod.sql()),
		vue: () => import("@codemirror/lang-vue").then(mod => mod.vue()),
		wast: () => import("@codemirror/lang-wast").then(mod => mod.wast()),
		xml: () => import("@codemirror/lang-xml").then(mod => mod.xml()),
		yaml: () => import("@codemirror/lang-yaml").then(mod => mod.yaml()),
		markdown: () =>
			import("@codemirror/lang-markdown")
				.then(mod => mod.markdown)
				.then(async markdown => {
					return markdown({
						addKeymap: true,
						codeLanguages: [
							LanguageDescription.of({
								name: "css",
								filename: /\.css$/,
								load: languages.css,
							}),
							LanguageDescription.of({
								name: "cpp",
								alias: ["cpp", "c++", "cxx", "c", "cc"],
								filename: /\.c(pp|xx|\+\+|c)?$/,
								load: languages.cpp,
							}),
							LanguageDescription.of({
								name: "go",
								filename: /\.go$/,
								load: languages.go,
							}),
							LanguageDescription.of({
								name: "html",
								filename: /\.html$/,
								load: languages.html,
							}),
							LanguageDescription.of({
								name: "java",
								filename: /\.java$/,
								load: languages.java,
							}),
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
								name: "less",
								filename: /\.less$/,
								load: languages.less,
							}),
							LanguageDescription.of({
								name: "lezer",
								filename: /\.lz$/,
								load: languages.lezer,
							}),
							LanguageDescription.of({
								name: "liquid",
								filename: /\.liquid$/,
								load: languages.liquid,
							}),
							LanguageDescription.of({
								name: "markdown",
								filename: /\.m(ark)?d(own)?$/,
								alias: ["md"],
								load: languages.liquid,
							}),
							LanguageDescription.of({
								name: "php",
								filename: /\.php$/,
								load: languages.php,
							}),
							LanguageDescription.of({
								name: "python",
								alias: ["py"],
								filename: /\.py$/,
								load: languages.python,
							}),
							LanguageDescription.of({
								name: "rust",
								filename: /\.rs$/,
								load: languages.rust,
							}),
							LanguageDescription.of({
								name: "sass",
								filename: /\.s[ac]ss$/,
								load: languages.sass,
							}),
							LanguageDescription.of({
								name: "sql",
								filename: /\.sql$/,
								load: languages.sql,
							}),
							LanguageDescription.of({
								name: "vue",
								filename: /\.vue$/,
								load: languages.vue,
							}),
							LanguageDescription.of({
								name: "wat",
								filename: /\.was?t$/,
								alias: ["wat", "wast"],
								load: languages.wast,
							}),
							LanguageDescription.of({
								name: "xml",
								filename: /\.xml$/,
								load: languages.xml,
							}),
							LanguageDescription.of({
								name: "yaml",
								filename: /\.ya?ml$/,
								load: languages.yaml,
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

	function onchange(change: DocHandleChangePayload<CodeShape>) {
		if (
			change.patches.some(patch => {
				return patch.path[0] == "language"
			})
		) {
			onlang()
		}
		const doc = change.patchInfo.after
		// todo shouldn't this be something... else? it's not an editor's job,
		// it's a new kind of THING not a sink, source or view... some kind of
		// file-specific addon that boots when _any_ view opens a file what would
		// that be? what would it called?
		if (doc.language == "markdown") {
			const firstLine = doc.text.slice(0, doc.text.indexOf("\n"))
			const title = firstLine.slice(2).trim()
			if (firstLine && firstLine.startsWith("# ") && title) {
				props.updateName(title)
			} else {
				props.updateName("untitled")
			}
		}
	}

	props.handle.on("change", onchange)

	props.onCleanup(() => {
		props.handle.off("change", onchange)
		view.destroy()
	})

	parent.addEventListener("keyup", () => {
		if (file?.url) {
			parent.dispatchEvent(
				new CustomEvent("run-sink", {
					detail: "compile-to-editor",
					bubbles: true,
					composed: true,
					cancelable: true,
				}),
			)
		}
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
						{label: "c", value: "c"},
						{label: "c++", value: "c++"},
						{label: "css", value: "css"},
						{label: "go", value: "go"},
						{label: "java", value: "java"},
						{label: "javascript", value: "javascript"},
						{label: "json", value: "json"},
						{label: "less", value: "less"},
						{label: "lezer", value: "lezer"},
						{label: "liquid", value: "liquid"},
						{label: "html", value: "html"},
						{label: "markdown", value: "markdown"},
						{label: "php", value: "php"},
						{label: "python", value: "python"},
						{label: "rust", value: "rust"},
						{label: "sass", value: "sass"},
						{label: "scss", value: "scss"},
						{label: "sql", value: "sql"},
						{label: "vue", value: "vue"},
						{label: "wast", value: "wat"},
						{label: "xml", value: "xml"},
						{label: "yaml", value: "yaml"},
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
	] satisfies FileMenu<CodeShape>
}

export default {
	id: "codemirror",
	displayName: "codemirror",
	category: "editor",
	render,
	getFileMenu,
	schema: CodeShape,
} satisfies FileEditor<CodeShape>
