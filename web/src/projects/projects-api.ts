import type {Repo} from "@automerge/automerge-repo"
import type {WithoutId} from "../types.ts"
import createProjectHandle from "./project-handle.ts"
import Project from "./project-model.ts"

export default function createProjectsAPI(repo: Repo) {
	return {
		create(doc: Partial<WithoutId<lb.Project>>) {
			return new Project(createProjectHandle(repo, doc))
		},
		get(id: lb.ProjectId) {
			return new Project(repo.find<lb.Project>(id))
		},
	}
}
