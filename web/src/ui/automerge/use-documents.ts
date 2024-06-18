import type {Doc} from "@automerge/automerge-repo"
import useDocument from "./use-document"
import type {AutomergeList} from "../../types"
import {
	createEffect,
	createMemo,
	createResource,
	createSignal,
	on,
	onCleanup,
	onMount,
	untrack,
} from "solid-js"
import {useAutomerge} from "./auth/use-automerge"
import useHandle from "./use-handle"

export default function useDocuments<T extends lb.AnyDocument>(
	ids: () => T["id"][] | AutomergeList<T["id"]> | undefined,
) {
	const handles = () => ids()?.map(id => useHandle(() => id)())
	const [items, control] = createResource(async () => {
		return (
			handles() &&
			Promise.all(
				handles()!.map(async handle => {
					return handle?.doc()
				}),
			)
		)
	})
	createEffect(
		on([ids], () => {
			control.refetch()
		}),
	)
	return items
}
