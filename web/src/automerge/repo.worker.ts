/// <reference lib="webworker" />

import type {PeerId} from "@automerge/automerge-repo"

declare const self: SharedWorkerGlobalScope
export const ok = true

console.log("the most difficult job on the planet")
self.addEventListener("connect", (event: MessageEvent) => {
	const [port] = event.ports
	port.start()
	configureRepoNetworkPort(port)
})

// Because automerge is a WASM module and loads asynchronously,
// a bug in Chrome causes the 'connect' event to fire before the
// module is loaded. This promise lets us block until the module loads
// even if the event arrives first.
// Ideally Chrome would fix this upstream but this isn't a terrible hack.
const repoPromise = (async () => {
	const {Repo} = await import("@automerge/automerge-repo")
	const {IndexedDBStorageAdapter} = await import(
		"@automerge/automerge-repo-storage-indexeddb"
	)
	const {BrowserWebSocketClientAdapter} = await import(
		"@automerge/automerge-repo-network-websocket"
	)
	return {Repo, IndexedDBStorageAdapter, BrowserWebSocketClientAdapter}
})()

async function configureRepoNetworkPort(port: MessagePort) {
	const {Repo, IndexedDBStorageAdapter, BrowserWebSocketClientAdapter} =
		await repoPromise
	const repo = new Repo({
		storage: new IndexedDBStorageAdapter(),
		network: [new BrowserWebSocketClientAdapter(import.meta.env.LB_SRV_HOST)],
		peerId: "lightwork" as PeerId,
		sharePolicy: async peerId => peerId.startsWith("starlight"),
	})
	const {MessageChannelNetworkAdapter} = await import(
		"@automerge/automerge-repo-network-messagechannel"
	)
	// be careful to not accidentally create a strong reference to port
	// that will prevent dead ports from being garbage collected
	repo.networkSubsystem.addNetworkAdapter(
		new MessageChannelNetworkAdapter(port, {useWeakRef: true}),
	)
}
