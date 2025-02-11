import {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import {stored} from "./util.js"
import * as v from "valibot"
import type {StandardSchemaV1} from "@standard-schema/spec"

export const PublisherMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
	category: v.optional(v.picklist(["export", "reïmport"])),
})

export type PublisherMetadata = v.InferOutput<typeof PublisherMetadata>

export type Publisher<Shape = unknown> = {
	publish(args: {
		handle: DocHandle<Shape>
		entry: Entry
		options?: Record<string, unknown>
	}): Promise<void>
	schema?: StandardSchemaV1<Shape>
} & PublisherMetadata

export const StoredPublisher = stored("publisher", PublisherMetadata.entries)

export type StoredPublisher = v.InferOutput<typeof StoredPublisher>
