import type {Repo} from "@automerge/automerge-repo"
import {CodingError} from "../contents/types/coders.ts"
import {coderRegistry} from "../contents/types/type-registries.ts"
import type {AnyContent} from "../global.js"

export function createContentHandle<ContentType extends lb.AnyContent>(
	repo: Repo,
	value: ContentType,
) {
	const handle = repo.create<lb.Content<ContentType>>({
		value,
	})
	return handle
}

export function recodeContent(
	repo: Repo,
	sourceType: lb.UniformTypeIdentifier,
	targetType: lb.UniformTypeIdentifier,
	source: lb.Content<AnyContent>,
) {
	const sourceCoder = coderRegistry.get(sourceType)
	const targetCoder = coderRegistry.get(targetType)

	if (sourceCoder && targetCoder) {
		const bytes = sourceCoder.encode(source.value)
		if (bytes instanceof Error) {
			return bytes
		}
		return createContentHandle(repo, targetCoder.decode(bytes))
	}

	return new CodingError(
		`didn't have source ${sourceType} and target ${targetType} coders`,
	)
}

export function getContentHandle<Type extends lb.AnyContent>(
	repo: Repo,
	id: lb.ContentId,
) {
	return repo.find<lb.Content<Type>>(id)
}

export default function createContentsAPI(repo: Repo) {
	return {
		createHandle: createContentHandle.bind(null, repo),
		recode: recodeContent.bind(null, repo),
		getHandle: getContentHandle.bind(null, repo),
	}
}
