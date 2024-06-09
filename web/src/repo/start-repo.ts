import {type Doc, Repo, type PeerId} from "@automerge/automerge-repo"
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

	// migration system lol
	// repo.on("document", async ({handle}) => {
	// 	await handle.whenReady()
	// 	const doc = await handle.doc()
	// 	if (doc.type == "file") {
	// 		if (doc.name.endsWith(".txt")) {
	// 			const contentHandle = repo.find<lb.Content<any>>(doc.content)
	// 			await contentHandle.whenReady()
	// 			const content = await contentHandle.doc()
	// 			console.log(content)
	// 			contentHandle.change(content => {
	// 				if (content && "body" in content) {
	// 					content.value = structuredClone(content.body)
	// 					content.type = "content"
	// 					content.id = contentHandle.documentId
	// 					if (doc.name.endsWith(".txt")) {
	// 						content.contentType = "public.plain-text"
	// 					} else if (doc.name.endsWith(".excalidraw")) {
	// 						content.contentType = "com.excalidraw.elements"
	// 					} else if (doc.name.endsWith(".jpeg")) {
	// 						content.contentType = "app.littlebook.image"
	// 					}
	// 					delete content.body
	// 					content.body = null
	// 					delete content.body
	// 				}
	// 			})
	// 		}
	// 		console.log(doc)
	// 		handle.change(doc => {
	// 			if ("annotation" in doc) {
	// 				doc.note = ""
	// 				doc.annotation = null
	// 				delete doc.annotation
	// 			}
	// 		})
	// 	}
	// })
	return {auth, repo}
}
/*
if (doc && doc.type == "file") {
				const content = repo.find<lb.Content<any>>(doc.content)
				let ext = doc.ext
				console.log("is file", doc)
				if (doc.annotation) {
					handle.change(doc => {
						doc.note = ""
						console.log(doc.deleteAt)
					})
				}
				if (ext) {
					handle.change(doc => {
						doc.name += "." + ext
						delete doc.ext
					})
				}
				await content.whenReady()
				content.doc().then(c => {
					if (c && c.body) {
						content.change(c => {
							c.value = JSON.parse(JSON.stringify(c.body))
							delete c.body
						})
					}
					if (ext == "txt" || doc.name.endsWith(".txt")) {
						if (!c) {
							const cont = createContentHandle(repo, {
								contentType: "public.plain-text",
								value: [],
							})
							handle.change(() => {
								doc.content = cont.documentId
							})
						} else {
							content.change(c => {
								c.contentType = "public.plain-text"
							})
						}
					} else if (ext == "excalidraw" || doc.name.endsWith(".txt")) {
						if (!c) {
							const cont = createContentHandle(repo, {
								contentType: "com.excalidraw.elements",
								value: [],
							})
							handle.change(() => {
								doc.content = cont.documentId
							})
						} else {
							content.change(c => {
								c.contentType = "com.excalidraw.elements"
							})
						}
					} else if (ext) {
						content.change(c => {
							c.contentType = "public.image"
						})
					}
				})
			}
		})
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
			// if (doc && doc.type == "project" && Array.isArray(doc.children)) {
			// 	handle.change(doc => {
			// 		doc.items = [...doc.children]
			// 		doc.children
			// 	})
			// }
*/
// if (doc) {
// 	console.log(doc)
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
// })
