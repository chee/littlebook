import {Registry} from "./registry.ts"
import type {Publisher} from "../types/publisher.ts"
import type {Repo} from "@automerge/vanillajs"

export class PublisherRegistry extends Registry<"publisher", Publisher<any>> {
	constructor({repo}: {repo: Repo}) {
		super({repo, doctype: "publisher"})
	}

	*publishers(file: unknown): Generator<Publisher<any>> {
		for (const sink of Object.values(this.records)) {
			if (file instanceof Blob) {
				// todo do something with .patterns and .mimes
				continue
			} else if ("schema" in sink) {
				const result = sink.schema["~standard"].validate(file)
				if (result instanceof Promise) {
					console.warn("schemas cannot be async")
					continue
				}
				if (result.issues) {
					continue
				} else {
					yield sink
				}
			}
		}
	}
}
