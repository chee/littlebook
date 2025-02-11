import type {StandardSchemaV1} from "@standard-schema/spec"
import {automergeURL, standard, stored} from "./util.js"
import * as v from "valibot"

export const ContentTypeMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	conformsTo: v.optional(v.array(v.string())),
	icon: v.optional(v.string()),
})

export function inferContentType<Shape extends StandardSchemaV1>(shape: Shape) {
	return v.object({
		schema: standard(shape),
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
export type MarkdownContentType = v.InferOutput<typeof MarkdownContentType>

export type ContentType<Shape> = v.InferOutput<
	ReturnType<typeof inferContentType<StandardSchemaV1<Shape>>>
>

export type ContentTypeMetadata = v.InferOutput<typeof ContentTypeMetadata>

export const StoredContentType = stored("type", ContentTypeMetadata.entries)

export type StoredContentType = v.InferOutput<typeof StoredContentType>
