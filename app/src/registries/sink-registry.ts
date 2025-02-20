import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry, type Stored} from "./registry.ts"
import {
	Automerge,
	isValidAutomergeUrl,
	type AutomergeUrl,
} from "@automerge/automerge-repo/slim"
import {
	AutomergeURL,
	type Entry,
	type FileSink,
	type Sink,
	type TransmuteSink,
	type VoidSink,
} from "@pointplace/types"
import repo from "../repo/create.ts"
import {useHome} from "../repo/home.ts"
import * as v from "valibot"

export class SinkRegistry extends Registry<"sink", Sink> {
	static async runFileSink(sink: FileSink<unknown>, entry: Entry) {
		const handle = await repo.find(entry.url)
		const file = await sink.publish({handle, entry})
		const a = document.createElement("a")
		a.download = file.name
		a.href = URL.createObjectURL(file)
		a.click()
	}

	static async runTransmuteSink(sink: TransmuteSink<unknown>, entry: Entry) {
		return repo.create(
			sink.publish({handle: await repo.find(entry.url), entry})
		)
	}

	static async runVoidSink(sink: VoidSink<unknown>, entry: Entry) {
		return sink.publish({handle: await repo.find(entry.url), entry})
	}
	runFileSink = SinkRegistry.runFileSink
	runTransmuteSink = SinkRegistry.runTransmuteSink
	runVoidSink = SinkRegistry.runVoidSink

	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			typename: "sink",
		})

		this.register(compileToEditor)
		this.register(automergeFileSink)
	}

	*sinks(file: unknown) {
		for (const sink of Object.values(this.records)) {
			if (!sink.schema) {
				console.warn("view has no schema", sink)
				continue
			}
			const result = sink.schema["~standard"].validate(file)
			if (result instanceof Promise) {
				console.warn("schemas cannot be async")
				continue
			}
			if (result.issues) {
				continue
			} else {
				yield sink
			}
		}
	}
}

export const SinkRegistryContext = createContext<SinkRegistry>()

export function useSinkRegistry() {
	const value = useContext(SinkRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a PublisherRegistryContext")
	}
	return value
}

const automergeFileSink: FileSink<unknown> = {
	category: "file",
	id: "automerge-file-sink",
	displayName: "automerge file",
	schema: v.record(v.string(), v.any()),
	async publish({handle, entry}) {
		return new File([Automerge.save(handle.doc())], `${entry.name}.automerge`)
	},
}

// todo move to plugin
const compileToEditor: VoidSink<{
	text: string
	language: "javascript"
	storedURL?: AutomergeUrl
}> = {
	id: "compile-to-editor",
	category: "void",
	displayName: "compile to editor",
	schema: v.object({
		text: v.string(),
		language: v.literal("javascript"),
		storedURL: v.optional(v.custom<AutomergeURL>(isValidAutomergeUrl)),
	}),
	async publish({handle}) {
		const file = handle.doc()
		return compile(file.text)
			.then(async code => {
				const bytes = new TextEncoder().encode(code)
				const blob = new Blob([bytes], {
					type: "application/javascript",
				})
				const blobURL = URL.createObjectURL(blob)
				const mod = await import(/* @vite-ignore */ blobURL)
				return {
					bytes,
					mod,
				}
			})
			.then(async result => {
				const editor = {
					id: result.mod.id,
					type: "view",
					category: "editor",
					bytes: result.bytes,
				} satisfies Stored<"view">

				if (file.storedURL) {
					return repo
						.find<Stored<"view">>(file.storedURL)
						.then(async handle => {
							handle.change(doc => {
								doc.bytes = editor.bytes
							})
							const [_home, changeHome] = useHome()
							changeHome(home => {
								if (![...home.views].includes(handle.url)) {
									home.views.push(handle.url)
								}
							})
						})
				}

				const url = repo.create(editor).url
				handle.change(file => {
					file.storedURL = url
				})
				const [_home, changeHome] = useHome()

				changeHome(home => {
					if (![...home.views].includes(handle.url)) {
						home.views.push(handle.url)
					}
				})
			})
	},
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
