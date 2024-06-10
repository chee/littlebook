import type {Repo} from "@automerge/automerge-repo"
import {createContentHandle} from "../contents/contents-api.ts"
import {
	coderRegistry,
	typeRegistry,
} from "../contents/types/content-type-registry.ts"
import {binary} from "../contents/types/coders.ts"
import {unknown} from "../contents/types/uniform-type-identifiers.ts"
import {
	createDocumentHandle,
	getDocumentHandle,
	removeItemFromDocument,
	type DocTemplate,
} from "../documents/documents-api.ts"
import type {UniformTypeIdentifier} from "../global.js"
import {addItemToProject, getProjectHandle} from "../projects/projects-api.ts"

export function createFileHandle(
	repo: Repo,
	fileTemplate: DocTemplate<lb.File> & {content: lb.ContentId},
) {
	return createDocumentHandle<lb.File>(repo, {
		type: "file",
		name: fileTemplate.name || "",
		content: fileTemplate.content,
		note: "",
	})
}

export function createFileHandleWithContentType(
	repo: Repo,
	fileTemplate: DocTemplate<lb.File>,
	contentTypeId: lb.UniformTypeIdentifier,
) {
	const coder = coderRegistry.get(contentTypeId) || binary()
	const content = createContentHandle(repo, {
		contentType: contentTypeId,
		value: coder.decode(new Uint8Array()),
	})
	const file = createFileHandle(repo, {
		...fileTemplate,
		content: content.documentId as lb.ContentId,
		lastModified: Date.now(),
	})
	return file
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
	const content = createContentHandle(repo, {
		contentType: type || unknown,
		value: coder.decode(bytes),
	})
	const file = createFileHandle(repo, {
		name: computerFile.name,
		content: content.documentId as lb.ContentId,
		lastModified: computerFile.lastModified || Date.now(),
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
	template: DocTemplate<lb.File>,
	contentType?: UniformTypeIdentifier,
) {
	const fileHandle = (() => {
		if (contentType) {
			return createFileHandleWithContentType(repo, template, contentType)
		}
		if ("content" in template && typeof template.content == "string") {
			return createFileHandle(
				repo,
				template as DocTemplate<lb.File> & {content: lb.ContentId},
			)
		}
		return new Error("oh no she's a rejecter")
	})()

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
		createHandleWithContentType: createFileHandleWithContentType.bind(
			null,
			repo,
		),
		createHandleInProject: createFileHandleInProject.bind(null, repo),
		import: importFile.bind(null, repo),
		getHandle: getFileHandle.bind(null, repo),
		deleteFile: deleteFile.bind(null, repo),
	}
}
