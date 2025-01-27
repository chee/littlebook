import {
	type TldrawFile,
	type TLRecord,
	type StoreSnapshot,
	parseTldrawJsonFile,
	T,
	createTLSchema,
} from "tldraw"
import * as tldrfile from "./editors/tldrfile.tsx"
import {encode} from "@automerge/automerge-repo/helpers/cbor.js"
import type {
	OpenCanvas,
	Dimensions,
	OCWGEdge,
	OCWGSet,
	OpenCanvasNode,
	OpenCanvasRelation,
	OpenCanvasSchema,
	Property,
} from "./ocif"
export const coders = [
	{
		id: "tldraw.tldr",
		displayName: "Tldrfile",
		mimeTypes: ["application/json"],
		contentType: "tldraw/.tldr",
		decode(bytes: Uint8Array) {
			const schema = createTLSchema()
			try {
				const json = new TextDecoder().decode(bytes)
				const store = parseTldrawJsonFile({json, schema})
				if (store.ok) {
					return {ok: true, val: JSON.parse(json)}
				} else {
					return {ok: false, err: store.error}
				}
			} catch (err) {
				return {ok: false, err}
			}
		},
		encode(file: TldrawFile) {
			try {
				const text = new TextEncoder().encode(JSON.stringify(file))
				return {ok: true, val: text}
			} catch (err) {
				return {ok: false, err}
			}
		},
		new() {
			return {
				tldrawFileFormatVersion: 1,
				records: [],
				schema: createTLSchema(),
			}
		},
	},
	{
		// id: "tldraw/ocif",
		// displayName: "Tldraw Open Canvas Editor",
		// contentType: "tldraw/ocif",
		// mimeTypes: ["application/json"],
		// decode(bytes: Uint8Array) {
		// 	const schema = createTLSchema()
		// 	try {
		// 		const json = new TextDecoder().decode(bytes)
		// 		const store = parseTldrawJsonFile({json, schema})
		// 		if (store.ok) {
		// 			return {ok: true, val: JSON.parse(json)}
		// 		} else {
		// 			return {ok: false, err: store.error}
		// 		}
		// 	} catch (err) {
		// 		return {ok: false, err}
		// 	}
		// },
		// encode(file: TldrawFile) {
		// 	try {
		// 		const text = new TextEncoder().encode(JSON.stringify(file))
		// 		return {ok: true, val: text}
		// 	} catch (err) {
		// 		return {ok: false, err}
		// 	}
		// }
	},
	// {
	// 	id: "tldraw/store",
	// 	displayName: "Tldraw Store",
	// 	mimeTypes: ["application/json"],
	// 	contentType: "tldraw/store",
	// 	decode(bytes: Uint8Array) {
	// 		const schema = createTLSchema()
	// 		try {
	// 			const json = new TextDecoder().decode(bytes)
	// 			const store = parseTldrawJsonFile({json, schema})
	// 			return {ok: true, val: file}
	// 		} catch (err) {
	// 			return {ok: false, err}
	// 		}
	// 	},
	// },
]
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

export function ocifToTldrStore(ocif: OpenCanvas) {}
