import type {Repo} from "@automerge/automerge-repo"

type WithoutId<DocType extends lb.AnyDocument> = Omit<DocType, "id">
type WithWriteableId<DocType extends lb.AnyDocument> = WithoutId<DocType> & {
	id: DocType["id"]
}

export default function createDocumentHandle<DocType extends lb.AnyDocument>(
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
