import type {FileEditor} from ":/domain/view/view.ts"
import {TypeScriptEditorShape} from ":/plugins/base/shapes/shapes.ts"
import loader from "@monaco-editor/loader"
import automonaco from "automerge-monaco"
import {
	createFileSystem,
	isUrl,
	parseHtml,
	resolvePath,
	Transform,
	transformModulePaths,
	bindMonaco,
	createMonacoTypeDownloader,
} from "@bigmistqke/repl"
import html from "solid-js/html"
import {render} from "solid-js/web"
import ts from "typescript"
import {createSignal} from "solid-js"

function createRepl() {
	const transformJs: Transform = ({path, source, executables}) => {
		// todo automerge url
		return transformModulePaths(source, modulePath => {
			if (modulePath.startsWith(".")) {
				// Swap relative module-path out with their respective module-url
				const url = executables.get(resolvePath(path, modulePath))
				if (!url) throw "url is undefined"
				return url
			} else if (isUrl(modulePath)) {
				// Return url directly
				return modulePath
			} else {
				// Wrap external modules with esm.sh
				return `https://esm.sh/${modulePath}`
			}
		})!
	}

	return createFileSystem({
		css: {type: "css"},
		js: {
			type: "javascript",
			transform: transformJs,
		},
		ts: {
			type: "javascript",
			transform({path, source}) {
				return transformJs({
					path,
					source: ts.transpile(source),
					executables: {
						invalidate() {},
						create() {
							return ""
						},
						get() {
							return ""
						},
					},
				})
			},
		},
		html: {
			type: "html",
			transform(config) {
				return (
					parseHtml(config)
						// Transform content of all `<script type="module" />` elements
						.transformModuleScriptContent(transformJs)
						// Bind relative `src`-attribute of all `<script />` elements
						.bindScriptSrc()
						// Bind relative `href`-attribute of all `<link />` elements
						.bindLinkHref()
						.toString()
				)
			},
		},
	})
}

export default {
	id: "repl",
	displayName: "repl",
	category: "editor",
	render(props) {
		const repl = createRepl()

		const div = document.createElement("div")
		div.style.height = "100%"
		div.style.width = "100%"
		loader.init().then(monaco => {
			const dl = createMonacoTypeDownloader({
				noLib: true,
				allowNonTsExtensions: true,
				moduleResolution:
					monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			})
			dl.downloadModule("@standard-schema/spec")
			monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
				dl.tsconfig(),
			)
			const editor = monaco.editor.create(div, {
				value: props.handle.doc().text,
				language: props.handle.doc().language,
				automaticLayout: true,
				minimap: {
					enabled: false,
				},
				fontSize: 16,
				fontFamily: "var(--family-mono)",
			})
			// repl.writeFile("index.ts", props.handle.doc().text)
			// bindMonaco({editor, monaco, fs: repl, path: "index.ts"})

			automonaco(editor, props.handle, ["text"])
		})
		return div
	},
	schema: TypeScriptEditorShape,
} satisfies FileEditor<TypeScriptEditorShape>
