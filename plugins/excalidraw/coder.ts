import {type ContentCoder, json} from "../../web/src/contents/coders.ts"
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

const jsonCoder = json<ExcalidrawJSON>()

export default {
	encode(string) {
		return jsonCoder.encode(string)
	},
	decode(bytes) {
		if (bytes.length == 0) {
			return base
		}
		const decoded = jsonCoder.decode(bytes)
		return decoded
	},
} satisfies ContentCoder<ExcalidrawJSON>
