import {createEffect, createMemo, createSignal} from "solid-js"
import {useRepo} from "./use-repo"
import type {ChangeFn, Doc, DocHandle} from "@automerge/automerge-repo"

export default function useDocument<T extends lb.AnyDocument>(
	id?: T["id"],
): [doc: () => Doc<T> | undefined, (fn: ChangeFn<T>) => void] {
	const repo = useRepo()
	const [handle, setHandle] = createSignal<DocHandle<T> | null>(
		id ? repo.find<T>(id) : null,
	)
	const doc = createMemo(() => handle()?.docSync())

	createEffect(() => {
		handle()?.on("change", () => {
			setHandle(handle())
		})
		handle()?.on("delete", () => {
			setHandle(handle())
		})
	})

	return [
		doc,
		(fn: ChangeFn<T>) => {
			handle()?.change(fn)
			console.log("that worked")
		},
	]
}
