import type {ChangeFn} from "@automerge/automerge"
import type {DocHandle} from "@automerge/automerge-repo"

type DocumentChangeFn<DocType extends lb.AnyDocument> = ChangeFn<DocType>

export default class Document<DocType extends lb.AnyDocument> {
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
