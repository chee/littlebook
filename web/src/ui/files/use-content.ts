import {type Resource, createEffect, createResource, on} from "solid-js"

import type {ChangeFn, Doc} from "@automerge/automerge-repo"
import useHandle from "../automerge/use-handle"

type UseContent<T extends lb.Content<any>> = [
	Resource<Doc<T>["value"] | undefined>,
	(change: ChangeFn<T["value"]>) => void,
]

export default function useContent<T extends lb.Content<any>>(
	id: () => T["id"] | undefined,
): UseContent<T> {
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
		(change: ChangeFn<T["value"]>) => {
			handle()?.change(content => {
				content.value = change(content.value)
			})
		},
	]
}
