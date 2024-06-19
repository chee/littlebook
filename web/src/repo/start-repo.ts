// @refresh skip
import {Repo} from "@automerge/automerge-repo"
import {BroadcastChannelNetworkAdapter} from "@automerge/automerge-repo-network-broadcastchannel"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
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

	const auth = new AuthProvider({
		user,
		device,
		storage,
		server: "https://star.littlebook.app",
	})

	const websocketAdapter = new BrowserWebSocketClientAdapter(
		"wss://star.littlebook.app",
	)

	// @ts-expect-error
	websocketAdapter.onMessage = function (
		this: BrowserWebSocketClientAdapter,
		event: MessageEvent<Uint8Array>,
	) {
		try {
			this.receiveMessage(event.data)
		} catch (error) {
			console.error(error)
			// hack that seems to work when the server freaks out
			const shareId = local.state.homeShareId
			if (shareId) {
				auth.createTeam(auth.getTeam(shareId).teamName)
			}
		}
	}.bind(websocketAdapter)

	const broadcastAdapter = new BroadcastChannelNetworkAdapter()

	const repo = new Repo({
		// peerId: ,
		storage,
		network: [auth.wrap(websocketAdapter), broadcastAdapter],
		// async sharePolicy(peerId, _documentId) {
		// return peerId == device.deviceId
		// },
	})

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	return {auth, repo}
}

/*
	// const workerAdapter = new MessageChannelNetworkAdapter(worker.port)
	// worker.port.postMessage([
	// 	"auth-info",
	// 	JSON.stringify(user),
	// 	JSON.stringify(device),
	// ])
	// worker.port.postMessage({
	// 	type: "peer-id",
	// 	id: device.deviceId,
	// })
		const network = [auth.wrap(workerAdapter)]
			const worker = new SharedWorker(
		new URL("./repo.worker.ts", import.meta.url),
		{
			type: "module",
			name: "automerge-repo-shared-worker",
		},
	)
 */
