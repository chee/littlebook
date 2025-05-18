import opts from "./opts.ts"
import * as esbuild from "esbuild"
const context = await esbuild.context(opts)
context.watch()
