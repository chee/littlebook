import {z, type ZodTypeAny} from "zod"

export const ContentTypeMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	conformsTo: z.array(z.string()).optional(),
	icon: z.string().optional(),
})

export const inferOk = <T extends ZodTypeAny>(shape: T) => {
	return z.object({
		ok: z.literal(true),
		val: shape,
	})
}
export const inferErr = <T extends ZodTypeAny>(_: T) => {
	return z.object({
		ok: z.literal(false),
		err: z.instanceof(Error),
	})
}
export const inferResult = <T extends ZodTypeAny>(shape: T) => {
	return z.discriminatedUnion("ok", [inferOk(shape), inferErr(shape)])
}

export function inferContentType<T extends ZodTypeAny>(shape: T) {
	return z
		.object({
			parse: z.function().args(z.unknown()).returns(inferResult(shape)),
		})

		.extend(ContentTypeMetadata.shape)
}

export const TextShape = z.object({text: z.string()})

export const TextContentType = inferContentType(TextShape).parse({
	id: "public.text",
	displayName: "plain text",
	parse(content: unknown) {
		const result = TextShape.safeParse(content)
		if (result.success) {
			return {ok: true, val: result.data}
		} else {
			return {ok: false, err: result.error}
		}
	},
})

export const KnownContentTypes = []

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
