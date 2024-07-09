import type {Repo} from "@automerge/automerge-repo"
import type {UniformTypeIdentifier} from "./uniform-type.ts"
import {coderRegistry, CodingError} from "./content-coders.ts"

export default async function recodeContent(
	repo: Repo,
	sourceType: UniformTypeIdentifier,
	targetType: UniformTypeIdentifier,
	source: lb.Content<lb.AnyContentValue>,
) {
	const sourceCoder = coderRegistry.getFirst(sourceType)
	const targetCoder = coderRegistry.getFirst(targetType)

	if (sourceCoder && targetCoder) {
		const bytes = await sourceCoder.encode(source.value)
		if (bytes instanceof Error) {
			return bytes
		}
		return repo.create<lb.Content<any>>({
			value: await targetCoder.decode(bytes),
		})
	}

	return new CodingError(
		`didn't have source ${sourceType} and target ${targetType} coders`,
	)
}
