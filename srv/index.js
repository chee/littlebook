// @ts-check
import fs from "node:fs"
import {WebSocketServer} from "ws"
import {Repo} from "@automerge/automerge-repo"
import {NodeWSServerAdapter} from "@automerge/automerge-repo-network-websocket"
import {NodeFSStorageAdapter} from "@automerge/automerge-repo-storage-nodefs"
import express from "express"
import cors from "cors"
const directory =
	process.env.AUTOMERGE_DIRECTORY || "automerge-sync-server-data"
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory)
}

const app = express()
app.use(express.static("public"))
app.use(cors())

const sock = new WebSocketServer({noServer: true})

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

app.get("/", (request, response) => {
	response.send(
		/*html*/ `
			<!doctype html>
			<meta charset=utf-8>
			<meta name=viewport content=width=device-width,initial-scale=1.0>
			<title> starlight </title>
			<style> body {
				background: #124;
				color: #def;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				font-family: system-ui, sans-serif;
				font-size: 3em;
			} </style>
			<h1> ✨ hello starlight ✨ </h1>
		`,
	)
})

app.on("upgrade", (request, socket, head) => {
	sock.handleUpgrade(request, socket, head, socket => {
		app.emit("connection", socket, request)
	})
})

app.listen(Number.parseInt(process.env.PORT || "11124"))
