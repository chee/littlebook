// things i'll need to make available in @littlebook/plugin
import "../../web/src/types.ts"
import type {ContentHandleChangePayload} from "../../web/src/types.ts"

import {
	ContentViewElement,
	type ContentViewComponent,
} from "../../web/src/files/contents/content-view.ts"

import {
	useCallback,
	useEffect,
	Suspense,
	lazy,
	type FunctionComponent,
	useRef,
	useLayoutEffect,
} from "react"

import type {TldrawFile} from "./shared.ts"
import {createRoot} from "react-dom/client"

import {Box, useEditor} from "@tldraw/editor"
import {parseTldrawJsonFile, Tldraw} from "tldraw"
import type {
	InsertPatch,
	PutPatch,
	SpliceTextPatch,
} from "@automerge/automerge/next"

import {getAssetUrls} from "@tldraw/assets/selfHosted"
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

function TldrawInner(props: lb.ContentEditorViewProps<TldrawFile>) {
	const editor = useEditor()
	const applyingLocal = useRef(false)

	const onlocalchange = useCallback((history: HistoryEntry<TLRecord>) => {
		const source = history.source

		if (source == "user") {
			const {added, removed, updated} = history.changes

			applyingLocal.current = true
			props.change(doc => {
				for (const add of Object.values(added)) {
					doc.value.records.push(add)
				}
				for (const [id, [_prev, next]] of Object.entries(updated)) {
					// todo pointer as ephemeral data
					if (id == "pointer:pointer") continue
					if (id == "instance:instance") continue
					if (id.startsWith("instance_page_state")) continue
					const index = doc.value.records.findIndex(rec => rec.id == id)
					doc.value.records[index] = next
				}
				for (const [id, _rm] of Object.entries(removed)) {
					for (const [index, rec] of doc.value.records.entries()) {
						if (rec.id == id) doc.value.records.deleteAt(index)
					}
				}
			})
			applyingLocal.current = false
		}
	}, [])

	const object = useCallback(
		(doc: typeof props.doc, path: (string | number)[]) => {
			return doc.value.records[+path[2]]
		},
		[],
	)

	const onremotechange = (payload: ContentHandleChangePayload<TldrawFile>) => {
		if (applyingLocal.current) return

		const patches = payload.patches
		const {before} = payload.patchInfo
		const doc = payload.doc
		const removals: RecordId<any>[] = []
		const puts: TLRecord[] = []
		// todo the rest of the operations:
		//
		for (const patch of patches) {
			const {path, action} = patch
			if (action == "insert") {
				puts.push(insert(patch, object(doc, path)))
			} else if (action == "put") {
				puts.push(put(patch, object(doc, path)))
			} else if (action == "splice") {
				puts.push(splice(patch, object(doc, path)))
			}
			if (action == "del") {
				removals.push(object(before, path).id)
			}
		}

		editor.store.mergeRemoteChanges(() => {
			editor.store.remove(removals)
			editor.store.put(puts)
		})
	}

	useEffect(() => {
		const json = JSON.stringify(props.value)

		const serializedStore = parseTldrawJsonFile({
			json,
			schema: editor.store.schema,
		})

		if (serializedStore.ok) {
			applyingLocal.current = true
			editor.store.mergeRemoteChanges(() => {
				editor.store.loadStoreSnapshot(serializedStore.value.getStoreSnapshot())
			})
			applyingLocal.current = false
		}

		const goodbye = editor.store.listen(onlocalchange, {
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
			const container = editor.getContainer()
			if (!container) return

			const rect = container.getBoundingClientRect()

			const next = new Box(
				rect.left || rect.x,
				rect.top || rect.y,
				Math.max(rect.width, 1),
				Math.max(rect.height, 1),
			)

			editor.updateViewportScreenBounds(next)
		})
	})

	return null
}

function ActionsMenu() {
	return null
}

const TldrawEditorView: ContentViewComponent<
	TldrawFile,
	FunctionComponent<lb.ContentEditorViewProps<TldrawFile>>
> = ({value, change, ...props}) => {
	if (!value) {
		return <div>waiting for value</div>
	}

	return (
		<Tldraw
			inferDarkMode
			components={{ActionsMenu}}
			options={{maxPages: 1}}
			autoFocus={true}
			assetUrls={getAssetUrls({baseUrl: "/tldraw-assets"})}>
			<TldrawInner value={value} change={change} {...props} />
		</Tldraw>
	)
}

import "@tldraw/tldraw/tldraw.css"

export default class TldrawEditorElement extends ContentViewElement<TldrawFile> {
	shadowRoot = this.attachShadow({
		mode: "open",
		delegatesFocus: true,
	})
	root = createRoot(this.shadowRoot!)

	constructor() {
		super()
		const link = document.createElement("link")
		link.rel = "stylesheet"
		link.href = import.meta.resolve("./node_modules/@tldraw/tldraw/tldraw.css")
		this.shadowRoot.append(link)
	}

	props = () => ({
		value: this.value,
		change: this.change,
		handle: this.handle,
		doc: this.doc,
		file: this.file,
	})
	connectedCallback() {
		this.root.render(<TldrawEditorView {...this.props()} />)
	}
	disconnectedCallback() {
		this.root.unmount()
	}
}
