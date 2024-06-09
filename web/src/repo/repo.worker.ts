/// <reference lib="webworker" />
declare const self: SharedWorkerGlobalScope
export const ok = true

const load = (async () => {
	const {Repo} = await import("@automerge/automerge-repo")
	const {IndexedDBStorageAdapter} = await import(
		"@automerge/automerge-repo-storage-indexeddb"
	)
	const {BrowserWebSocketClientAdapter} = await import(
		"@automerge/automerge-repo-network-websocket"
	)
	return new Repo({
		storage: new IndexedDBStorageAdapter(),
		network: [new BrowserWebSocketClientAdapter("wss://star.littlebook.app")],
		peerId: ("shine-" +
			Math.random().toString(36).slice(2).replace(/\d/g, "")) as any,
	})
})()

async function configureRepoNetworkPort(port: MessagePort) {
	const repo = await load
	const {MessageChannelNetworkAdapter} = await import(
		"@automerge/automerge-repo-network-messagechannel"
	)
	repo.networkSubsystem.addNetworkAdapter(
		new MessageChannelNetworkAdapter(port, {useWeakRef: true}),
	)
}

self.addEventListener("connect", (event: MessageEvent) => {
	configureRepoNetworkPort(event.ports[0])
})
