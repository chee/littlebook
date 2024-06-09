import type {Repo} from "@automerge/automerge-repo"
import type {WithoutId} from "../types.ts"
import {NamedDocument, createDocumentHandle} from "./documents.ts"

import random from "random"
import type {AutomergeList} from "../types.ts"

export function createProjectHandle(
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

export class Project extends NamedDocument<lb.Project> {
	get items() {
		return this.doc?.items
	}

	get when() {
		return this.doc.when
	}

	set when(when) {
		this.change(project => {
			project.when = when
		})
	}

	addItem(id: lb.Project["items"][number]) {
		this.change(project => {
			project.items.push(id)
		})
	}

	removeItem(id: lb.Project["items"][number]) {
		this.change(project => {
			const index = project.items.indexOf(id)
			project.items.deleteAt(index)
		})
	}
}

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
