import {
	type Resource,
	createEffect,
	createResource,
	on,
	onCleanup,
} from "solid-js"

import type {ChangeFn, Doc, DocHandle} from "@automerge/automerge-repo"
import {useAutomerge} from "../../automerge/use-automerge.ts"

type UseContent<T extends lb.AnyContentValue> = [
	Resource<Doc<lb.Content<T>> | undefined>,
	(change: ChangeFn<lb.Content<T>>) => void,
	() => DocHandle<Doc<lb.Content<T>>> | undefined,
]

export default function useContent<T extends lb.AnyContentValue>(
	id: () => lb.ContentId | undefined,
): UseContent<T> {
	let automerge = useAutomerge()

	let handle = () => id() && automerge.repo.find<lb.Content<T>>(id()!)

	let [doc, control] = createResource(() =>
		handle()
			?.whenReady()
			.then(() => handle()?.doc()),
	)

	createEffect(
		on([handle], () => {
			handle()?.on("change", control.refetch)
			handle()?.on("delete", control.refetch)
			control.refetch()
			onCleanup(() => {
				handle()?.off("change", control.refetch)
				handle()?.off("delete", control.refetch)
				handle()?.removeListener("change", control.refetch)
				handle()?.removeListener("delete", control.refetch)
				control.mutate(undefined)
			})
		}),
	)

	createEffect(
		on([id], () => {
			id()
			control.mutate(undefined)
			handle()?.removeListener("change", control.refetch)
			handle()?.removeListener("delete", control.refetch)
		}),
	)

	return [
		doc,
		(change: ChangeFn<lb.Content<T>>) => {
			handle()!.change(change)
		},
		handle,
	]
}
