import type {StandardSchemaV1} from "@standard-schema/spec"
import {stored} from "./util.js"
import * as v from "valibot"

export const ContentTypeMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	conformsTo: v.optional(v.array(v.string())),
	icon: v.optional(v.string()),
})
export type ContentTypeMetadata = v.InferOutput<typeof ContentTypeMetadata>

export type ContentType<Shape> = {
	schema: StandardSchemaV1<Shape>
} & ContentTypeMetadata

export const StoredContentType = stored("type", ContentTypeMetadata.entries)

export type StoredContentType = v.InferOutput<typeof StoredContentType>
