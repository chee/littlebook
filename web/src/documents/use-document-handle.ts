import type {AnyDocumentId, DocHandle} from "@automerge/automerge-repo"
import {useAutomerge} from "../automerge/use-automerge.ts"

export default function useDocumentHandle<T extends lb.AnyDocument>(
	id: () => T["id"] | undefined,
): () => DocHandle<T> | undefined {
	let automerge = useAutomerge()
	let handle = () => id() && automerge.repo.find<T>(id()!)

	return handle
}

export function useHandle<T>(
	id: () => AnyDocumentId,
): () => DocHandle<T> | undefined {
	let automerge = useAutomerge()
	let handle = () => id() && automerge.repo.find<T>(id()!)

	return handle
}
