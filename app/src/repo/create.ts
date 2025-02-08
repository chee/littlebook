import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import * as Automerge from "@automerge/automerge-repo"

export async function createAutomergeRepo() {
	const repo = new Automerge.Repo({
		network: [new BrowserWebSocketClientAdapter("wss://galaxy.observer/")],
		storage: new IndexedDBStorageAdapter("pointplace"),
		enableRemoteHeadsGossiping: true,
	})
	await repo.networkSubsystem.whenReady()
	return repo
}
const repo = await createAutomergeRepo()

window.repo = repo
window.Automerge = Automerge

declare global {
	interface Window {
		repo: typeof repo
		Automerge: typeof Automerge
	}
}

export default repo
