// import {
// 	createComputed,
// 	createEffect,
// 	createMemo,
// 	createResource,
// 	on,
// 	onCleanup,
// 	useContext,
// } from "solid-js"
// import type {
// 	AnyDocumentId,
// 	ChangeFn,
// 	Doc,
// 	DocHandle,
// 	DocHandleChangePayload,
// } from "@automerge/automerge-repo"
// import type {Accessor, Resource, Signal} from "solid-js"
// import {
// 	createStore,
// 	produce,
// 	unwrap,
// 	type SetStoreFunction,
// 	type Store,
// } from "solid-js/store"
// import type {Patch} from "@automerge/automerge"
// import {apply, fromAutomerge} from "cabbages"
// import type {Repo} from "@automerge/automerge-repo"
// import {RepoContext} from "automerge-repo-solid-primitives"
// import {access, MaybeAccessor} from "@solid-primitives/utils"

// /**
//  * Get a {@link DocHandle} from an AutomergeURL.
//  */
// export function useHandle<T>(
// 	id: () => AnyDocumentId | undefined,
// 	options?: BaseOptions
// ): Resource<DocHandle<T> | undefined> {
// 	const contextRepo = useContext(RepoContext)
// 	if (!options?.repo && !contextRepo) {
// 		throw new Error("use outside <RepoContext> requires options.repo")
// 	}
// 	const repo = (options?.repo || contextRepo)!
// 	const [handle, {mutate}] = createResource(id, id => {
// 		if (!id) return
// 		const handle = repo.find<T>(id)
// 		if (handle.isReady()) return handle
// 		return handle.whenReady().then(() => handle)
// 	})
// 	createEffect(on(id, id => id || mutate()))
// 	return handle
// }

// export interface BaseOptions {
// 	repo?: Repo
// }
// export type DocumentStore<T> = [Store<Doc<T>>, (fn: ChangeFn<T>) => void]

// export function autoproduce<T>(patches: Patch[]) {
// 	return produce<T>(doc => {
// 		for (const patch of patches) {
// 			const [path, range, val] = fromAutomerge(patch)
// 			apply(path, doc, range, val)
// 		}
// 	})
// }

// export function autoupdate<T>(patches: Patch[], update: SetStoreFunction<T>) {
// 	for (const patch of patches) {
// 		update(
// 			produce(doc => {
// 				const [path, range, val] = fromAutomerge(patch)
// 				apply(path, doc, range, val)
// 			})
// 		)
// 	}
// }

// export function createDocumentProjection<T>(
// 	handle: MaybeAccessor<DocHandle<T>>
// ) {
// 	const [doc, set] = createStore<Doc<T>>(
// 		(access(handle)?.docSync() as T) ?? ({} as T)
// 	)
// 	function patch(payload: DocHandleChangePayload<T>) {
// 		set(autoproduce(payload.patches))
// 	}

// 	createComputed(() => {
// 		const h = access(handle)
// 		if (h) {
// 			set(h.docSync() as T)
// 			h.on("change", patch)
// 			h.whenReady().then(() => {
// 				set(h.docSync() as T)
// 			})
// 			onCleanup(() => h.off("change", patch))
// 		}
// 	})
// 	return doc
// }

// export function useDocumentStore<T>(
// 	url: MaybeAccessor<AnyDocumentId>,
// 	options?: BaseOptions
// ) {
// 	const contextRepo = useContext(RepoContext)

// 	if (!options?.repo && !contextRepo) {
// 		throw new Error("use outside <RepoContext> requires options.repo")
// 	}

// 	const repo = (options?.repo || contextRepo)!
// 	const handle = createMemo(() => repo.find<T>(access(url)))
// 	const projection = () => createDocumentProjection(handle)

// 	const [doc] = createStore(projection())

// 	return [
// 		doc,
// 		// eslint-disable-next-line solid/reactivity
// 		(change: ChangeFn<T>) => handle().change(change),
// 		handle,
// 	] as const
// }
