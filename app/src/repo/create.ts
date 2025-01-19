import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import {Repo} from "@automerge/automerge-repo"

export async function createAutomergeRepo() {
	const repo = new Repo({
		network: [new BrowserWebSocketClientAdapter("wss://galaxy.observer/")],
		storage: new IndexedDBStorageAdapter("pointplace"),
	})
	await repo.networkSubsystem.whenReady()
	return repo
}

const repo = await createAutomergeRepo()
window.repo = repo

declare global {
	interface Window {
		repo: typeof repo
	}
}

export default repo
