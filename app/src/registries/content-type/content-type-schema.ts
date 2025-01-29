import {z, type ZodTypeAny} from "zod"
import * as standard from "../../standard-schema/zod-standard-schema.ts"
import {h} from "../../schema-helpers.ts"

export const ContentTypeMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	conformsTo: z.array(z.string()).optional(),
	icon: z.string().optional(),
})

export function inferContentType<T extends ZodTypeAny>(shape: T) {
	return z
		.object({
			schema: standard.schema(shape),
		})
		.extend(ContentTypeMetadata.shape)
}

export const TextShape = z.object({text: z.string()})

export const TextContentType = inferContentType(TextShape)

export const CodeShape = z.object({
	text: z.string(),
	language: z.string().optional(),
	editorURL: h.automergeURL().optional(),
})
export const CodeContentType = inferContentType(CodeShape)

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

export type StoredContentType = z.infer<typeof StoredContentType>
