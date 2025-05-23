import {
	type TldrawFile,
	type TLRecord,
	type StoreSnapshot,
	parseTldrawJsonFile,
	createTLSchema,
} from "tldraw"
import * as tldrfile from "./editors/tldrfile.tsx"
import type {OpenCanvas} from "./ocif.d.ts"

export const editors = [tldrfile]

export function snapshotToTldrFile(
	snapshot: StoreSnapshot<TLRecord>
): TldrawFile {
	return {
		tldrawFileFormatVersion: 1,
		records: Object.values(snapshot.store),
		schema: snapshot.schema,
	}
}

export function tldrFileToSnapshot(file: TldrawFile): StoreSnapshot<TLRecord> {
	if (file.tldrawFileFormatVersion !== 1) {
		console.warn(
			`i only know about version 1 files. this file is ${file.tldrawFileFormatVersion}. i might make mistakes :(`
		)
	}
	return {
		store: file.records.reduce((store, record) => {
			store[record.id] = record
			return store
		}, {} as StoreSnapshot<TLRecord>["store"]),
		schema: file.schema,
	}
}

export function ocifToTldrStore(ocif: OpenCanvas) {}
