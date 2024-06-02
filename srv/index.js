import {Effect} from "effect"
import {createExpressApp} from "@evolu/server"

const server = await Effect.runPromise(createExpressApp)
server.listen(11124)
