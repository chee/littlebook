import {
	WebSocketClientAdapter,
	IndexedDBStorageAdapter,
	Repo,
} from "@automerge/vanillajs"
import * as AutomergeRepo from "@automerge/automerge-repo"
import * as Automerge from "@automerge/automerge"
import type {AutomergeURL} from "./url.ts"
import {getSyncServers} from ":/core/sync/servers.ts"
export async function createAutomergeRepo() {
	const repo = new Repo({
		network: [
			...getSyncServers().map(url => new WebSocketClientAdapter(url)),
		],
		storage: new IndexedDBStorageAdapter("littlebook"),
		enableRemoteHeadsGossiping: true,
	})
	await repo.networkSubsystem.whenReady()
	return repo
}
const defaultRepo = await createAutomergeRepo()

self.repo = defaultRepo
self.Automerge = Automerge
self.AutomergeRepo = AutomergeRepo

declare global {
	interface Window {
		repo: typeof defaultRepo
		Automerge: typeof Automerge
		AutomergeRepo: typeof AutomergeRepo
	}
}

export default defaultRepo

/**
 * Create an repo doc and return the URL
 *
 * @param obj - The object to be converted to a URL
 * @returns
 */
export function curl<T extends AutomergeURL>(obj: unknown) {
	return defaultRepo.create(obj).url as T
}
