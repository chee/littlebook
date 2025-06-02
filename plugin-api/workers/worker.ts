import * as Comlink from "comlink"
import type {Remote} from "comlink"
import {
	Repo,
	WebSocketClientAdapter,
	IndexedDBStorageAdapter,
	type AutomergeUrl,
} from "@automerge/vanillajs/slim"
import bundle from "./esbuild/bundle.ts"
import {type LittlebookPluginShape} from "./shapes.ts"
import {automergeWasmBase64} from "@automerge/automerge/automerge.wasm.base64"
import {next as Automerge} from "@automerge/automerge/slim"
Automerge.initializeBase64Wasm(automergeWasmBase64)

const repo = new Repo({
	network: [
		new WebSocketClientAdapter(`wss://galaxy.observer`),
		new WebSocketClientAdapter("ws://localhost:11128"),
	],
	storage: new IndexedDBStorageAdapter("littlebook"),
	enableRemoteHeadsGossiping: true,
})

const pluginAPIWorker = {
	async compile(url: AutomergeUrl) {
		const handle = await repo.find<LittlebookPluginShape>(url)
		return bundle(handle)
	},
}

export type PluginAPIWorker = Remote<typeof pluginAPIWorker>

Comlink.expose(pluginAPIWorker)
