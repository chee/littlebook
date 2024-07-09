import type {AutomergeList} from "../../web/src/types.ts"
import type {ExcalidrawJSON} from "./shared.ts"

function toAutomergeList<T>(array: T[]): AutomergeList<T> {
	return array as AutomergeList<T>
}

const base = {
	type: "excalidraw",
	version: 2,
	source: "https://littlebook.app",
	elements: toAutomergeList([]),
	appState: {},
	files: {},
} satisfies ExcalidrawJSON

export default function create(
	lb: lb.plugins.API,
): lb.ContentCoder<ExcalidrawJSON> {
	const json = lb.coders.json<ExcalidrawJSON>()
	return {
		encode(string) {
			return json.encode(string)
		},
		decode(bytes) {
			if (bytes.length == 0) {
				return structuredClone(base)
			}
			const decoded = json.decode(bytes)
			return decoded
		},
	}
}
