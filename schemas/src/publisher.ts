import {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import {stored} from "./util.js"
import {array, literal, object, string, union, z} from "zod"

export const PublisherMetadata = object({
	id: string(),
	displayName: string(),
	contentTypes: union([array(string()), literal("*")]),
	category: z.enum(["export"]),
})

export const Publisher = object({
	publish: z
		.function()
		.args(
			z.object({
				handle: z.instanceof(DocHandle),
				entry: Entry,
				options: z.optional(z.record(z.string(), z.unknown())),
			})
		)
		.returns(z.promise(z.void())),
}).extend(PublisherMetadata.shape)

export type Publisher = z.infer<typeof Publisher>

export const StoredPublisher = stored("publisher", PublisherMetadata.shape)

export type StoredPublisher = z.infer<typeof StoredPublisher>
