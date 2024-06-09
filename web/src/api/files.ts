import {NamedDocument} from "./documents.ts"

import type {Repo} from "@automerge/automerge-repo"
import {createDocumentHandle} from "./documents.ts"
import {createContentHandle} from "./contents.ts"
import type {WithoutId} from "../types.ts"
import {
	coderRegistry,
	typeRegistry,
} from "../content-types/content-type-registry.ts"
import {binary} from "../content-types/coders.ts"
import {unknown} from "../content-types/uniform-type-identifiers.ts"

export function createFileHandle(
	repo: Repo,
	fileTemplate: Partial<Omit<lb.File, "id">> & {content: lb.ContentId},
) {
	return createDocumentHandle<lb.File>(repo, {
		type: "file",
		name: fileTemplate.name || "",
		content: fileTemplate.content,
		note: "",
	})
}

export class File extends NamedDocument<lb.File> {
	get when() {
		return this.doc.when
	}

	set when(when) {
		this.change(file => {
			file.when = when
		})
	}

	// todo this will be different probably because note is a rich-text
	get note() {
		return this.doc.note
	}

	set note(note) {
		this.change(file => {
			file.note = note
		})
	}

	get contentId() {
		return this.doc.content
	}
}

export function createFilesAPI(repo: Repo) {
	return {
		create(
			doc: Partial<WithoutId<lb.File>>,
			contentTypeId: lb.UniformTypeIdentifier,
		) {
			const coder = coderRegistry.get(contentTypeId) || binary()
			const content = createContentHandle(repo, {
				contentType: contentTypeId,
				value: coder.decode(new Uint8Array()),
			})
			const file = new File(
				createFileHandle(repo, {
					...doc,
					content: content.documentId as lb.ContentId,
				}),
			)
			return file
		},
		import(computerFile: globalThis.File, bytes: Uint8Array) {
			const types =
				typeRegistry.forFilename(computerFile.name) ||
				typeRegistry.forMime(computerFile.type)
			console.log(types)
			const [type] = types
			const coder = coderRegistry.get(types[0]) || binary()
			const content = createContentHandle(repo, {
				contentType: type || unknown,
				value: coder.decode(bytes),
			})
			const file = new File(
				createFileHandle(repo, {
					name: computerFile.name,
					content: content.documentId as lb.ContentId,
				}),
			)
			return file
		},
		get(id: lb.FileId) {
			return new File(repo.find<lb.File>(id))
		},
		deleteFile(
			fileId: lb.Project["items"][number],
			parentId?: lb.ProjectId | lb.FolderId,
		) {
			if (parentId) {
				const parentHandle = repo.find<lb.Project | lb.Folder>(parentId)
				const parentDoc = parentHandle.docSync()
				if (!parentDoc) {
					return false
				}
				const indexInParent = parentDoc.items.indexOf(fileId)
				if (indexInParent == -1) {
					return false
				}
				parentHandle.change(parent => parent.items.deleteAt(0))
			}

			const fileHandle = repo.find<lb.File>(fileId)
			const fileDoc = fileHandle.docSync()
			if (!fileDoc) {
				return false
			}
			const contentHandle = repo.find<lb.Content<any>>(fileDoc.content)
			contentHandle.delete()
			fileHandle.delete()
		},
	}
}
