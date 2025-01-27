import {DocHandle} from "@automerge/automerge-repo"
import type z from "zod"
import type {Entry} from "../../documents/entry.ts"

export const PublisherMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export const Publisher = z
	.object({
		publish: z
			.function()
			.args(
				z.object({
					handle: z.instanceof(DocHandle),
					entry: z.custom<Entry>(),
					options: z.record(z.string(), z.unknown()).optional(),
				})
			)
			.returns(z.promise(z.void())),
	})
	.extend(PublisherMetadata.shape)

export type Publisher = z.infer<typeof Publisher>

export const StoredPublisher = z
	.object({
		type: z.literal("publisher"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(PublisherMetadata.shape)

export type StoredPublisher = z.infer<typeof StoredPublisher>
