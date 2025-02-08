import WebSocket from "ws"
import {Repo, type AutomergeUrl} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"

globalThis.WebSocket = WebSocket

const repo = new Repo({
	network: [new BrowserWebSocketClientAdapter("wss://galaxy.observer/")],
})

const home = await repo.find(
	"automerge:PkMLhgt3mDAao6MeFycx7hNRF4o" as AutomergeUrl
)

import REPL from "repl"

const repl = REPL.start({useGlobal: true})

repl.context.repo = repo
repl.context.home = home
