import {Repo, type PeerId} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import type * as Auth from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {eventPromise as waitForEvent} from "@localfirst/shared"

type CreateRepoOpts = {
	user?: Auth.UserWithSecrets
	device: Auth.DeviceWithSecrets
}
export default async function createRepo({user, device}: CreateRepoOpts) {
	// const storage = new OPFSStorageAdapter("automerge")
	const storage = new IndexedDBStorageAdapter("automerge")

	// const worker = new SharedWorker(
	// 	new URL("./automerge.worker.ts", import.meta.url),
	// 	{
	// 		type: "module",
	// 		name: "automerge-repo-shared-worker",
	// 	},
	// )

	const auth = new AuthProvider({
		user,
		device,
		storage,
		server: "https://star.littlebook.app",
	})

	const websocketAdapter = new BrowserWebSocketClientAdapter(
		"wss://star.littlebook.app",
	)
	// const workerAdapter = new MessageChannelNetworkAdapter(worker.port)
	const networkAdapter = websocketAdapter
	const network = [auth.wrap(networkAdapter)]

	const repo = new Repo({
		peerId: device.deviceId as PeerId,
		storage,
		network,
		// turn on when we are pointing at the worker again
		// sharePolicy: async peerId => peerId.startsWith("starlight-"),
	})

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	return {auth, repo}
}
