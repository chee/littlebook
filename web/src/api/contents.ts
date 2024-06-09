import {Document, createDocumentHandle} from "./documents.ts"
import type {Repo} from "@automerge/automerge-repo"

export class Content<Model extends lb.AnyContent> extends Document<
	lb.Content<Model>
> {
	get contentType() {
		return this.doc.contentType
	}
	get value(): Readonly<Model> {
		return this.doc.value
	}
}

export function createContentHandle(
	repo: Repo,
	content: Omit<lb.Content<any>, "id" | "type">,
) {
	return createDocumentHandle<lb.Content<any>>(repo, {
		type: "content",
		contentType: content.contentType,
		value: content.value,
	})
}

export default function createContentsAPI() {
	return {
		convert<
			From extends lb.UniformTypeIdentifier,
			To extends lb.UniformTypeIdentifier,
		>(from: lb.Content<{contentType: From}>, to: To) {
			return {
				id: from.id,
				type: "content",
				contentType: to,
				value: contentTypeRegistry
					.get(to)
					.creator.fromBytes(
						contentTypeRegistry
							.get(from.contentType)
							.creator.toBytes(from.value),
					) as To,
			} satisfies lb.Content<To>
		},
	}
}
