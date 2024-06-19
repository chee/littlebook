import type {Repo} from "@automerge/automerge-repo"
import type {AutomergeList} from "../types.ts"
export type WithoutId<DocType extends lb.AnyDocument> = Omit<DocType, "id">
export type WithWriteableId<DocType extends lb.AnyDocument> =
	WithoutId<DocType> & {
		id: DocType["id"]
	}
export type DocTemplate<Doctype extends lb.AnyDocument> = Partial<
	WithoutId<Doctype>
>

export function createDocumentHandle<DocType extends lb.AnyDocument>(
	repo: Repo,
	doc: WithoutId<DocType>,
) {
	const handle = repo.create<DocType>({
		...doc,
		id: "" as DocType["id"],
	} as DocType)
	handle.change((doc: WithWriteableId<DocType>) => {
		doc.id = handle.documentId as DocType["id"]
	})
	return handle
}

export function getDocumentHandle<DocType extends lb.AnyDocument>(
	repo: Repo,
	id: DocType["id"],
) {
	return repo.find<DocType>(id)
}

export function addItemToDocument<
	DocType extends lb.AnyDocument & {items: AutomergeList<string>},
>(id: DocType["items"][number]) {
	return (doc: DocType) => {
		console.info(`adding item ${id} to ${doc.type} ${doc.id}`)
		doc.items.push(id)
	}
}

export function removeItemFromDocument<
	DocType extends lb.AnyDocument & {items: AutomergeList<string>},
>(id: DocType["items"][number]) {
	return (doc: DocType) => {
		const index = doc.items.indexOf(id)
		doc.items.deleteAt(index)
	}
}

export default function createDocumentsAPI(repo: Repo) {
	return {
		createHandle: createDocumentHandle.bind(null, repo),
		getHandle: getDocumentHandle.bind(null, repo),
	}
}
