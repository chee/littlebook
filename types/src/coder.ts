import {stored, type Result} from "./util.js"
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
	fromBytes(bytes: Uint8Array): Result<Shape>
	toBytes(shape: Shape): Result<Uint8Array>
	fromFile?(file: File): Promise<Result<Shape>>
	"new"(): Shape
} & CoderMetadata

// export function isCoder(coder: unknown): coder is Coder {
// 	const meta = CoderMetadata["~standard"].validate(coder)
// 	return (
// 		!("issues" in meta) &&
// 		(["fromBytes", "toBytes", "new"] as const).every(
// 			key =>
// 				key in (coder as Coder) && (coder as Coder)[key] instanceof Function
// 		)
// 	)
// }

export const StoredCoder = stored("coder", CoderMetadata.entries)

export type StoredCoder = v.InferOutput<typeof StoredCoder>
