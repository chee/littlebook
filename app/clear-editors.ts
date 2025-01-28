import WebSocket from "ws"
import {Repo} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"

globalThis.WebSocket = WebSocket

const repo = new Repo({
	network: [new BrowserWebSocketClientAdapter("wss://galaxy.observer/")],
})

const home = repo.find("automerge:PkMLhgt3mDAao6MeFycx7hNRF4o")
home.doc().then(doc => {
	console.log(doc)
})

import REPL from "repl"

const repl = REPL.start({useGlobal: true})

repl.context.repo = repo
repl.context.home = home
