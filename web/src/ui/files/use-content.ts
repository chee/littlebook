import {
	type Resource,
	createEffect,
	createResource,
	on,
	onCleanup,
} from "solid-js"

import type {ChangeFn, Doc, DocHandle} from "@automerge/automerge-repo"
import {useAutomerge} from "../automerge/use-automerge.ts"

type UseContent<T extends lb.AnyContent> = [
	Resource<Doc<lb.Content<T>> | undefined>,
	(change: ChangeFn<lb.Content<T>>) => void,
	() => DocHandle<Doc<lb.Content<T>>> | undefined,
]

export default function useContent<T extends lb.AnyContent>(
	id: () => lb.ContentId | undefined,
): UseContent<T> {
	const automerge = useAutomerge()

	const handle = () => id() && automerge()?.repo.find<lb.Content<T>>(id()!)

	const [doc, control] = createResource(() => handle()?.doc())

	createEffect(
		on([handle], () => {
			handle()?.on("change", control.refetch)
			handle()?.on("delete", control.refetch)
			control.refetch()
			onCleanup(() => {
				handle()?.off("change", control.refetch)
				handle()?.off("delete", control.refetch)
				handle()?.removeAllListeners()
				control.mutate(undefined)
			})
		}),
	)

	createEffect(
		on([id], () => {
			id()
			control.mutate(undefined)
			// doc.latest = undefined
			handle()?.removeAllListeners()
		}),
	)

	return [
		doc,
		(change: ChangeFn<lb.Content<T>>) => {
			handle()?.change(change)
		},
		handle,
	]
}
