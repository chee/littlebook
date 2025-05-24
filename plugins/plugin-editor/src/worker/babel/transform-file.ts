import type {DocHandle} from "@automerge/vanillajs"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import * as babel from "@babel/standalone"
import type {PluginItem as BabelPluginItem} from "@babel/core"

export default async function transformFile(
	handle: DocHandle<LittlebookPluginShape>,
	name: string,
	code: string
) {
	const meta = handle.doc().meta
	const jsxImportSource = meta.jsxImportSource
	const presets: BabelPluginItem[] = [
		["typescript", {rewriteImportExtensions: true}],
		["env", {loose: true, modules: false}],
	]
	if (jsxImportSource) {
		if (jsxImportSource == "solid-js") {
			presets.push(["solid", {generate: "dom"}])
		} else {
			presets.push([
				"react",
				{runtime: "automatic", importSource: jsxImportSource},
			])
		}
		code = `/** @jsxRuntime automatic*/\n/** @jsxImportSource ${jsxImportSource} */\n${code}`
	}
	const transformed = babel.transform(code, {presets, filename: name})
	return transformed
}
