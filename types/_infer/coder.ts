import {bytes, result, stored, standard, args, type Result} from "./util.js"
import * as v from "valibot"
import {StandardSchemaV1} from "@standard-schema/spec"

export const CoderMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentType: v.string(),
	plugin: v.optional(v.string()),
	mimeTypes: v.optional(v.array(v.string())),
	filePatterns: v.optional(v.array(v.string())),
	recommendedFileExtension: v.optional(v.string()),
})

export type CoderMetadata = v.InferOutput<typeof CoderMetadata>

// todo AsyncCoder
// todo do i really need to parse coders, editors, publishers as schemas?
export function inferCoder<DocShape extends StandardSchemaV1>(
	schema: DocShape
) {
	return v.object({
		fromBytes: v.pipe(
			v.function(),
			args(bytes),
			v.returns(result(standard(schema)))
		),
		toBytes: v.pipe(
			v.function(),
			args(standard(schema)),
			v.returns(result(bytes))
		),
		fromFile: v.pipe(
			v.function(),
			args(v.instance(File)),
			v.returnsAsync(result(standard(schema)))
		),
		new: v.pipe(v.function(), v.returns(standard(schema))),
		...CoderMetadata.entries,
	})
}

export const UnknownCoder = inferCoder(v.unknown())
export const AnyCoder = inferCoder(v.any())
export type UnknownCoder = v.InferOutput<typeof UnknownCoder>
export type AnyCoder = v.InferOutput<typeof AnyCoder>

export type Coder<Schema extends StandardSchemaV1> = v.InferOutput<
	ReturnType<typeof inferCoder<Schema>>
>

export const StoredCoder = stored("coder", CoderMetadata.entries)

export type StoredCoder = v.InferOutput<typeof StoredCoder>
