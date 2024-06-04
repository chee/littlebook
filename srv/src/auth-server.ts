import {Repo, type PeerId} from "@automerge/automerge-repo"
import {NodeWSServerAdapter} from "@automerge/automerge-repo-network-websocket"
import {NodeFSStorageAdapter} from "@automerge/automerge-repo-storage-nodefs"
import {
	Team,
	castServer,
	createKeyset,
	redactKeys,
	type Keyring,
	type Keyset,
	type KeysetWithSecrets,
	type ServerWithSecrets,
} from "@localfirst/auth"
import {
	AuthProvider,
	getShareId,
	type ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import {debug} from "@localfirst/shared"
import bodyParser from "body-parser"
import chalk from "chalk"
import cors from "cors"
import express, {type ErrorRequestHandler} from "express"
import fs from "node:fs"
import type {Server as HttpServer} from "node:http"
import {fileURLToPath} from "node:url"
import path from "node:path"
import {WebSocketServer} from "ws"

const isDev = process.env.NODE_ENV === "development"
const hello = /*html*/ `
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
`

export class LocalFirstAuthSyncServer {
	webSocketServer?: WebSocketServer
	server?: HttpServer
	storageDir = "automerge-sync-server-data"
	publicKeys?: Keyset

	log = debug.extend("starlight:syncserver")

	constructor(private readonly host: string) {
		this.log.extend(host)
	}

	async listen(
		options: {
			port?: number
			storageDir?: string
			silent?: boolean
		} = {},
	) {
		return new Promise<void>(resolve => {
			const {
				port = 3000,
				storageDir = "automerge-sync-server-data",
				silent = false,
			} = options

			this.storageDir = storageDir

			if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir)

			const keys = this.#getKeys()
			this.publicKeys = redactKeys(keys)

			this.webSocketServer = new WebSocketServer({noServer: true})

			this.webSocketServer.on("close", (payload: any) => {
				this.close(payload)
			})

			// Set up the auth provider
			const server: ServerWithSecrets = {host: this.host, keys}
			const user = castServer.toUser(server)
			const device = castServer.toDevice(server)
			const peerId = this.host as PeerId
			const storage = new NodeFSStorageAdapter(storageDir)
			const auth = new AuthProvider({user, device, storage})

			// Set up the repo
			const adapter = new NodeWSServerAdapter(this.webSocketServer)
			const _repo = new Repo({
				peerId,
				network: [auth.wrap(adapter)],
				storage,
				sharePolicy: async _peerId => false,
			})

			// Set up the server
			const confirmation = "✨ hello starlight ✨"

			const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
				console.error(err.stack)
				res.status(500).send(err.message)
			}

			this.server = express()
				.use(bodyParser.json())
				.use(cors())
				.get("/", (req, res) => {
					res.send(hello)
				})
				.get("/keys", (req, res) => {
					this.log("GET /keys %o", req.body)
					res.send(this.publicKeys)
				})
				.post("/teams", async (req, res) => {
					this.log("POST /teams %o", req.body)
					const {serializedGraph, teamKeyring} = req.body as {
						serializedGraph: Uint8Array
						teamKeyring: Keyring
					}

					// rehydrate the team using the serialized graph and the keys passed in the request
					const team = new Team({
						source: objectToUint8Array(serializedGraph),
						context: {server},
						teamKeyring,
					})

					if (auth.hasTeam(getShareId(team))) {
						res.status(500).send(`Team ${team.id} already registered`)
					}
					await auth.addTeam(team)
					res.end()
				})

				.post("/public-shares", async (req, res) => {
					this.log("POST /public-shares %o", req.body)
					const {shareId} = req.body as {
						shareId: ShareId
					}
					await auth.joinPublicShare(shareId)
					res.end()
				})

				.use(errorHandler)

				.listen(port, () => {
					if (!silent) {
						const hostExt = this.host + (port ? `:${port}` : "")
						const wsUrl = `${isDev ? "ws" : "wss"}://${hostExt}`
						const httpUrl = `${isDev ? "http" : "https"}://${hostExt}`
						console.info(
							[
								"",
								chalk.yellow(confirmation),
								`  ${chalk.green("➜")}  ${chalk.cyan(wsUrl)}`,
								`  ${chalk.green("➜")}  ${chalk.cyan(httpUrl)}`,
								"",
							].join("\n"),
						)
					}
					resolve()
				})

			this.server.on("upgrade", (request, socket, head) => {
				this.webSocketServer?.handleUpgrade(request, socket, head, socket => {
					this.webSocketServer?.emit("connection", socket, request)
				})
			})
		})
	}

	close(payload?: any) {
		this.log("socket closed %o", payload)
		this.server?.close()
	}

	readonly #getKeys = () => {
		const keysPath = path.join(this.storageDir, "__SERVER_KEYS.json")
		if (fs.existsSync(keysPath)) {
			// retrieve from storage
			const serializedKeys = fs.readFileSync(keysPath, "utf8")
			const keys = JSON.parse(serializedKeys) as KeysetWithSecrets
			return keys
		}

		// create & store new keys
		const keys = createKeyset({type: "SERVER", name: this.host})
		fs.writeFileSync(keysPath, JSON.stringify(keys, null, 2))
		return keys
	}
}

function objectToUint8Array(obj: Record<number, number>): Uint8Array {
	const arr = Object.values(obj)
	return new Uint8Array(arr)
}
