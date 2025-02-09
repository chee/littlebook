import {
	array,
	literal,
	object,
	string,
	unknown,
	type z,
	type ZodTypeAny,
} from "zod"
import {stdSchema} from "./standard.js"
import {automergeURL, stored} from "./util.js"

export const ContentTypeMetadata = object({
	id: string(),
	displayName: string(),
	conformsTo: array(string()).optional(),
	icon: string().optional(),
})

export function inferContentType<T extends ZodTypeAny>(shape: T) {
	return object({
		schema: stdSchema(shape),
	}).extend(ContentTypeMetadata.shape)
}

export const TextShape = object({text: string()})

export const TextContentType = inferContentType(TextShape)

export const CodeShape = object({
	text: string(),
	language: string().optional(),
	editorURL: automergeURL.optional(),
})
export const CodeContentType = inferContentType(CodeShape)

export const MarkdownShape = object({
	text: string(),
	language: literal("markdown"),
	editorURL: automergeURL.optional(),
})

export const MarkdownContentType = inferContentType(MarkdownShape)

export const ContentType = inferContentType(unknown())

export type ContentType<T extends ZodTypeAny = ZodTypeAny> = z.infer<
	ReturnType<typeof inferContentType<T>>
>

export type ContentTypeMetadata = z.infer<typeof ContentTypeMetadata>

export const StoredContentType = stored("type", ContentTypeMetadata.shape)

export type StoredContentType = z.infer<typeof StoredContentType>
