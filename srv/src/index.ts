import {LocalFirstAuthSyncServer} from "./auth-server.js"

const srv = new LocalFirstAuthSyncServer("https://star.littlebook.app")
srv.listen({
	port: 11124,
	silent: false,
	storageDir: "automerge-sync-server-data",
})
