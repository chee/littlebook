import {
	array,
	literal,
	object,
	optional,
	string,
	unknown,
	type BaseIssue,
	type BaseSchema,
	type InferOutput,
} from "valibot"
import {stdSchema} from "./standard.js"
import {automergeURL, stored} from "./util.js"

export const ContentTypeMetadata = object({
	id: string(),
	displayName: string(),
	conformsTo: optional(array(string())),
	icon: optional(string()),
})

export function inferContentType<T extends BaseSchema<any, any, any>>(
	shape: T
) {
	return object({
		schema: stdSchema(shape),
		...ContentTypeMetadata.entries,
	})
}

export const TextShape = object({text: string()})

export const TextContentType = inferContentType(TextShape)

export const CodeShape = object({
	text: string(),
	language: optional(string()),
	editorURL: optional(automergeURL),
})
export const CodeContentType = inferContentType(CodeShape)

export const MarkdownShape = object({
	text: string(),
	language: literal("markdown"),
	editorURL: optional(automergeURL),
})

export const MarkdownContentType = inferContentType(MarkdownShape)

export const ContentType = inferContentType(unknown()) as BaseSchema<
	ContentType,
	ContentType,
	BaseIssue<unknown>
>

export type ContentType<
	T extends BaseSchema<any, any, any> = BaseSchema<any, any, any>,
> = InferOutput<ReturnType<typeof inferContentType<T>>>

export type ContentTypeMetadata = InferOutput<typeof ContentTypeMetadata>

export const StoredContentType = stored("type", ContentTypeMetadata.entries)

export type StoredContentType = InferOutput<typeof StoredContentType>
