import type {Repo} from "@automerge/automerge-repo"
import {CodingError, coderRegistry} from "../files/content-coders.ts"
import type {UniformTypeIdentifier} from "../files/uniform-type.ts"

export function createContentHandle<ContentType extends lb.AnyContentValue>(
	repo: Repo,
	value: ContentType,
) {
	const handle = repo.create<lb.Content<ContentType>>({
		value,
	})
	return handle
}

// todo this should probably be an async function that operates on handles
// maybe, idk , or no

export function recodeContent(
	repo: Repo,
	sourceType: UniformTypeIdentifier,
	targetType: UniformTypeIdentifier,
	source: lb.Content<lb.AnyContentValue>,
) {
	const sourceCoder = coderRegistry.getFirst(sourceType)
	const targetCoder = coderRegistry.getFirst(targetType)

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

export function getContentHandle<Type extends lb.AnyContentValue>(
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
