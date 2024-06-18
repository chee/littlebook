import {createEffect, createResource, on, onCleanup, onMount} from "solid-js"

import type {ChangeFn, Doc} from "@automerge/automerge-repo"
import useHandle from "./use-handle"

export default function useDocument<T extends lb.AnyDocument>(
	id: () => T["id"] | undefined,
): [doc: () => Doc<T> | undefined, (fn: ChangeFn<T>) => void] {
	const handle = useHandle(id)

	const [doc, control] = createResource(() => handle()?.doc())

	createEffect(
		on([handle], () => {
			handle()?.on("change", control.refetch)
			handle()?.on("delete", control.refetch)
			control.refetch()
		}),
	)

	return [
		doc,
		(fn: ChangeFn<T>) => {
			handle()?.change(fn)
			control.refetch()
		},
	]
}
