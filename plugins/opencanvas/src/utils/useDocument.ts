import type {DocHandle, Doc, ChangeFn} from "@automerge/vanillajs"
import {useCallback, useEffect, useRef, useState} from "react"

export function useDocument<T>(handle: DocHandle<T>) {
	const handleRef = useRef<DocHandle<T> | null>(handle)
	if (handle !== handleRef.current) {
		handleRef.current = handle
	}

	// a state value we use to trigger a re-render
	const [, setGeneration] = useState(0)
	const rerender = () => setGeneration(v => v + 1)

	useEffect(() => {
		if (!handle) {
			return
		}

		handleRef.current = handle
		handle
			.doc()
			.then(() => {
				rerender()
			})
			.catch((e: Error) => console.error(e))

		handle.on("change", rerender)
		handle.on("delete", rerender)

		const cleanup = () => {
			handle.removeListener("change", rerender)
			handle.removeListener("delete", rerender)
		}

		return cleanup
	}, [handle])

	const changeDoc = useCallback(
		(changeFn: ChangeFn<T>) => {
			if (!handle) return
			handle.change(changeFn)
		},
		[handle]
	)
	return [handle.doc() as Doc<T>, changeDoc] as const
}
