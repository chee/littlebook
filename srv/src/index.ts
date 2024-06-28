import {LocalFirstAuthSyncServer} from "./auth-server.js"

const srv = new LocalFirstAuthSyncServer("star.littlebook.app")
srv.listen({
	port: 11124,
	storageDir: "../automerge-sync-server-data",
})
