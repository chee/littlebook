import {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import {stored} from "./util.js"
import * as v from "valibot"

export const PublisherMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
	category: v.optional(v.picklist(["export"])),
})

export const Publisher = v.object({
	publish: v.pipe(
		v.function(),
		v.args(
			v.tuple([
				v.object({
					handle: v.instance(DocHandle),
					entry: Entry,
					options: v.optional(v.record(v.string(), v.unknown())),
				}),
			])
		),
		v.returns(v.promise())
	),
	...PublisherMetadata.entries,
})

export type Publisher = v.InferInput<typeof Publisher>

export const StoredPublisher = stored("publisher", PublisherMetadata.entries)

export type StoredPublisher = v.InferOutput<typeof StoredPublisher>
