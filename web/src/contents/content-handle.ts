import createDocumentHandle from "../documents/document-handle.ts"
import type {Repo} from "@automerge/automerge-repo"

export default function createContentHandle(
	repo: Repo,
	content: Omit<lb.Content<any>, "id" | "type">,
) {
	return createDocumentHandle<lb.Content<any>>(repo, {
		type: "content",
		contentType: content.contentType,
		value: content.value,
	})
}
