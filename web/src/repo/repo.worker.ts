/// <reference lib="webworker" />
declare const self: SharedWorkerGlobalScope

import {type PeerId, Repo} from "@automerge/automerge-repo"
import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
export const ok = true

const websocketAdapter = new BrowserWebSocketClientAdapter(
	"wss://star.littlebook.app",
)
const storage = new IndexedDBStorageAdapter("automerge")

function makePeerId(namespace = "shine") {
	const id = Math.random().toString(36).slice(2).replace(/\d/g, "")
	return `${namespace}-${id}` as PeerId
}

const repo = new Repo({
	storage,
	network: [websocketAdapter],
	peerId: makePeerId(),
	async sharePolicy(peerId, _documentId) {
		return peerId.startsWith("https://star.littlebook.app")
	},
})

self.addEventListener("connect", (event: MessageEvent) => {
	const [port] = event.ports
	repo.networkSubsystem.addNetworkAdapter(
		new MessageChannelNetworkAdapter(port, {useWeakRef: true}),
	)
})
