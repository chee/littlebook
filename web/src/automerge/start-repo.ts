import {Repo} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {BroadcastChannelNetworkAdapter} from "@automerge/automerge-repo-network-broadcastchannel"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"

export default async function start() {
	const idb = new IndexedDBStorageAdapter("lb-docs")
	const opfs = new OPFSStorageAdapter("lb-docs")
	const socky = new BrowserWebSocketClientAdapter(
		import.meta.env.DEV ? "ws://localhost:11124" : "wss://star.littlebook.app",
	)
	const tabby = new BroadcastChannelNetworkAdapter()

	const repo = new Repo({
		network: [socky, tabby],
		storage: typeof FileSystemWritableFileStream == "function" ? opfs : idb,
	})

	await new Promise<void>(yay => repo.networkSubsystem.once("ready", yay))

	return repo
}
