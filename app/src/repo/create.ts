import {
	WebSocketClientAdapter,
	IndexedDBStorageAdapter,
} from "@automerge/vanillajs"
import * as Automerge from "@automerge/vanillajs"

export async function createAutomergeRepo() {
	const repo = new Automerge.Repo({
		network: [new WebSocketClientAdapter("wss://galaxy.observer/")],
		storage: new IndexedDBStorageAdapter("littlebook"),
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
