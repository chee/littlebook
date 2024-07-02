import {Repo} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {BroadcastChannelNetworkAdapter} from "@automerge/automerge-repo-network-broadcastchannel"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
export default async function start() {
	const storage = new IndexedDBStorageAdapter("lb-docs")

	const socky = new BrowserWebSocketClientAdapter(
		import.meta.env.DEV ? "ws://localhost:11124" : "wss://star.littlebook.app",
	)
	const tabby = new BroadcastChannelNetworkAdapter()

	const repo = new Repo({
		network: [socky, tabby],
		storage,
	})

	await new Promise<void>(yay => repo.networkSubsystem.once("ready", yay))

	return repo
}
