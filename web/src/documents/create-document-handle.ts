import type {Repo} from "@automerge/automerge-repo"
import type {lb} from "../types.ts"

export type WithoutId<DocType extends lb.AnyDocument> = Omit<DocType, "id">
export type WithWriteableId<DocType extends lb.AnyDocument> =
	WithoutId<DocType> & {
		id: DocType["id"]
	}
export type DocTemplate<Doctype extends lb.AnyDocument> = Partial<
	WithoutId<Doctype>
>

export default function createDocumentHandle<DocType extends lb.AnyDocument>(
	repo: Repo,
	doc: WithoutId<DocType>,
) {
	let handle = repo.create<DocType>({
		...doc,
		id: "" as DocType["id"],
	} as DocType)
	handle.change((doc: WithWriteableId<DocType>) => {
		doc.id = handle.documentId as DocType["id"]
	})
	return handle
}
