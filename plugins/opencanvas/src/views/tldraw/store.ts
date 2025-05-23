import type {OCIFCore04} from "../../types/v0.4.ts"
import {useDocument} from "../../utils/useDocument.ts"
import type {DocHandle, DocHandleChangePayload} from "@automerge/vanillajs"
import {
	createTLStore,
	defaultShapeUtils,
	type HistoryEntry,
	type TLRecord,
	loadSnapshot,
	type TLStoreSnapshot,
} from "@tldraw/tldraw"
import {useState, useEffect} from "react"

export function useStore(handle: DocHandle<OCIFCore04>) {
	const [file, change] = useDocument(handle)

	const [store] = useState(() => {
		const store = createTLStore({
			shapeUtils: [...defaultShapeUtils],
		})
		return store
	})

	useEffect(() => {
		const unsubs: (() => void)[] = []

		let preventPatchApplications = false
		function writeToOpenCanvas({changes}: HistoryEntry<TLRecord>) {
			preventPatchApplications = true
			// props.handle.change((doc) => {
			//   applyTLStoreChangesToAutomerge(doc, changes)
			// })
			preventPatchApplications = false
		}

		//  unsubs.push(
		//    store.listen(syncStoreChangesToAutomergeDoc, {
		//      source: "user",
		//      scope: "document",
		//    })
		//  )

		/* Automerge to TLDraw */
		const readFromOpenCanvas = ({patches}: DocHandleChangePayload<any>) => {
			if (preventPatchApplications) return
			// applyAutomergePatchesToTLStore(patches, store)
		}
		//  handle.on("change", syncAutomergeDocChangesToStore)
		//  unsubs.push(() => handle.off("change", syncAutomergeDocChangesToStore))

		const doc = handle.doc()
		if (!doc) throw new Error("Document not found")
		if (!doc.store) throw new Error("Document store not initialized")

		store.mergeRemoteChanges(() => {
			loadSnapshot(store, {schema: {}, store: {}} as TLStoreSnapshot)
		})

		return () => {
			unsubs.forEach(fn => fn())
			unsubs.length = 0
		}
	}, [handle, store])

	return store
}
