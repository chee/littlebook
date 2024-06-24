import type {Repo} from "@automerge/automerge-repo"
import {binary, coderRegistry} from "../contents/coders.ts"
import {createContentHandle} from "./contents.ts"
import {
	type DocTemplate,
	createDocumentHandle,
	getDocumentHandle,
	removeItemFromDocument,
} from "./documents.ts"
import {addItemToProject, getProjectHandle} from "./projects.ts"
import {
	UniformType,
	type MIMEType,
	type UniformTypeIdentifier,
} from "../contents/uniform-type.ts"

type FileTemplate = DocTemplate<lb.File> & {
	contentType: UniformTypeIdentifier
}

export function createFileHandle(
	repo: Repo,
	fileTemplate: FileTemplate,
	bytes = new Uint8Array(),
) {
	const coder = coderRegistry.getFirst(fileTemplate.contentType) || binary()
	const content = createContentHandle(repo, coder.decode(bytes))
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
		UniformType.forMIMEType(computerFile.type as MIMEType) ||
		UniformType.forFilename(computerFile.name)

	const [type] = types?.values() || [UniformType.data]

	const file = createFileHandle(
		repo,
		{
			name: computerFile.name,
			lastModified: computerFile.lastModified || Date.now(),
			contentType: type.identifier,
		},
		bytes,
	)

	return file
}

export function getFileHandle(repo: Repo, id: lb.FileId) {
	return getDocumentHandle<lb.File>(repo, id)
}

export function deleteFile(
	repo: Repo,
	id: lb.FileId,
	parentId?: lb.ProjectId | lb.DirectoryId,
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
