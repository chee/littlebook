import {stored, type MaybePromise, type Result} from "./util.js"
import * as v from "valibot"

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

export type Coder<Shape = unknown> = {
	fromBytes(bytes: Uint8Array): MaybePromise<Result<Shape>>
	toBytes(shape: Shape): MaybePromise<Result<Uint8Array>>
	fromFile?(file: File): Promise<Result<Shape>>
	"new"(): Shape
} & CoderMetadata

export const StoredCoder = stored("coder", CoderMetadata.entries)

export type StoredCoder = v.InferOutput<typeof StoredCoder>
