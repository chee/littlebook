import * as v from "valibot"
import {bytes, result, stored, type BaseSchemaAny} from "./util.js"

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

export function inferCoder<T extends BaseSchemaAny>(schema: T) {
	return v.object({
		fromBytes: v.pipe(
			v.function(),
			v.args(v.tuple([bytes])),
			v.returns(result(schema))
		),

		toBytes: v.pipe(
			v.function(),
			v.args(v.tuple([schema])),
			v.returns(bytes)
		),

		fromFile: v.pipe(
			v.function(),
			v.args(v.tuple([v.instance(File)])),
			v.returns(schema)
		),

		new: v.pipe(v.function(), v.returns(schema)),
		...CoderMetadata.entries,
	})
}

export const Coder = inferCoder(v.unknown())

export type Coder<T extends BaseSchemaAny = BaseSchemaAny> = v.InferOutput<
	ReturnType<typeof inferCoder<T>>
>

export const StoredCoder = stored("coder", CoderMetadata.entries)

export type StoredCoder = v.InferOutput<typeof StoredCoder>
