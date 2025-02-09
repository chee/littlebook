import * as v from "valibot"
import {stdSchema} from "./standard.js"
import {automergeURL, stored, type BaseSchemaAny} from "./util.js"
import type {InferOutput} from "valibot"

export const ContentTypeMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	conformsTo: v.optional(v.array(v.string())),
	icon: v.optional(v.string()),
})

export function inferContentType<T extends BaseSchemaAny>(shape: T) {
	return v.object({
		schema: stdSchema(shape),
		...ContentTypeMetadata.entries,
	})
}

export const TextShape = v.object({text: v.string()})

export const TextContentType = inferContentType(TextShape)

export const CodeShape = v.object({
	text: v.string(),
	language: v.optional(v.string()),
	editorURL: v.optional(automergeURL),
})
export const CodeContentType = inferContentType(CodeShape)

export const MarkdownShape = v.object({
	text: v.string(),
	language: v.literal("markdown"),
	editorURL: v.optional(automergeURL),
})

export const MarkdownContentType = inferContentType(MarkdownShape)

export const ContentType = inferContentType(v.unknown())

export type ContentType<T extends BaseSchemaAny> = InferOutput<
	ReturnType<typeof inferContentType<T>>
>

export type ContentTypeMetadata = InferOutput<typeof ContentTypeMetadata>

export const StoredContentType = stored("type", ContentTypeMetadata.entries)

export type StoredContentType = InferOutput<typeof StoredContentType>
