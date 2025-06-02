import {dirname, join} from "../path.ts"
import type {Plugin} from "esbuild-wasm"

export default function virtual(modules: Record<string, string>): Plugin {
	const resolvedIds = new Map<string, string>(Object.entries(modules))

	return {
		name: "virtual",
		setup(build) {
			build.onResolve({filter: /.*/}, args => {
				const id = args.path.replace("./", "")

				if (id in modules) {
					return {path: id, namespace: "virtual-file-system"}
				}

				const resolved = join(dirname(args.importer), args.path)
				if (resolvedIds.has(resolved)) {
					return {path: resolved, namespace: "virtual-file-system"}
				}

				return null
			})

			build.onLoad(
				{filter: /.*/, namespace: "virtual-file-system"},
				args => {
					const id = args.path
					const contents = modules[id] ?? resolvedIds.get(id)
					if (contents != null) {
						return {contents, loader: "default"}
					}
					return null
				}
			)
		},
	}
}
