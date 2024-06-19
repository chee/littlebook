// @refresh skip
import {type PeerId, Repo} from "@automerge/automerge-repo"
// import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
import type * as Auth from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {eventPromise as waitForEvent} from "@localfirst/shared"
import * as local from "../ui/automerge/local.ts"

export type CreateRepoOpts = {
	user?: Auth.UserWithSecrets
	device: Auth.DeviceWithSecrets
}

export default async function start({user, device}: CreateRepoOpts) {
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

	const network = [auth.wrap(websocketAdapter)]

	const repo = new Repo({
		peerId: device.deviceId as PeerId,
		storage,
		network,
	})
	// occasionally i have to remake the home team?
	// hack
	user && auth.createTeam(user.userName)

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	return {auth, repo}
}

// // @ts-expect-error
// websocketAdapter.onMessage = function (
// 	this: BrowserWebSocketClientAdapter,
// 	event: MessageEvent<Uint8Array>,
// ) {
// 	try {
// 		this.receiveMessage(event.data)
// 	} catch (error) {
// 		console.error(error)
// 		// hack that seems to work when the server freaks out
// 		const shareId = local.state.homeShareId
// 		if (shareId) {
// 			auth.createTeam(auth.getTeam(shareId).teamName)
// 		}
// 	}
// }.bind(websocketAdapter)
