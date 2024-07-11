import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {BroadcastChannelNetworkAdapter} from "@automerge/automerge-repo-network-broadcastchannel"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"

async function likesOPFS() {
	return (
		typeof FileSystemWritableFileStream == "function" &&
		(await navigator.storage
			.getDirectory()
			.then(() => true)
			.catch(() => false))
	)
}

export default async function start() {
	let AutomergeRepo = await import("@automerge/automerge-repo")

	let idb = new IndexedDBStorageAdapter("lb-docs")
	let opfs = new OPFSStorageAdapter("lb-docs")

	let socky = new BrowserWebSocketClientAdapter(
		`wss://${import.meta.env.LB_SRV_PRODUCTION_HOST}`,
	)

	let tabby = new BroadcastChannelNetworkAdapter()

	let network = [socky, tabby]

	if (import.meta.env.DEV) {
		network.push(
			new BrowserWebSocketClientAdapter(
				`ws://${import.meta.env.LB_SRV_DEVELOPMENT_HOST}`,
			),
		)
	}

	let storage = (await likesOPFS()) ? opfs : idb

	let repo = new AutomergeRepo.Repo({
		network,
		storage,
	})

	await new Promise<void>(yay => repo.networkSubsystem.once("ready", yay))

	return repo
}
