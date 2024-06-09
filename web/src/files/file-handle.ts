import type {Repo} from "@automerge/automerge-repo"
import createDocumentHandle from "../documents/document-handle.ts"

export default function createFileHandle(
	repo: Repo,
	fileTemplate: Partial<Omit<lb.File, "id">> & {content: lb.ContentId},
) {
	return createDocumentHandle<lb.File>(repo, {
		type: "file",
		name: fileTemplate.name || "",
		content: fileTemplate.content,
		note: "",
	})
}
