import {type Doc, Repo, type PeerId, RawString} from "@automerge/automerge-repo"
// import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"
// import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"
import type * as Auth from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {eventPromise as waitForEvent} from "@localfirst/shared"

type CreateRepoOpts = {
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

	const network = [auth.wrap(websocketAdapter)]

	const repo = new Repo({
		peerId: device.deviceId as PeerId,
		storage,
		network,
		// async sharePolicy(peerId) {
		// 	return peerId.startsWith("shine-")
		// },
	})

	await Promise.all([
		waitForEvent(auth, "ready"),
		waitForEvent(repo.networkSubsystem, "ready"),
	])

	// migration system lol
	repo.on("document", async ({handle}) => {
		handle.doc().then((doc: Doc<lb.AnyDocument> | undefined) => {
			// if (doc && typeof doc.id !== "string") {
			// 	handle.change(doc => (doc.id = handle.documentId))
			// }
			// // if (doc && doc.type == "space" && Array.isArray(doc.children)) {
			// 	handle.change(doc => {
			// 		doc.projects = doc.children.map(n => n)
			// 		delete doc.children
			// 	})
			// }
			// if (doc && doc.type == "space" && !Array.isArray(doc.areas)) {
			// 	handle.change(doc => {
			// 		doc.areas = []
			// 	})
			// }
			// console.log(doc)
			// if (
			// 	doc &&
			// 	doc.type == "project" &&
			// 	(typeof doc.icon != "string" || doc.icon.length == 0)
			// ) {
			// 	handle.change(doc => {
			// 		doc.icon = random.choice(["🦔", "🍒", "🧀"])
			// 	})
			// }
			// 	if (doc) {
			// 		handle.change((doc: lb.AnyDocument) => {
			// 			for (const [key, value] of Object.entries(doc)) {
			// 				const dkey = key as keyof typeof doc
			// 				console.log(dkey, value)
			// 				if (value instanceof RawString) {
			// 					if (key in doc) {
			// 						doc[dkey] = RawString.toString()
			// 					}
			// 				}
			// 			}
			// 		})
			// 	}
		})
	})

	return {auth, repo}
}
