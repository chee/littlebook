import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {err, ok, type Result} from "true-myth/result"
import type {ContentTypeRegistry} from "./content-type-registry.ts"
import {Automerge} from "@automerge/automerge-repo/slim"
import {Publisher, StoredPublisher, type Entry} from "@pointplace/schemas"

export class PublisherRegistry extends Registry<StoredPublisher, Publisher> {
	private contentTypeRegistry: ContentTypeRegistry

	constructor({
		repo,
		contentTypeRegistry,
	}: {
		repo: Repo
		contentTypeRegistry: ContentTypeRegistry
	}) {
		super({
			repo,
			storedSchema: StoredPublisher,
			schema: Publisher,
		})
		this.contentTypeRegistry = contentTypeRegistry
		this.register(exportAutomerge)
	}

	*publishers(entry: Entry) {
		const seen = new Set<Publisher>()
		for (const publisher of Object.values(this.records)) {
			if (publisher.contentTypes.includes(entry.contentType)) {
				seen.add(publisher)
				yield publisher
			}
		}

		const entryType = this.contentTypeRegistry.get(entry.contentType)
		if (entryType.isOk && entryType.value.conformsTo) {
			for (const publisher of Object.values(this.records)) {
				if (
					Array.isArray(publisher.contentTypes) &&
					publisher.contentTypes.some(type =>
						entryType.value.conformsTo?.includes(type)
					) &&
					!seen.has(publisher)
				) {
					seen.add(publisher)
					yield publisher
				}
			}
		}

		for (const publisher of Object.values(this.records)) {
			if (publisher.contentTypes === "*") {
				if (!seen.has(publisher)) {
					seen.add(publisher)
					yield publisher
				}
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

const exportAutomerge: Publisher = {
	id: "export-automerge",
	displayName: "Automerge File",
	contentTypes: "*",
	publish: async ({handle, entry}) => {
		const doc = handle.doc()
		const a = document.createElement("a")
		a.download = `${entry.name}.automerge`
		a.href = URL.createObjectURL(new Blob([Automerge.save(doc)]))
		a.click()
	},
}
