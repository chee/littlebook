import * as babel from "@babel/standalone"
import {parse} from "@babel/parser"
import {type Plugin as EsbuildPlugin} from "esbuild-wasm"
import type {VirtualFileSystem} from "../virtual/util.ts"
import babelSolid from "../babel/babel-preset-solid.js"

export function solid(options: {
	files: VirtualFileSystem
	jsxImportSource?: string
}): EsbuildPlugin {
	return {
		name: "littlebook:solid",
		setup(build) {
			build.onLoad({filter: /\.(t|j)sx$/}, async args => {
				const isTypescript = args.path.endsWith(".tsx")
				const filename = args.path.replace(/.*\//, "")
				const content = options.files[args.path]
				const contentJsxImportSource = findPragma(content)
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

// todo lol i should add some tests to this code and package it
// bizarrely this is how the typescript parsing works, but not how esbuild/react
// do it
export function findPragma(source: string): string | null {
	const jsxComments = getJSXComments(source)
	const values = jsxComments
		?.flatMap(c => {
			return c.value
				.split("\n")
				.map(v => v.match(/@jsx(\S+)\s+(\S+)/i)?.slice(1)) as [
				string,
				string
			][]
		})
		.filter(Boolean)
	if (values) {
		const map = Object.fromEntries(
			values.map(v => [v[0].toLowerCase(), v[1]])
		)
		if (map.runtime && map.runtime != "automatic") {
			return null
		}
		return map.importsource || null
	}
	return null
}

export function getJSXComments(source: string) {
	const ast = parse(source, {
		sourceType: "module",
		plugins: ["typescript", "jsx"],
		ranges: true,
	})
	const body = ast.program.body
	if (body.length === 0) return null
	if (!ast.comments) return null
	const firstCode = body[0].start ?? Infinity
	const matches = ast.comments.filter(c => {
		return (
			c.type === "CommentBlock" &&
			c.end! <= firstCode! &&
			/@jsx\S+\s+\S+/i.test(c.value)
		)
	})
	return matches
}
