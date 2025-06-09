import {type Repo} from "@automerge/vanillajs"
import {Registry} from "./registry.ts"
import type {View} from "../types/view.ts"

export class ViewRegistry extends Registry<"view", View<any>> {
	constructor({repo}: {repo: Repo}) {
		super({repo, doctype: "view"})
	}

	*views(file: unknown) {
		for (const view of Object.values(this.records)) {
			if (view.category != "standalone" && !view.schema) {
				console.warn("non-standalone view has no schema", view)
				continue
			}
			if (view.category == "standalone" || view.category == "indicator") {
				// yield view
			} else {
				const result = view.schema["~standard"].validate(file)
				if (result instanceof Promise) {
					console.warn("schemas cannot be async")
					continue
				}
				if (result.issues) {
					continue
				} else {
					yield view
				}
			}
		}
	}

	*standalones() {
		for (const view of Object.values(this.records)) {
			if (view.category == "standalone") {
				yield view
			}
		}
	}

	*indicators(file: unknown) {
		for (const view of Object.values(this.records)) {
			if (view.category != "standalone" && !view.schema) {
				console.warn("non-standalone view has no schema", view)
				continue
			}
			if (view.category == "indicator") {
				const result = view.schema["~standard"].validate(file)
				if (result instanceof Promise) {
					console.warn("view schemas cannot be async")
					continue
				}
				if (result.issues) continue
				else yield view
			}
		}
	}
}
