import WebSocket from "ws"
import {Repo, WebSocketClientAdapter} from "@automerge/vanillajs"
import * as Automerge from "@automerge/automerge"
import * as AutomergeVanilla from "@automerge/vanillajs"

// @ts-expect-error this is on purpose
globalThis.WebSocket = WebSocket

globalThis.Automerge = Automerge
globalThis.AutomergeVanilla = AutomergeVanilla

const repo = new Repo({
	network: [
		new WebSocketClientAdapter("wss://galaxy.observer/"),
		new WebSocketClientAdapter("ws://localhost:11128"),
	],
})

// const home = await repo.find(
// 	"automerge:PkMLhgt3mDAao6MeFycx7hNRF4o" as AutomergeUrl,
// )

import REPL from "node:repl"
const repl = REPL.start({useGlobal: true})
repl.context.repo = repo
// repl.context.home = home
