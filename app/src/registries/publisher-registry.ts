import {DocHandle, type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import z from "zod"
import {Registry} from "./registry"
import type {Entry} from "../documents/entry"
import {err, ok, type Result} from "../lib/result"

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

export class PublisherRegistry extends Registry<StoredPublisher, Publisher> {
	constructor({repo}: {repo: Repo}) {
		super({
			repo,
			storedSchema: StoredPublisher,
			schema: Publisher,
		})
	}

	*publishers(entry: Entry) {
		for (const publisher of Object.values(this.records)) {
			if (
				publisher.contentTypes === "*" ||
				publisher.contentTypes.includes(entry.contentType)
			) {
				yield publisher
			}
		}
	}

	get(id: string): Result<Publisher, Error> {
		const publisher = this.records[id]
		return publisher
			? ok(publisher)
			: err(new Error(`publisher not found: ${id}`))
	}
}

export const PublisherRegistryContext = createContext<PublisherRegistry>()

export function usePublisherRegistry() {
	const value = useContext(PublisherRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a PublisherRegistryContext")
	}
	return value
}
