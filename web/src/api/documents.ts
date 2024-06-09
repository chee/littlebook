import type {ChangeFn} from "@automerge/automerge"
import type {DocHandle, Repo} from "@automerge/automerge-repo"

type WithoutId<DocType extends lb.AnyDocument> = Omit<DocType, "id">
type WithWriteableId<DocType extends lb.AnyDocument> = WithoutId<DocType> & {
	id: DocType["id"]
}

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

type DocumentChangeFn<DocType extends lb.AnyDocument> = ChangeFn<DocType>

export class Document<DocType extends lb.AnyDocument> {
	#doc?: DocType

	constructor(private readonly handle: DocHandle<DocType>) {
		this.#doc = handle.docSync()!
		handle.doc().then(doc => {
			// todo oh i am not thinking about the fact that this can sometimes be
			// undefined, and i probably should haha
			this.#doc = doc!
		})
		handle.on("change", this.setDoc)
		handle.on("delete", this.setDoc)
	}

	private setDoc = () => {
		this.#doc = this.handle.docSync()!
	}

	destroy() {
		this.handle.off("change", this.setDoc)
		this.handle.off("delete", this.setDoc)
	}

	get ready() {
		return this.handle.isReady()
	}

	get doc(): Readonly<DocType> {
		// todo
		return this.#doc
	}

	get id() {
		return this.doc?.id
	}

	change(fn: DocumentChangeFn<DocType>): void {
		this.handle.change(fn)
	}
}

export class NamedDocument<
	DocType extends lb.NamedDocument,
> extends Document<DocType> {
	get name() {
		return this.doc?.name
	}

	set name(name) {
		this.change(doc => {
			doc.name = name
		})
	}
}

export default function createDocumentsAPI(_repo: Repo) {}
