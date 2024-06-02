import {Effect} from "effect"
import {createExpressApp} from "@evolu/server"
import cors from "cors"

const app = await Effect.runPromise(createExpressApp)
app.use(cors())
app.options("*", cors())
app.listen(11124)
