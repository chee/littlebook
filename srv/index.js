// @ts-check
import fs from "node:fs"
import {WebSocketServer} from "ws"
import {Repo} from "@automerge/automerge-repo"
import {NodeWSServerAdapter} from "@automerge/automerge-repo-network-websocket"
import {NodeFSStorageAdapter} from "@automerge/automerge-repo-storage-nodefs"
const directory =
	process.env.AUTOMERGE_DIRECTORY || "automerge-sync-server-data"
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory)
}
const sock = new WebSocketServer({
	port: Number.parseInt(process.env.PORT || "11124"),
})

const config = {
	network: [new NodeWSServerAdapter(sock)],
	storage: new NodeFSStorageAdapter(directory),

	peerId: /** @type {(import("@automerge/automerge-repo").PeerId)} */ (
		`storage-server-${process.env.AUTOMERGE_HOST || "littlebook.app"}`
	),
	// Since this is a server, we don't share generously — meaning we only sync documents they already
	// know about and can ask for by ID.
	sharePolicy: async () => false,
}
const repo = new Repo(config)

repo.addListener("document", doc => {
	if (doc.isNew) {
		console.log("new: ", doc.handle.documentId)
	}
	doc.handle.addListener("change", change => {
		console.log(change.patchInfo)
	})
})
