import {LocalFirstAuthSyncServer} from "@localfirst/auth-syncserver"

const srv = new LocalFirstAuthSyncServer("https://star.littlebook.app")
srv.listen({
	port: 11124,
	storageDir: "../automerge-sync-server-data",
})
