import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {BroadcastChannelNetworkAdapter} from "@automerge/automerge-repo-network-broadcastchannel"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"

export default async function start() {
	const AutomergeRepo = await import("@automerge/automerge-repo")

	const idb = new IndexedDBStorageAdapter("lb-docs")
	const opfs = new OPFSStorageAdapter("lb-docs")

	const socky = new BrowserWebSocketClientAdapter(
		`wss://${import.meta.env.LB_SRV_PRODUCTION_HOST}`,
	)
	const tabby = new BroadcastChannelNetworkAdapter()

	const network = [socky, tabby]
	if (import.meta.env.DEV) {
		network.push(
			new BrowserWebSocketClientAdapter(
				`ws://${import.meta.env.LB_SRV_DEVELOPMENT_HOST}`,
			),
		)
	}
	const storage = typeof FileSystemWritableFileStream == "function" ? opfs : idb

	const repo = new AutomergeRepo.Repo({
		network,
		storage,
	})

	await new Promise<void>(yay => repo.networkSubsystem.once("ready", yay))

	return repo
}
