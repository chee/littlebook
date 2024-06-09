import type {Repo} from "@automerge/automerge-repo"
import createDocumentHandle from "../documents/document-handle.ts"
import type {AutomergeList} from "../types.ts"

export default function createSpaceHandle(
	repo: Repo,
	template: Partial<lb.Space> = {},
) {
	return createDocumentHandle<lb.Space>(repo, {
		type: "space",
		name: template.name || "",
		areas: (template.areas || []) as AutomergeList<lb.AreaId>,
		projects: (template.projects || []) as AutomergeList<lb.ProjectId>,
	})
}
