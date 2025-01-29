import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "../registry"
import type {Entry} from "../../documents/entry"
import {err, ok, type Result} from "true-myth/result"
import {StoredPublisher, type Publisher} from "./publisher-schema.ts"

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
