import type {DocHandle, Repo} from "@automerge/automerge-repo"
import type {AutomergeList} from "../types.ts"
import {
	addItemToDocument,
	createDocumentHandle,
	getDocumentHandle,
	removeItemFromDocument,
} from "./documents.ts"

export function createSpaceHandle(
	repo: Repo,
	template: Partial<lb.Space> = {},
) {
	return createDocumentHandle<lb.Space>(repo, {
		type: "space",
		name: template.name || "",
		items: (template.items || []) as AutomergeList<lb.FolderId>,
	})
}

export function fromMerged(
	repo: Repo,
	a: DocHandle<lb.Space>,
	b: DocHandle<lb.Space>,
) {
	const freshHandle = createSpaceHandle(repo)
	freshHandle.merge(a)
	freshHandle.merge(b)
	freshHandle.change(fresh => {
		// @ts-expect-error
		fresh.id = freshHandle.documentId
	})
	return freshHandle
}

export const getSpaceHandle = (repo: Repo, id: lb.SpaceId) =>
	getDocumentHandle<lb.Space>(repo, id)

export const addFolderToSpace = (id: lb.FolderId) => addItemToDocument(id)

export const removeFolderFromSpace = (id: lb.FolderId) =>
	removeItemFromDocument(id)

export default function createSpacesAPI(repo: Repo) {
	return {
		createHandle: createSpaceHandle.bind(null, repo),
		getHandle: getSpaceHandle.bind(null, repo),
		addFolder: addFolderToSpace,
		removeFolder: removeFolderFromSpace,
		fromMerged: fromMerged.bind(null, repo),
	}
}
