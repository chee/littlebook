import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry, type Stored} from "./registry.ts"
import type {ContentTypeRegistry} from "./content-type-registry.ts"
import {Automerge, type AutomergeUrl} from "@automerge/automerge-repo/slim"
import {
	type Entry,
	type FileSink,
	type Sink,
	type TransmuteSink,
	type VoidSink,
} from "@pointplace/types"
import repo from "../repo/create.ts"
import {useHome} from "../repo/home.ts"

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

	private contentTypeRegistry: ContentTypeRegistry

	constructor({
		repo,
		contentTypeRegistry,
	}: {
		repo: Repo
		contentTypeRegistry: ContentTypeRegistry
	}) {
		super({
			repo,
			typename: "sink",
		})
		this.contentTypeRegistry = contentTypeRegistry
		this.register(compileToEditor)
		this.register(automergeFileSink)
	}

	*sinks(entry: Entry) {
		const seen = new Set<Sink>()
		for (const publisher of Object.values(this.records)) {
			if (publisher.contentTypes.includes(entry.contentType)) {
				seen.add(publisher)
				yield publisher
			}
		}

		const entryType = this.contentTypeRegistry.get(entry.contentType)
		if (entryType && entryType.conformsTo) {
			for (const publisher of Object.values(this.records)) {
				if (
					Array.isArray(publisher.contentTypes) &&
					publisher.contentTypes.some(type =>
						entryType.conformsTo?.includes(type)
					) &&
					!seen.has(publisher)
				) {
					seen.add(publisher)
					yield publisher
				}
			}
		}

		for (const sink of Object.values(this.records)) {
			if (sink.contentTypes === "*") {
				if (!seen.has(sink)) {
					seen.add(sink)
					yield sink
				}
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
	contentTypes: "*",
	async publish({handle, entry}) {
		return new File([Automerge.save(handle.doc())], `${entry.name}.automerge`)
	},
}

const compileToEditor: VoidSink<{
	text: string
	language: "javascript"
	storedURL?: AutomergeUrl
}> = {
	id: "compile-to-editor",
	category: "void",
	displayName: "compile to editor",
	contentTypes: ["public.code"],
	publish: async ({handle}) => {
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
