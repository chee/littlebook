import type {FileEditor} from ":/domain/view/view.ts"
import {CodeShape} from ":/plugins/base/shapes/shapes.ts"
import automonaco from "automerge-monaco"
import * as monaco from "monaco-editor"
import {createEffect} from "solid-js"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import loader from "@monaco-editor/loader"

window.MonacoEnvironment = {
	getWorker(_workerId, label) {
		if (label === "typescript" || label === "javascript") {
			return new tsWorker()
		}
		return new editorWorker()
	},
}

window._VSCODE_FILE_ROOT = "file:///"

export default {
	id: "code-editor",
	displayName: "Code Editor",
	category: "editor",
	render(props) {
		const div = document.createElement("div")
		div.style.height = "100%"
		div.style.width = "100%"

		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			moduleResolution:
				monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			target: monaco.languages.typescript.ScriptTarget.ESNext,
			module: monaco.languages.typescript.ModuleKind.ESNext,
			allowSyntheticDefaultImports: true,
			allowNonTsExtensions: true,
			jsx: monaco.languages.typescript.JsxEmit.Preserve,
			jsxImportSource: "solid-js",
			lib: ["esnext", "dom"],
		})

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
		processImports(props.handle.doc().text)
		automonaco(editor, props.handle, ["text"])
		editor.onDidChangeModelContent(() => {
			const code = editor.getValue()
			processImports(code)
		})

		return div
	},
	schema: CodeShape,
} satisfies FileEditor<CodeShape>

function extractHTTPSImports(source: string): string[] {
	return [
		...source.matchAll(/from\s+["'](https:\/\/[^"']+)["']/g),
		...source.matchAll(/import\s+["'](https:\/\/[^"']+)["']/g),
	].map(match => match[1])
}

// todo cache these in localstorage/indexeddb
async function processImports(source: string) {
	const imports = [
		...source.matchAll(/\bimport\s+(?:.+?\s+from\s+)?["']([^"']+)["']/g),
		...source.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g),
	].map(match => match[1])

	const types = Object.groupBy(imports, imp => {
		return imp.includes(":") ? imp.split(":")[0] : "bare"
	})

	const https = Promise.allSettled(
		types.https ? types.https.map(imp => resolveEsmTypes(imp)) : [],
	)
	const bare = Promise.allSettled(
		types.bare
			? types.bare.map(imp => {
					if (imp == "littlebook") {
						return `declare module "littlebook" {export const book: "hehe"}`
					} else {
						return resolveEsmTypes("https://esm.sh/" + imp, imp)
					}
				})
			: [],
	)

	await https
	await bare
}

async function resolveEsmTypes(url: string, moduleName = url) {
	try {
		const res = await fetch(url, {redirect: "follow"})

		// follow redirect to actual module
		const finalUrl = res.url
		const typeHeader = res.headers.get("x-typescript-types")

		if (!typeHeader) {
			console.warn("No X-TypeScript-Types header:", finalUrl)
			return
		}

		const typeUrl = new URL(typeHeader, finalUrl).toString()
		const dtsRes = await fetch(typeUrl)
		const dts = await dtsRes.text()

		monaco.languages.typescript.typescriptDefaults.addExtraLib(
			`declare module "${moduleName}" {${dts}}"`,
			typeUrl,
		)
	} catch (err) {
		console.warn(`Failed to resolve types for ${url}:`, err)
	}
}
