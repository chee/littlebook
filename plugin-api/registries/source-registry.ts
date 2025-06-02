import {type Repo} from "@automerge/vanillajs"
import {Registry} from "./registry.ts"
import type {Source} from "../types/source.ts"

export class SourceRegistry extends Registry<"source", Source> {
	constructor({repo}: {repo: Repo}) {
		super({repo, doctype: "source"})
	}

	*sources() {
		for (const source of Object.values(this.records)) {
			yield source
		}
	}
}
