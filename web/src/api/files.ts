import type {Repo} from "@automerge/automerge-repo"
import {binary} from "../contents/types/coders.ts"
import {coderRegistry, typeRegistry} from "../contents/types/type-registries.ts"
import {createContentHandle} from "./contents.ts"
import {
	type DocTemplate,
	createDocumentHandle,
	getDocumentHandle,
	removeItemFromDocument,
} from "./documents.ts"
import {addItemToProject, getProjectHandle} from "./projects.ts"

type FileTemplate = DocTemplate<lb.File> & {
	contentType: lb.UniformTypeIdentifier
}

export function createFileHandle(repo: Repo, fileTemplate: FileTemplate) {
	const coder = coderRegistry.get(fileTemplate.contentType) || binary()
	const content = createContentHandle(repo, coder.decode(new Uint8Array()))
	return createDocumentHandle<lb.File>(repo, {
		type: "file",
		name: fileTemplate.name || "",
		content: content.documentId as lb.ContentId,
		note: "",
		contentType: fileTemplate.contentType,
	})
}

export function importFile(
	repo: Repo,
	computerFile: globalThis.File,
	bytes: Uint8Array,
) {
	const types =
		typeRegistry.forFilename(computerFile.name) ||
		typeRegistry.forMime(computerFile.type)

	const [type] = types
	const coder = coderRegistry.get(types[0]) || binary()
	const content = createContentHandle(repo, coder.decode(bytes))
	const file = createFileHandle(repo, {
		name: computerFile.name,
		content: content.documentId as lb.ContentId,
		lastModified: computerFile.lastModified || Date.now(),
		contentType: type,
	})
	return file
}

export function getFileHandle(repo: Repo, id: lb.FileId) {
	return getDocumentHandle<lb.File>(repo, id)
}

export function deleteFile(
	repo: Repo,
	id: lb.FileId,
	parentId?: lb.ProjectId | lb.FolderId,
) {
	if (parentId) {
		const parentHandle = repo.find<lb.Project | lb.Folder>(parentId)
		parentHandle.change(removeItemFromDocument(id))
	}

	const fileHandle = repo.find<lb.File>(id)
	fileHandle.doc().then(file => {
		file && repo.find<lb.Content<any>>(file.content).delete()
	})

	fileHandle.delete()
}

export function createFileHandleInProject(
	repo: Repo,
	projectId: lb.ProjectId,
	template: FileTemplate,
) {
	const fileHandle = createFileHandle(repo, template)

	if (fileHandle instanceof Error) {
		// todo lol i can't do anything here because these functions are passed
		// right into a change function
		return fileHandle
	}

	const projectHandle = getProjectHandle(repo, projectId)

	fileHandle.doc().then(file => {
		file && projectHandle.change(addItemToProject(file.id))
	})

	return fileHandle
}

export default function createFilesAPI(repo: Repo) {
	return {
		createHandle: createFileHandle.bind(null, repo),
		createHandleInProject: createFileHandleInProject.bind(null, repo),
		import: importFile.bind(null, repo),
		getHandle: getFileHandle.bind(null, repo),
		deleteFile: deleteFile.bind(null, repo),
	}
}
