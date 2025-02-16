// things i'll need to make available in @littlebook/plugin
// import "../../web/src/types.ts"
// import type {ContentHandleChangePayload} from "../../web/src/types.ts"
// import {
// ContentViewElement,
// type ContentViewComponent,
// } from "../../web/src/files/contents/view-registry.ts"

export const id = "tldraw/.tldr"
export const name = "Tldraw Canvas Editor"
export const contentTypes = [".tldr"]

import {
	useCallback,
	useEffect,
	type FunctionComponent,
	useRef,
	useLayoutEffect,
	useState,
} from "react"

import type {TldrawFile} from "../shared.ts"
import {createRoot} from "react-dom/client"

import {Box, createTLStore, useEditor} from "@tldraw/editor"
import {parseTldrawJsonFile, Tldraw} from "tldraw"
import {
	deleteAt,
	type ChangeFn,
	type ChangeOptions,
	type Doc,
	type InsertPatch,
	type PutPatch,
	type SpliceTextPatch,
} from "@automerge/automerge/next"

import type {HistoryEntry, TLRecord, RecordId, Editor} from "tldraw"

function insert(patch: InsertPatch, object: TLRecord) {
	return object
}

function put(patch: PutPatch, object: TLRecord) {
	return object
}

function splice(patch: SpliceTextPatch, object: TLRecord) {
	return object
}

function merge(target: any, source: any) {
	for (const [key, value] of Object.entries(source)) {
		if (["number", "string", "boolean"].includes(typeof value)) {
			if (target[key] != source[key]) {
				target[key] = source[key]
			}
		} else if (value == null) {
			if (target[key] !== null) {
				target[key] = null
			}
		} else if (Array.isArray(value)) {
			if (!target[key]) {
				target[key] = []
			}
			value.forEach((src, i) => {
				if (target[key][i]) {
					merge(target[key][i], src)
				} else {
					target[key][i] = src
				}
			})
		} else {
			if (target[key]) {
				merge(target[key], value)
			} else {
				target[key] = value
			}
		}
	}
}

function TldrawInner(props: {handle: DocHandle<TldrawFile>}) {
	const [file, change] = useDocument(props.handle)
	let editor = useEditor()
	editor

	let applyingLocal = useRef(false)

	// editor.store.loadStoreSnapshot(editor.store.getStoreSnapshot())

	let onlocalchange = useCallback((history: HistoryEntry<TLRecord>) => {
		let source = history.source

		if (source == "user") {
			let {added, removed, updated} = history.changes

			change(doc => {
				for (let add of Object.values(added)) {
					if (!doc.records.find(r => r.id == add.id)) {
						doc.records.push(add)
					}
				}
				for (let [id, [_prev, next]] of Object.entries(updated)) {
					// todo pointer as ephemeral data
					if (id == "pointer:pointer") continue
					if (id == "instance:instance") continue
					if (id.startsWith("instance_page_state")) continue
					let index = doc.records.findIndex(rec => rec.id == id)
					merge(doc.records[index], next)
				}
				for (let [id, _rm] of Object.entries(removed)) {
					for (let [index, rec] of doc.records.entries()) {
						if (rec.id == id) deleteAt(doc.records, index)
					}
				}
			})
		}
	}, [])

	let object = useCallback(
		(content: typeof file, path: (string | number)[]) => {
			return file?.records[+path[1]]
		},
		[]
	)

	let onremotechange = (payload: ContentHandleChangePayload<TldrawFile>) => {
		if (applyingLocal.current) return

		let patches = payload.patches
		let {before} = payload.patchInfo
		let doc = payload.doc
		let removals: RecordId<any>[] = []
		let puts: TLRecord[] = []
		// todo the rest of the operations:

		for (let patch of patches) {
			if (patch.action == "insert") {
				puts.push(insert(patch, object(doc, patch.path)))
			} else if (patch.action == "put") {
				puts.push(put(patch, object(doc, patch.path)))
			} else if (patch.action == "splice") {
				puts.push(splice(patch, object(doc, patch.path)))
			}
			if (patch.action == "del") {
				removals.push(object(before, patch.path).id)
			}
		}

		editor.store.mergeRemoteChanges(() => {
			editor.store.remove(removals)
			editor.store.put(puts.filter(x => x))
		})
	}

	useEffect(() => {
		let json = JSON.stringify(file)

		let serializedStore = parseTldrawJsonFile({
			json,
			schema: editor.store.schema,
		})

		if (serializedStore.ok) {
			applyingLocal.current = true
			editor.store.mergeRemoteChanges(() => {
				editor.store.loadStoreSnapshot(
					serializedStore.value.getStoreSnapshot()
				)
			})
			applyingLocal.current = false
		}

		let goodbye = editor.store.listen(onlocalchange, {
			scope: "document",
			source: "user",
		})
		return () => {
			goodbye()
		}
	}, [])

	useEffect(() => {
		props.handle.addListener("change", onremotechange)
		return () => {
			props.handle.removeListener("change", onremotechange)
		}
	}, [props.handle])

	useLayoutEffect(() => {
		setTimeout(() => {
			let container = editor.getContainer()
			if (!container) return

			let rect = container.getBoundingClientRect()

			let next = new Box(
				rect.left || rect.x,
				rect.top || rect.y,
				Math.max(rect.width, 1),
				Math.max(rect.height, 1)
			)

			editor.updateViewportScreenBounds(next)
		})
	})

	return null
}

function ActionsMenu() {
	return null
}

function TldrawEditorView(props: {handle: DocHandle<TldrawFile>}) {
	return (
		<Tldraw
			inferDarkMode
			components={{ActionsMenu}}
			options={{maxPages: 1}}
			autoFocus={true}>
			<TldrawInner {...props} />
		</Tldraw>
	)
}

import css from "@tldraw/tldraw/tldraw.css"
import type {AutomergeUrl, DocHandle} from "@automerge/automerge-repo/slim"

type Props<T> = {
	handle: DocHandle<T>
	cleanup(fn: () => void): void
	setName(name: string): void
	shadow: ShadowRoot
}

export default function render(props: Props<TldrawFile>) {
	const root = createRoot(props.shadow)
	const style = new CSSStyleSheet()
	style.replaceSync(css)
	props.shadow.adoptedStyleSheets = [style]
	root.render(<TldrawEditorView handle={props.handle} />)
	props.cleanup(() => {
		root.unmount()
	})
}

export function useDocument<T>(
	handle: DocHandle<T>
): [
	Doc<T> | undefined,
	(changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => void,
] {
	const handleRef = useRef<DocHandle<T> | null>(handle)
	if (handle !== handleRef.current) {
		handleRef.current = handle
	}

	// a state value we use to trigger a re-render
	const [, setGeneration] = useState(0)
	const rerender = () => setGeneration(v => v + 1)

	useEffect(() => {
		if (!handle) {
			return
		}

		handleRef.current = handle
		handle
			.doc()
			.then(() => {
				rerender()
			})
			.catch(e => console.error(e))

		handle.on("change", rerender)
		handle.on("delete", rerender)
		const cleanup = () => {
			handle.removeListener("change", rerender)
			handle.removeListener("delete", rerender)
		}

		return cleanup
	}, [handle])

	const changeDoc = useCallback(
		(changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => {
			if (!handle) return
			handle.change(changeFn, options)
		},
		[handle]
	)
	return [handle.doc(), changeDoc] as const
}
