import type {Repo} from "@automerge/automerge-repo"

import random from "random"
import type {AutomergeList} from "../types.ts"
import {
	type DocTemplate,
	addItemToDocument,
	createDocumentHandle,
	getDocumentHandle,
	removeItemFromDocument,
} from "./documents.ts"

export function createFolderHandle(
	repo: Repo,
	template: DocTemplate<lb.Folder> = {},
) {
	return createDocumentHandle<lb.Folder>(repo, {
		type: "folder",
		items: (template.items || []) as AutomergeList<lb.FileId | lb.FolderId>,
		icon: template.icon || random.choice(["🦔", "🍒", "🧀", "✨", "👽"])!,
		name: template.name || "",
		note: "",
	})
}

export function getFolderHandle(repo: Repo, id: lb.FolderId) {
	return getDocumentHandle<lb.Folder>(repo, id)
}

export const addItemToFolder = (id: lb.FolderId | lb.FileId) =>
	addItemToDocument(id)

export const removeItemFromFolder = (id: lb.FolderId | lb.FileId) =>
	removeItemFromDocument(id)

export function deleteItemFromFolder(repo: Repo, id: lb.FolderId | lb.FileId) {
	const itemHandle = repo.find<lb.File | lb.Folder>(id)
	itemHandle.doc().then(doc => {
		if (doc && "content" in doc) {
			repo.find(doc.content).delete()
		}
	})
	itemHandle.delete()
	return () => removeItemFromFolder(id)
}

export default function createProjectsAPI(repo: Repo) {
	return {
		createHandle: createFolderHandle.bind(null, repo),
		getHandle: getFolderHandle.bind(null, repo),
		addItem: addItemToFolder,
		removeItem: removeItemFromFolder,
		deleteItem: deleteItemFromFolder.bind(null, repo),
	}
}
