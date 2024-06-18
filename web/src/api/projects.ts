import type {Repo} from "@automerge/automerge-repo"

import random from "random"
import type {AutomergeList} from "../types.ts"
import {
	addItemToDocument,
	getDocumentHandle,
	removeItemFromDocument,
	createDocumentHandle,
	type DocTemplate,
} from "./documents.ts"

export function createProjectHandle(
	repo: Repo,
	template: DocTemplate<lb.Project> = {},
) {
	return createDocumentHandle<lb.Project>(repo, {
		type: "project",
		items: (template.items || []) as AutomergeList<lb.FileId | lb.FolderId>,
		icon: template.icon || random.choice(["🦔", "🍒", "🧀", "✨", "👽"])!,
		name: template.name || "",
	})
}

export function getProjectHandle(repo: Repo, id: lb.ProjectId) {
	return getDocumentHandle<lb.Project>(repo, id)
}

export const addItemToProject = (id: lb.ProjectItemId) => addItemToDocument(id)

export const removeItemFromProject = (id: lb.ProjectItemId) =>
	removeItemFromDocument(id)

export function deleteItemFromProject(repo: Repo, id: lb.ProjectItemId) {
	const itemHandle = repo.find<lb.File | lb.Folder>(id)
	itemHandle.doc().then(doc => {
		if (doc && "content" in doc) {
			repo.find(doc.content).delete()
		}
	})
	itemHandle.delete()
	return () => removeItemFromProject(id)
}

export default function createProjectsAPI(repo: Repo) {
	return {
		createHandle: createProjectHandle.bind(null, repo),
		getHandle: getProjectHandle.bind(null, repo),
		addItem: addItemToProject,
		removeItem: removeItemFromProject,
		deleteItem: deleteItemFromProject.bind(null, repo),
	}
}
