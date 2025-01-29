import {type Repo} from "@automerge/automerge-repo"
import {err, ok, type Result} from "true-myth/result"
import type {Entry} from "../../documents/entry.ts"
import {Registry} from "../registry.ts"
import {StoredViewer, Viewer} from "./viewer-schema.ts"

export class ViewerRegistry extends Registry<StoredViewer, Viewer> {
	constructor({repo}: {repo: Repo}) {
		super({repo, storedSchema: StoredViewer, schema: Viewer, name: "viewer"})
	}

	*viewers(entry: Entry) {
		for (const viewer of Object.values(this.records)) {
			if (typeof viewer.contentTypes == "string") continue
			if (viewer.contentTypes.includes(entry.contentType)) {
				yield viewer
			}
		}

		// if (entry.conformsTo) {
		// 	for (const viewer of Object.values(this.records)) {
		// 		if (typeof viewer.contentTypes == "string") continue
		// 		if (
		// 			viewer.contentTypes.some(type =>
		// 				entry.conformsTo?.includes(type)
		// 			)
		// 		) {
		// 			yield viewer
		// 		}
		// 	}
		// }

		for (const viewer of Object.values(this.records)) {
			if (viewer.contentTypes == "*") {
				yield viewer
			}
		}
	}

	get(id: string): Result<Viewer, Error> {
		const viewer = this.records[id]
		return viewer ? ok(viewer) : err(new Error(`viewer not found: ${id}`))
	}
}
