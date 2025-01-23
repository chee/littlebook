import type {TldrawFile, TLRecord, StoreSnapshot} from "tldraw"
import view from "./view.tsx"
export default view

export function tldrFileToSnapshot(file: TldrawFile): StoreSnapshot<TLRecord> {
	if (file.tldrawFileFormatVersion !== 1) {
		console.warn(
			`i only know about version 1 files. this file is ${file.tldrawFileFormatVersion}. i might make mistakes :(`
		)
	}
	return {
		store: file.records.reduce(
			(store, record) => {
				store[record.id] = record
				return store
			},
			{} as StoreSnapshot<TLRecord>["store"]
		),
		schema: file.schema,
	}
}
