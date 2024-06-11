import type {Repo} from "@automerge/automerge-repo"
import {coderRegistry} from "./types/type-registries.ts"
import {
	createDocumentHandle,
	getDocumentHandle,
} from "../documents/documents-api.ts"
import {createFileHandle} from "../files/files-api.ts"
import {CodingError} from "./types/coders.ts"
import type {AnyContent} from "../global.js"

export function createContentHandle<T extends lb.AnyContent>(
	repo: Repo,
	content: Omit<lb.Content<T>, "id" | "type">,
) {
	return createDocumentHandle<lb.Content<T>>(repo, {
		type: "content",
		contentType: content.contentType,
		value: content.value,
	})
}

export function recodeContent(
	repo: Repo,
	source: lb.Content<AnyContent>,
	targetType: lb.UniformTypeIdentifier,
) {
	const sourceCoder = coderRegistry.get(source.contentType)
	const targetCoder = coderRegistry.get(targetType)

	if (sourceCoder && targetCoder) {
		const bytes = sourceCoder.encode(source.value)
		if (bytes instanceof Error) {
			return bytes
		}
		return createContentHandle(repo, {
			contentType: targetType,
			value: targetCoder.decode(bytes),
		})
	}

	return new CodingError()
}

export function getContentHandle<Type extends lb.AnyContent>(
	repo: Repo,
	id: lb.ContentId,
) {
	return getDocumentHandle<lb.Content<Type>>(repo, id)
}

export default function createContentsAPI(repo: Repo) {
	return {
		createHandle: createFileHandle.bind(null, repo),
		recode: recodeContent.bind(null, repo),
		getHandle: getContentHandle.bind(null, repo),
	}
}
