import {type ContentCoder, json} from "../../web/src/contents/coders.ts"
import type {AutomergeList} from "../../web/src/types.ts"
import type {TldrawFile} from "./shared.ts"
import {createTLSchema} from "@tldraw/tlschema"

export const defaultFileContents: TldrawFile = {
	tldrawFileFormatVersion: 1,
	schema: createTLSchema().serialize(),
	records: toAutomergeList([]),
}

const jsonCoder = json<TldrawFile>()
function toAutomergeList<T>(array: T[]): AutomergeList<T> {
	return array as AutomergeList<T>
}

export default {
	encode(string) {
		return jsonCoder.encode(string)
	},
	decode(bytes) {
		if (bytes.length == 0) {
			return defaultFileContents
		}
		const decoded = jsonCoder.decode(bytes)
		return decoded
	},
} satisfies ContentCoder<TldrawFile>
