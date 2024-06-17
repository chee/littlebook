import {
	createEffect,
	createMemo,
	createResource,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js"
import {useRepo} from "./use-repo"
import type {ChangeFn, Doc, DocHandle} from "@automerge/automerge-repo"
import {useAutomerge} from "./auth/use-automerge"

export default function useDocument<T extends lb.AnyDocument>(
	id?: T["id"],
): [doc: () => Doc<T> | undefined, (fn: ChangeFn<T>) => void] {
	const automerge = useAutomerge()
	const repo = createMemo(() => automerge()?.repo)
	const [handle, setHandle] = createSignal<DocHandle<T> | undefined>(
		id && repo()?.find<T>(id),
	)
	const [doc] = createResource(() => handle()?.doc())
	const reset = () => setHandle(() => handle())

	createEffect(() => {})

	onMount(() => {
		handle()?.on("change", reset)
		handle()?.on("delete", reset)
	})

	onCleanup(() => {
		handle()?.off("change", reset)
		handle()?.off("delete", reset)
	})

	return [
		doc,
		(fn: ChangeFn<T>) => {
			handle()?.change(fn)
			console.log("that worked")
		},
	]
}
