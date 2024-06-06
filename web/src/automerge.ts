import {} from "@automerge/automerge/next"
import {Repo, stringifyAutomergeUrl} from "@automerge/automerge-repo"
import {v4 as uuid} from "uuid"
import {OPFSStorageAdapter} from "@chee/automerge-repo-storage-opfs"
import {MessageChannelNetworkAdapter} from "@automerge/automerge-repo-network-messagechannel"

import {
	createUser,
	createDevice,
	type UserWithSecrets,
	type DeviceWithSecrets,
	createTeam,
	type Team,
} from "@localfirst/auth"
import {AuthProvider} from "@localfirst/auth-provider-automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"

// todo take user data probably
export function connect() {
	const {user, device, team} = getUserdata()
	// const storage = new OPFSStorageAdapter("automerge-")
	const storage = new IndexedDBStorageAdapter("same")

	// const worker = new SharedWorker(
	// 	new URL("./automerge.worker.ts", import.meta.url),
	// 	{
	// 		type: "module",
	// 		name: "automerge-repo-shared-worker",
	// 	},
	// )

	const websocketAdapter = new BrowserWebSocketClientAdapter(
		"wss://star.littlebook.app",
	)
	// const workerAdapter = new MessageChannelNetworkAdapter(worker.port)
	const auth = new AuthProvider({
		user,
		device,
		storage,
		server: "https://star.littlebook.app",
	})

	const networkAdapter = websocketAdapter
	const network = [auth.wrap(networkAdapter)]
	const repo = new Repo({
		storage,
		network,
		// sharePolicy: async peerId => peerId.startsWith("starlight-"),
	})

	// todo bip 39
	console.log(user.keys)
	console.log(team.inviteMember())
	console.log(user.keys)
	window.auth = auth
	// auth.addInvitation({
	// 	shareId: "AG99Qgf4bNZ3KxM",
	// 	invitationSeed: "7dZ29NNc9MYSaWMJ",
	// })
	console.log(team.keys)

	return {
		auth,
		team,
		user,
		device,
		// https://github.com/local-first-web/auth/tree/6ab7e9c2947a9d2e865fe5fa8e9967f86f887d5c/packages/auth-provider-automerge-repo
		// const { seed: bobInviteCode } = team.inviteMember()
		// const user = createUser('bob')
		// const device = createDevice(bob.userId, 'BOB-IPHONE-2023')
		// const storage = new SomeStorageAdapter()
		// const authProvider = new AuthProvider({ user, device, storage })
		// const adapter = new SomeNetworkAdapter()
		// const network = [authProvider.wrap(adapter)]
		// const repo = new Repo({ network, storage })
		// bobAuthProvider.addInvitation({
		//  shareId: aliceTeam.id,
		//  invitationSeed: bobInviteCode,
		//})
		repo,
	}
}

export function isKnown() {}

export function getSpaceUrl() {}

// todo prompt the user for these if they haven't been defined
export function getUserdata() {
	const userJSON = localStorage.getItem("user")
	const user: UserWithSecrets = userJSON
		? (JSON.parse(userJSON) as UserWithSecrets)
		: createUser("chee")
	localStorage.setItem("user", JSON.stringify(user))
	const deviceJSON = localStorage.getItem("device")
	const device: DeviceWithSecrets = deviceJSON
		? (JSON.parse(deviceJSON) as DeviceWithSecrets)
		: createDevice(user.userId, navigator.userAgent)
	const teamJSON = localStorage.getItem("team")
	const team: Team = teamJSON
		? (JSON.parse(teamJSON) as Team)
		: createTeam(user.userName, {user, device})
	return {user, device, team}
}

// const docid = bs58check.encode(uuid(null, new Uint8Array(16)))
// const buf = bs58check.decode(docid)
// const u = uuid().replaceAll("-", "")
// console.log("u:", u)
// console.log(bip39.entropyToMnemonic(u))
// console.log(bip39.mnemonicToEntropy(bip39.entropyToMnemonic(u)))
