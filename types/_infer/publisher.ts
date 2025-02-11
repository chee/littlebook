import {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import {args, standard, stored} from "./util.js"
import * as v from "valibot"
import type {StandardSchemaV1} from "@standard-schema/spec"

export const PublisherMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
	category: v.optional(v.picklist(["export", "reïmport"])),
})

export function inferPublisher<Document extends StandardSchemaV1>(
	schema: Document
) {
	return v.object({
		publish: v.pipe(
			v.function(),
			args(
				v.object({
					// todo dochandle(schema)
					handle: v.instance(DocHandle) as v.GenericSchema<
						DocHandle<StandardSchemaV1.InferOutput<Document>>
					>,
					entry: Entry,
					options: v.optional(v.record(v.string(), v.unknown())),
				})
			),
			v.returnsAsync(v.promise())
		),
		schema: v.optional(standard(schema)),
		...PublisherMetadata.entries,
	})
}

export type Publisher<Shape> = StandardSchemaV1.InferOutput<
	ReturnType<typeof inferPublisher<StandardSchemaV1<Shape>>>
>

export const StoredPublisher = stored("publisher", PublisherMetadata.entries)

export type StoredPublisher = v.InferOutput<typeof StoredPublisher>
