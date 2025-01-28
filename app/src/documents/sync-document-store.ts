import type {
	ChangeFn,
	DocHandle,
	DocHandleChangePayload,
	Patch,
} from "@automerge/automerge-repo"
import type {AutomergeValue} from "@automerge/automerge/next"
import {apply, fromAutomerge} from "cabbages"
import {onCleanup} from "solid-js"
import {createStore, produce} from "solid-js/store"

export type AutomergeObject = Record<string, AutomergeValue>

export function autoproduce<T>(patches: Patch[]) {
	return produce<T>(doc => {
		for (const patch of patches) {
			const [path, range, val] = fromAutomerge(patch)
			apply(path, doc, range, val)
		}
	})
}

export function makeDocumentProjection<T extends object = AutomergeObject>(
	handle: DocHandle<T>
) {
	const [doc, set] = createStore<T>(handle.docSync()!)
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle.on("change", patch)
	onCleanup(() => handle.off("change", patch))
	return doc
}

export function createDocumentStore<T extends object = AutomergeObject>(
	handle: DocHandle<T>
) {
	const [doc, set] = createStore<T>(handle.docSync()!)
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle.on("change", patch)
	onCleanup(() => handle.off("change", patch))
	return [doc, (change: ChangeFn<T>) => handle.change(change)] as const
}
