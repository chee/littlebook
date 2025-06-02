import useRepo from ":/lib/sync/useRepo.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import {makeDocumentProjection} from "solid-automerge"
import {createEffect, type Accessor} from "solid-js"
import {createMutable} from "solid-js/store"

export default function useMutableDocument<T>(
	handle: Accessor<DocHandle<T>> | DocHandle<T>,
) {
	if (typeof handle == "function") {
		handle = handle()
	}
	const repo = useRepo()
	const projection = makeDocumentProjection(handle)
	const mutable = createMutable(projection)
	createEffect(() => {})
}
