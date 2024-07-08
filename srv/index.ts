import fs from "node:fs"
import {Repo, type PeerId} from "@automerge/automerge-repo"
import {NodeWSServerAdapter} from "@automerge/automerge-repo-network-websocket"
import {NodeFSStorageAdapter} from "@automerge/automerge-repo-storage-nodefs"
import express from "express"
import ws from "express-ws"
const directory =
	process.env.AUTOMERGE_DIRECTORY || "../automerge-sync-server-data"
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory)
}
const exws = ws(express())
const srv = exws.app
const websocket = exws.getWss()
srv.ws("/", () => {})
srv.use(express.static("public"))
srv.get("/installed-plugins", (request, response) => {
	fs.readdir("public/plugins", (error, paths) => {
		response.json(paths)
	})
})

const repo = new Repo({
	network: [new NodeWSServerAdapter(websocket)],
	storage: new NodeFSStorageAdapter(directory),
	peerId: (process.env.PEER_ID || "starlight") as PeerId,
	sharePolicy: async () => false,
})

srv.listen(Number.parseInt(process.env.PORT || "11124"))

process.on("uncaughtException", error => {
	console.error(error.message)
})
