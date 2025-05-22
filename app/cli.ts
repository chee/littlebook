import WebSocket from "ws"
import {
	Repo,
	WebSocketClientAdapter,
	type AutomergeUrl,
} from "@automerge/vanillajs"

// @ts-expect-error this is on purpose
globalThis.WebSocket = WebSocket

const repo = new Repo({
	network: [new WebSocketClientAdapter("wss://galaxy.observer/")],
})

const home = await repo.find(
	"automerge:PkMLhgt3mDAao6MeFycx7hNRF4o" as AutomergeUrl,
)

import REPL from "repl"

const repl = REPL.start({useGlobal: true})

repl.context.repo = repo
repl.context.home = home
