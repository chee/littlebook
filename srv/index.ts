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
srv.get("/", (_, reply) => {
	reply.send(
		/*html*/ `
			<!doctype html>
			<meta charset=utf-8>
			<meta name=viewport content=width=device-width,initial-scale=1.0>
			<title> starlight </title>
			<style> body {
				margin: 0;
				background: #124;
				color: #def;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				font-family: system-ui, sans-serif;
				font-size: 3em;
			} h1 span {
				text-decoration: underline;
				text-decoration-color: #38F8C0;
				text-decoration-style: double;
				text-decoration-skip-ink: none;
			} </style>
			<h1> ✨ <span>hello starlight</span> ✨ </h1>
		`,
	)
})

const repo = new Repo({
	network: [new NodeWSServerAdapter(websocket)],
	storage: new NodeFSStorageAdapter(directory),
	peerId: (process.env.PEER_ID || "starlight") as PeerId,
	sharePolicy: async () => false,
})

repo.addListener("document", doc => {
	if (doc.isNew) {
		console.info("new: ", doc.handle.documentId)
	}
	doc.handle.addListener("change", change => {
		console.info(change.patchInfo)
	})
})

srv.listen(Number.parseInt(process.env.PORT || "11124"))

process.on("uncaughtException", error => {
	console.error(error.message)
})
