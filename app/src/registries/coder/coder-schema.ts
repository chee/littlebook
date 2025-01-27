import z from "zod"

export const CoderMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentType: z.string(),
	plugin: z.string().optional(),
	mimeTypes: z.array(z.string()).optional(),
	filePatterns: z.array(z.string()).optional(),
})

export type CoderMetadata = z.infer<typeof CoderMetadata>

export function inferCoder<T extends z.ZodTypeAny>(schema: T) {
	return z
		.object({
			decode: z.function().args(z.instanceof(Uint8Array)).returns(schema),
			encode: z.function().args(schema).returns(z.instanceof(Uint8Array)),
			new: z.function().args().returns(schema),
		})
		.extend(CoderMetadata.shape)
}

export const Coder: z.ZodType<Coder> = inferCoder(z.unknown())

export type Coder<T extends z.ZodTypeAny = z.ZodTypeAny> = z.infer<
	ReturnType<typeof inferCoder<T>>
>
// how a compiled coder plugin is stored in automerge

export const StoredCoder = z
	.object({
		type: z.literal("coder"),
		bytes: z.instanceof(Uint8Array),
	})
	.merge(CoderMetadata.required())

export type StoredCoder = z.infer<typeof StoredCoder>
