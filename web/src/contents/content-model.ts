import Document from "../documents/document-model.ts"

export default class Content<Model extends lb.AnyContent> extends Document<
	lb.Content<Model>
> {
	get contentType() {
		return this.doc.contentType
	}
	get value(): Readonly<Model> {
		return this.doc.value
	}
}
