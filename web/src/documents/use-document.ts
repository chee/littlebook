import {type Resource, createEffect, createResource, on} from "solid-js"

import type {ChangeFn, Doc, DocHandle} from "@automerge/automerge-repo"
import useHandle from "../automerge/use-handle"
import {useAutomerge} from "../automerge/use-automerge.ts"

type UseDocument<T extends lb.AnyDocument> = [
	Resource<Doc<T> | undefined>,
	(change: ChangeFn<T>) => void,
	() => DocHandle<T> | undefined,
]

export default function useDocument<T extends lb.AnyDocument>(
	id: () => T["id"] | undefined,
): UseDocument<T> {
	const automerge = useAutomerge()

	const handle = useHandle(id)

	const [doc, control] = createResource(() => handle()?.doc())

	createEffect(
		on([handle], () => {
			handle()?.on("change", control.refetch)
			handle()?.on("delete", control.refetch)
			handle()?.broadcast({
				hello: automerge.repo.networkSubsystem.peerId,
			})
			control.refetch()
		}),
	)

	createEffect(() => {
		id()
		handle()?.broadcast({
			goodbye: automerge.repo.networkSubsystem.peerId,
		})
		control.mutate(undefined)
	})

	return [
		doc,
		(change: ChangeFn<T>) => {
			handle()?.change(change)
		},
		handle,
	]
}
