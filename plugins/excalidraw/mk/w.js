import opts from "./opts.js"
import * as esbuild from "esbuild"
const context = await esbuild.context(opts)
context.watch()
