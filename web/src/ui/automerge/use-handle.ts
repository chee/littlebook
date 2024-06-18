import type {DocHandle} from "@automerge/automerge-repo"
import {useAutomerge} from "./auth/use-automerge"

export default function useHandle<T extends lb.AnyDocument>(
	id: () => T["id"] | undefined,
): () => DocHandle<T> | undefined {
	const automerge = useAutomerge()
	const handle = () => id() && automerge()?.repo.find<T>(id()!)
	return handle
}
