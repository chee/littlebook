import {z, type ZodTypeAny} from "zod"
import {stdSchema} from "./standard.js"
import {automergeURL, stored} from "./util.js"

export const ContentTypeMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	conformsTo: z.array(z.string()).optional(),
	icon: z.string().optional(),
})

export function inferContentType<T extends ZodTypeAny>(shape: T) {
	return z
		.object({
			schema: stdSchema(shape),
		})
		.extend(ContentTypeMetadata.shape)
}

export const TextShape = z.object({text: z.string()})

export const TextContentType = inferContentType(TextShape)

export const CodeShape = z.object({
	text: z.string(),
	language: z.string().optional(),
	editorURL: automergeURL.optional(),
})
export const CodeContentType = inferContentType(CodeShape)

export const MarkdownShape = z.object({
	text: z.string(),
	language: z.literal("markdown"),
	editorURL: automergeURL.optional(),
})

export const MarkdownContentType = inferContentType(MarkdownShape)

export const ContentType = inferContentType(z.unknown())

export type ContentType<T extends ZodTypeAny = ZodTypeAny> = z.infer<
	ReturnType<typeof inferContentType<T>>
>

export type ContentTypeMetadata = z.infer<typeof ContentTypeMetadata>

export const StoredContentType = stored("type", ContentTypeMetadata.shape)

export type StoredContentType = z.infer<typeof StoredContentType>
