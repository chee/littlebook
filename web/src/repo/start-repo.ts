// @refresh skip
import {Repo, type PeerId} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import type * as Auth from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {eventPromise as waitForEvent} from "@localfirst/shared"
import {createId} from "@paralleldrive/cuid2"
import dbName from "../lib/db-name.ts"

export type CreateRepoOpts = {
	user?: Auth.UserWithSecrets
	device: Auth.DeviceWithSecrets
}

export default async function start({user, device}: CreateRepoOpts) {
	const storage = new IndexedDBStorageAdapter()
	console.log({user, device})

	const auth = new AuthProvider({
		user,
		device,
		storage,
		server: "star.littlebook.app",
	})

	const websocketAdapter = new BrowserWebSocketClientAdapter(
		"wss://star.littlebook.app",
	)

	// const broadcastAdapter = new BroadcastChannelNetworkAdapter()

	const repo = new Repo({
		peerId: `lb-${createId()}` as PeerId,
		storage,
		network: [auth.wrap(websocketAdapter)],
	})

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	auth.addListener("disconnected", console.error)
	auth.addListener("remoteError", console.error)
	auth.addListener("localError", console.error)

	return {auth, repo}
}

/*
	// @ts-expect-error
	websocketAdapter.onMessage = function (
		this: BrowserWebSocketClientAdapter,
		event: MessageEvent<Uint8Array>,
	) {
		try {
			this.receiveMessage(event.data)
		} catch (error) {
			 error(error)
			// // hack that seems to work when the server freaks out
			// const shareId = local.state.homeShareId
			// if (shareId) {
			// 	auth.createTeam(auth.getTeam(shareId).teamName)
			// }
		}
	}.bind(websocketAdapter)
	*/
