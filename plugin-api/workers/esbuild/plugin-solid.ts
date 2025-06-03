import * as babel from "@babel/standalone"
import {type Plugin as EsbuildPlugin} from "esbuild-wasm"
// @ts-expect-error
import babelSolid from "../babel/babel-preset-solid.js"
import {getJSXImportSource} from "../babel/jsx-comments.ts"

export function solid(options: {
	files: Record<string, string>
	jsxImportSource?: string
}): EsbuildPlugin {
	return {
		name: "littlebook:solid",
		setup(build) {
			build.onLoad({filter: /\.(t|j)sx$/}, async args => {
				const isTypescript = args.path.endsWith(".tsx")
				const filename = args.path.replace(/.*\//, "")
				const content = options.files[args.path]
				const contentJsxImportSource = getJSXImportSource(content)
				const jsxImportSource =
					options.jsxImportSource ?? contentJsxImportSource
				if (jsxImportSource == "solid-js") {
					let code = content
					if (isTypescript) {
						const trans = await build.esbuild.transform(content, {
							loader: "tsx" as const,
							jsx: "preserve",
						})
						code = trans.code
					}
					const result = babel.transform(code, {
						presets: [babelSolid],
						filename,
					})
					if (!result.code) {
						console.warn(`failed to babel transform ${args.path}`)
						return null
					}
					return {contents: result.code, loader: "js"}
				}
				return null
			})
		},
	}
}
