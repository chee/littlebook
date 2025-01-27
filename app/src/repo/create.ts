import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import {Repo, type AutomergeUrl} from "@automerge/automerge-repo"
import homeURL from "./home.ts"

export async function createAutomergeRepo() {
	const repo = new Repo({
		network: [new BrowserWebSocketClientAdapter("wss://galaxy.observer/")],
		storage: new IndexedDBStorageAdapter("pointplace"),
	})
	await repo.networkSubsystem.whenReady()
	return repo
}

const repo = await createAutomergeRepo()

const api = {
	get home() {
		return repo.find(homeURL())
	},
	get current() {
		return repo.find(location.hash.slice(1) as AutomergeUrl)
	},
}

window.repo = repo
window.api = api

declare global {
	interface Window {
		repo: typeof repo
		api: typeof api
	}
}

export default repo
