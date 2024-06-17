// @refresh skip
import {type Doc, Repo, type PeerId} from "@automerge/automerge-repo"
// import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
// import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"
import type * as Auth from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {eventPromise as waitForEvent} from "@localfirst/shared"

export type CreateRepoOpts = {
	user?: Auth.UserWithSecrets
	device: Auth.DeviceWithSecrets
}

export default async function start({user, device}: CreateRepoOpts) {
	// const storage = new OPFSStorageAdapter("automerge")
	const storage = new IndexedDBStorageAdapter("automerge")

	// const worker = new sharedworker(
	// 	new url("./repo.worker.ts", import.meta.url),
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
	// const broadcast = new BroadcastChannelNetworkAdapter()
	const network = [auth.wrap(websocketAdapter)]

	const repo = new Repo({
		peerId: device.deviceId as PeerId,
		storage,
		network,
		// todo the sharePolicy could check if the user is in a list of people who
		// can see that document? the server would have to do the same. at first
		// i'll make shared documents URL-only public using @localfirst/auth though
		async sharePolicy(_peerId, _documentId) {
			return true
		},
	})

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	return {auth, repo}
}
