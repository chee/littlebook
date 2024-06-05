import {LocalFirstAuthSyncServer} from "@localfirst/auth-syncserver"

const srv = new LocalFirstAuthSyncServer("star.littlebook.app")
srv.listen({
	port: 11124,
	silent: false,
})
