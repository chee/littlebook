import type {AutomergeList} from "../../web/src/types.ts"
import type {TldrawFile} from "./shared.ts"
import {createTLSchema} from "@tldraw/tlschema"

export const defaultFileContents: TldrawFile = {
	tldrawFileFormatVersion: 1,
	schema: createTLSchema().serialize(),
	records: toAutomergeList([]),
}

function toAutomergeList<T>(array: T[]): AutomergeList<T> {
	return array as AutomergeList<T>
}

export default function create(
	lb: lb.plugins.API,
): lb.ContentCoder<TldrawFile> {
	const json = lb.coders.json<TldrawFile>()
	return {
		encode(string) {
			return json.encode(string)
		},
		decode(bytes) {
			if (bytes.length == 0) {
				return structuredClone(defaultFileContents)
			}
			const decoded = json.decode(bytes)
			return decoded
		},
	}
}
