import {createEffect, createResource, on} from "solid-js"
import type {AutomergeList} from "../types"

import useHandle from "./use-document-handle.ts"

export default function useDocuments<T extends lb.AnyDocument>(
	ids: () => T["id"][] | AutomergeList<T["id"]> | undefined,
) {
	let handles = () => ids()?.map(id => useHandle(() => id)())
	let [items, control] = createResource(async () => {
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
