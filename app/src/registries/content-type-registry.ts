import {z, type ZodTypeAny} from "zod"

export const ContentTypeMetadata = z.object({
	id: z.string(),
	conformsTo: z.array(z.string()).optional(),
	displayName: z.string(),
	icon: z.string().optional(),
})

export function inferContentType<T extends ZodTypeAny>(shape: T) {
	return z
		.object({
			shape,
			parse: z
				.function()
				.args(z.unknown())
				.returns(
					z.discriminatedUnion("ok", [
						z.object({
							ok: z.literal(true),
							val: shape,
						}),
						z.object({
							ok: z.literal(false),
							err: z.instanceof(Error),
						}),
					])
				),
		})

		.extend(ContentTypeMetadata.shape)
}

export const ContentType: z.ZodType<ContentType> = inferContentType(z.unknown())

export type ContentType<T extends z.ZodTypeAny = z.ZodTypeAny> = z.infer<
	ReturnType<typeof inferContentType<T>>
>

export type ContentTypeMetadata = z.infer<typeof ContentTypeMetadata>

export const StoredContentType = z
	.object({
		type: z.literal("type"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(ContentTypeMetadata.shape)
