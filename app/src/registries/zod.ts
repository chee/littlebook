/*

export const CoderMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentType: z.string(),
	mimeTypes: z.array(z.string()).optional(),
	filePatterns: z.array(z.string()).optional(),
})
// .refine(
// 	data =>
// 		(data.mimeTypes && data.mimeTypes.length) ||
// 		(data.filePatterns && data.filePatterns.length),
// 	"must define at least one of `filePatterns` or `mimeTypes`"
// )

export type CoderMetadata = z.infer<typeof CoderMetadata>

// todo make generic, and allow for a content `shape` to be passed i

export function inferCoder<T extends z.ZodTypeAny>(schema: T) {
	return z
		.object({
			decode: z.function().args(z.instanceof(Uint8Array)).returns(schema),
			encode: z.function().args(schema).returns(z.instanceof(Uint8Array)),
			new: z.function().args().returns(z.unknown()),
		})
		.extend(CoderMetadata.shape)
}
export type AnyCoder = z.infer<ReturnType<typeof inferCoder>>

// const TextFile = z.object({text: z.string()})
// type TextFile = z.infer<typeof TextFile>

// how a compiled coder plugin is stored in automerge
export const StoredCoder = z
	.object({
		type: z.literal("coder"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(CoderMetadata.shape)

export type StoredCoder = z.infer<typeof StoredCoder>

*/
