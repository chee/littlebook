import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {type ContentTypeRegistry} from "./content-type-registry.ts"
import {type View, type Entry} from "@pointplace/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ViewRegistry extends Registry<"view", View<any>> {
	#contentTypeRegistry: ContentTypeRegistry

	constructor({
		repo,
		contentTypeRegistry,
	}: {
		repo: Repo
		contentTypeRegistry: ContentTypeRegistry
	}) {
		super({
			repo,
			typename: "view",
		})
		this.#contentTypeRegistry = contentTypeRegistry
	}

	/*
	 * a way to add these:
	 * 1. cli: build the bundle
	 * 2. cli: cat bundle.js|base64 -w0|pbcopy
	 * 3. browser: repo.find(url).change(doc => doc.bytes = Uint8Array.fromBase64(`⌘+v`))<RET>
	 */

	// this yields in three steps to allow for more specific matches to be yielded first
	*views(entry: Entry) {
		const seen = new Set<View<unknown>>()
		for (const view of Object.values(this.records)) {
			if (typeof view.contentTypes == "string") continue
			if (view.contentTypes.includes(entry.contentType)) {
				seen.add(view)
				yield view
			}
		}

		const entryType = this.#contentTypeRegistry.get(entry.contentType)

		if (entryType && entryType.conformsTo) {
			for (const view of Object.values(this.records)) {
				if (typeof view.contentTypes == "string") continue
				if (
					view.contentTypes.some(type =>
						entryType.conformsTo?.includes(type)
					) &&
					!seen.has(view)
				) {
					seen.add(view)
					yield view
				}
			}
		}

		for (const view of Object.values(this.records)) {
			if (view.contentTypes == "*" && !seen.has(view)) {
				seen.add(view)
				yield view
			}
		}
	}
}

export const ViewRegistryContext = createContext<ViewRegistry>()

export function useViewRegistry() {
	const value = useContext(ViewRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a ViewRegistryContext")
	}
	return value
}
