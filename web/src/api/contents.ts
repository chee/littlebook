import type {Repo} from "@automerge/automerge-repo"
import {CodingError} from "../contents/types/coders.ts"
import {coderRegistry} from "../contents/types/type-registries.ts"
import type {AnyContent} from "../global.js"
import {createDocumentHandle, getDocumentHandle} from "./documents.ts"
import {createFileHandle} from "./files.ts"

export function createContentHandle<T extends lb.AnyContent>(
	repo: Repo,
	content: T,
) {
	return createDocumentHandle<lb.Content<T>>(repo, content)
}

export function recodeContent<Source extends lb.AnyContent, Target: lb.AnyContent>(
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
