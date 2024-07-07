import {
	type Resource,
	createEffect,
	createResource,
	on,
	onCleanup,
	onMount,
} from "solid-js"

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
		on([handle], ([prev]) => {
			function up() {
				handle()?.on("change", control.refetch)
				handle()?.on("delete", control.refetch)
				handle()?.broadcast("hello")
			}
			function down() {
				prev?.removeListener("change", control.refetch)
				prev?.removeListener("delete", control.refetch)
				prev?.broadcast("goodbye")
			}
			if (prev != handle()) {
				down()
				up()
			}
			onMount(() => {
				up()
				control.refetch()
			})
			onCleanup(() => {
				down()
			})
		}),
	)

	createEffect(
		on([id], ([previousID]) => {
			if (previousID != id()) {
				handle()?.broadcast({
					goodbye: automerge.repo.networkSubsystem.peerId,
				})
				control.mutate(undefined)
			}
		}),
	)

	return [
		doc,
		(change: ChangeFn<T>) => {
			handle()?.change(change)
		},
		handle,
	]
}
