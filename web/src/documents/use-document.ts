import {type Resource, createEffect, createResource, on} from "solid-js"

import type {ChangeFn, Doc} from "@automerge/automerge-repo"
import useHandle from "../automerge/use-handle"

type UseDocument<T extends lb.AnyDocument> = [
	Resource<Doc<T> | undefined>,
	(change: ChangeFn<T>) => void,
]

export default function useDocument<T extends lb.AnyDocument>(
	id: () => T["id"] | undefined,
): UseDocument<T> {
	const handle = useHandle(id)

	const [doc, control] = createResource(() => handle()?.doc())

	createEffect(
		on([handle], () => {
			handle()?.on("change", control.refetch)
			handle()?.on("delete", control.refetch)
			control.refetch()
		}),
	)

	createEffect(() => {
		id()
		control.mutate(undefined)
	})

	return [
		doc,
		(change: ChangeFn<T>) => {
			handle()?.change(change)
		},
	]
}
