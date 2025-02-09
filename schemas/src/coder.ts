import {array, object, string, z, type ZodTypeAny} from "zod"
import {bytes, result, stored} from "./util.js"

export const CoderMetadata = object({
	id: string(),
	displayName: string(),
	contentType: string(),
	plugin: string().optional(),
	mimeTypes: array(string()).optional(),
	filePatterns: array(string()).optional(),
	recommendedFileExtension: string().optional(),
})

export type CoderMetadata = z.infer<typeof CoderMetadata>

export function inferCoder<T extends ZodTypeAny>(schema: T) {
	return object({
		fromBytes: z.function().args(bytes).returns(result(schema)),
		toBytes: z.function().args(schema).returns(result(bytes)),
		fromFile: z
			.function()
			.args(z.instanceof(File))
			.returns(z.promise(result(schema))),
		new: z.function().returns(schema),
	}).extend(CoderMetadata.shape)
}

export const Coder = inferCoder(z.unknown())

export type Coder<T extends ZodTypeAny = ZodTypeAny> = z.infer<
	ReturnType<typeof inferCoder<T>>
>

export const StoredCoder = stored("coder", CoderMetadata.shape)

export type StoredCoder = z.infer<typeof StoredCoder>
