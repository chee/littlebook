import type {Repo} from "@automerge/automerge-repo"
import type {AutomergeList} from "../types.ts"
import {getDocumentHandle, createDocumentHandle} from "./documents.ts"

export function createSpaceHandle(
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

export const getSpaceHandle = (repo: Repo, id: lb.ProjectId) =>
	getDocumentHandle<lb.Project>(repo, id)

export const addAreaToSpace = (id: lb.AreaId) => (space: lb.Space) =>
	space.areas.push(id)

export const addProjectToSpace = (id: lb.ProjectId) => (space: lb.Space) =>
	space.projects.push(id)

export const removeProjectFromSpace = (id: lb.ProjectId) => (space: lb.Space) =>
	space.projects.deleteAt(space.projects.indexOf(id))

export const removeAreaFromSpace = (id: lb.AreaId) => (space: lb.Space) =>
	space.areas.push(id)

export default function createSpacesAPI(repo: Repo) {
	return {
		createHandle: createSpaceHandle.bind(null, repo),
		getHandle: getSpaceHandle.bind(null, repo),
		addProject: addProjectToSpace,
		removeProject: removeProjectFromSpace,
	}
}
