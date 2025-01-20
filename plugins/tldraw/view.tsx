// things i'll need to make available in @littlebook/plugin
import "../../web/src/types.ts"
import type {ContentHandleChangePayload} from "../../web/src/types.ts"

import {
	ContentViewElement,
	type ContentViewComponent,
} from "../../web/src/files/contents/view-registry.ts"

import {
	useCallback,
	useEffect,
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

function TldrawInner(props: lb.ContentViewProps<TldrawFile>) {
	let editor = useEditor()
	let applyingLocal = useRef(false)

	let onlocalchange = useCallback((history: HistoryEntry<TLRecord>) => {
		let source = history.source

		if (source == "user") {
			let {added, removed, updated} = history.changes

			props.change(doc => {
				for (let add of Object.values(added)) {
					if (!doc.value.records.find(r => r.id == add.id)) {
						doc.value.records.push(add)
					}
				}
				for (let [id, [_prev, next]] of Object.entries(updated)) {
					// todo pointer as ephemeral data
					if (id == "pointer:pointer") continue
					if (id == "instance:instance") continue
					if (id.startsWith("instance_page_state")) continue
					let index = doc.value.records.findIndex(rec => rec.id == id)
					merge(doc.value.records[index], next)
				}
				for (let [id, _rm] of Object.entries(removed)) {
					for (let [index, rec] of doc.value.records.entries()) {
						if (rec.id == id) doc.value.records.deleteAt(index)
					}
				}
			})
		}
	}, [])

	let object = useCallback(
		(content: typeof props.content, path: (string | number)[]) => {
			return content.value.records[+path[2]]
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
			editor.store.put(puts)
		})
	}

	useEffect(() => {
		let json = JSON.stringify(props.content.value)

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

let TldrawEditorView: ContentViewComponent<
	TldrawFile,
	FunctionComponent<lb.ContentViewProps<TldrawFile>>
> = props => {
	if (!props.content.value) {
		return <div>waiting for value</div>
	}

	return (
		<Tldraw
			inferDarkMode
			components={{ActionsMenu}}
			options={{maxPages: 1}}
			autoFocus={true}
			assetUrls={getAssetUrls({baseUrl: "/tldraw-assets"})}>
			<TldrawInner {...props} />
		</Tldraw>
	)
}

import css from "@tldraw/tldraw/tldraw.css"

export default class TldrawEditorElement extends ContentViewElement<TldrawFile> {
	shadowRoot = this.attachShadow({
		mode: "open",
		delegatesFocus: true,
	})
	root = createRoot(this.shadowRoot!)

	constructor() {
		super()
		let style = document.createElement("style")
		style.textContent = css
		this.shadowRoot.append(style)
	}

	props = () => ({
		handle: this.handle,
		content: this.content,
		file: this.file,
		change: this.change,
	})
	connectedCallback() {
		this.root.render(<TldrawEditorView {...this.props()} />)
	}
	disconnectedCallback() {
		this.root.unmount()
	}
}
