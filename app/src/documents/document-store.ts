import type {
	AutomergeUrl,
	ChangeFn,
	DocHandle,
	DocHandleChangePayload,
	Patch,
} from "@automerge/automerge-repo"
import type {AutomergeValue} from "@automerge/automerge/next"
import {apply, fromAutomerge} from "cabbages"
import {createResource, onCleanup, type Accessor} from "solid-js"
import {createStore, produce} from "solid-js/store"
import repo from "../repo/create.ts"

export type AutomergeObject = Record<string, AutomergeValue>

export function autoproduce<T>(patches: Patch[]) {
	return produce<T>(doc => {
		for (const patch of patches) {
			const [path, range, val] = fromAutomerge(patch)
			apply(path, doc, range, val)
		}
	})
}

export function createDocumentProjection<T extends object = AutomergeObject>(
	handle: Accessor<DocHandle<T>>
) {
	const [doc, set] = createStore<T>(handle()?.docSync())
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle().on("change", patch)
	onCleanup(() => handle().off("change", patch))
	return doc
}

export function createDocumentStore<T extends object = AutomergeObject>(
	handle: Accessor<DocHandle<T>>
) {
	const [doc, set] = createStore<T>(handle()?.docSync())
	function patch(payload: DocHandleChangePayload<T>) {
		set(autoproduce(payload.patches))
	}
	handle().on("change", patch)
	onCleanup(() => handle().off("change", patch))
	return [doc, (change: ChangeFn<T>) => handle().change(change)] as const
}

export function useDocument<T extends object = AutomergeObject>(
	id: Accessor<AutomergeUrl>
) {
	const [handle] = createResource(async () => {
		const handle = repo.find<T>(id())
		await handle.whenReady()
		return handle
	})

	const [doc, store] = createDocumentStore(handle)

	return [doc, store] as const
}
