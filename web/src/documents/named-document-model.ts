import Document from "./document-model.ts"

/* todo convert to mixin */

export default class NamedDocument<
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
