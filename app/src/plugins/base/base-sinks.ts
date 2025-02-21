import {Automerge} from "@automerge/automerge-repo/slim"
import {
	FileSink,
	JavaScriptEditorShape,
	VoidSink,
	type AutomergeURL,
	type PluginAPI,
} from "@pointplace/types"
import * as v from "valibot"
import type {Stored} from ":/registries/registry.ts"
import repo from ":/repo/create.ts"
import {useHome} from ":/repo/home.ts"

const automergeFileSink: FileSink<unknown> = {
	category: "file",
	id: "automerge-file-sink",
	displayName: "automerge file",
	schema: v.record(v.string(), v.any()),
	async publish({handle, entry}) {
		return new File([Automerge.save(handle.doc())], `${entry.name}.automerge`)
	},
}

const compileToEditor: VoidSink<JavaScriptEditorShape> = {
	id: "compile-to-editor",
	category: "void",
	displayName: "compile to editor",
	schema: JavaScriptEditorShape,
	publish({handle}) {
		return (async () => {
			const file = handle.doc()
			const code = await compile(file.text)

			const bytes = new TextEncoder().encode(code)
			const blob = new Blob([bytes], {
				type: "application/javascript",
			})
			const blobURL = URL.createObjectURL(blob)
			const mod = await import(/* @vite-ignore */ blobURL)

			const editor = {
				id: mod.id,
				type: "view",
				category: "editor",
				bytes: bytes,
			} satisfies Stored<"view">
			if (file.url) {
				return repo.findClassic<Stored<"view">>(file.url).then(handle => {
					handle.change(doc => (doc.bytes = editor.bytes))
					addToHome(handle.url)
				})
			}
			const url = repo.create(editor).url
			handle.change(file => (file.url = url))
			addToHome(url)
		})()
	},
}

function addToHome(url: AutomergeURL) {
	const [, changeHome] = useHome()
	changeHome(home => {
		if (![...home.views].includes(url)) {
			home.views.push(url)
		}
	})
}

const esbuild = await import("esbuild-wasm")
const wasm = await import("esbuild-wasm/esbuild.wasm?url")

await esbuild.initialize({
	wasmURL: wasm.default,
})

async function compile(text: string) {
	const result = await esbuild.transform(text, {
		loader: "ts",
		target: "esnext",
	})
	return result.code
}

export default function registerBaseSinks(api: PluginAPI) {
	api.registerSink(automergeFileSink)
	api.registerSink(compileToEditor)
}
