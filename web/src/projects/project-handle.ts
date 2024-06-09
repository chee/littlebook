import type {Repo} from "@automerge/automerge-repo"
import createDocumentHandle from "../documents/document-handle.ts"
import random from "random"
import type {AutomergeList} from "../types.ts"

export default function createProjectHandle(
	repo: Repo,
	template: Partial<lb.Project> = {},
) {
	return createDocumentHandle<lb.Project>(repo, {
		type: "project",
		items: (template.items || []) as AutomergeList<lb.FileId | lb.FolderId>,
		icon: template.icon || random.choice(["🦔", "🍒", "🧀", "✨", "👽"]),
		name: template.name || "",
	})
}
