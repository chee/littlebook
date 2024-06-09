import type {Repo} from "@automerge/automerge-repo"
import {NamedDocument, createDocumentHandle} from "./documents.ts"
import type {WithoutId} from "../types.ts"

import type {AutomergeList} from "../types.ts"

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

export class Space extends NamedDocument<lb.Space> {
	get areas() {
		return this.doc.areas
	}

	get projects() {
		return this.doc.projects
	}

	addArea(id: lb.Space["areas"][number]) {
		this.change(space => {
			space.areas.push(id)
		})
	}
	removeArea(id: lb.Space["areas"][number]) {
		this.change(space => {
			const index = space.areas.indexOf(id)
			space.areas.deleteAt(index)
		})
	}

	addProject(id: lb.Space["projects"][number]) {
		this.change(space => {
			space.projects.push(id)
		})
	}
	removeProject(id: lb.Space["projects"][number]) {
		this.change(space => {
			const index = space.projects.indexOf(id)
			space.projects.deleteAt(index)
		})
	}
}

export default function createSpacesAPI(repo: Repo) {
	return {
		create(doc: Partial<WithoutId<lb.Space>>) {
			return new Space(createSpaceHandle(repo, doc))
		},
		get(id: lb.SpaceId) {
			return new Space(repo.find<lb.Space>(id))
		},
	}
}
