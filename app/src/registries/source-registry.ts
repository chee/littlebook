import {type Repo} from "@automerge/vanillajs"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import type {Source} from "@littlebook/types"

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

export const SourceRegistryContext = createContext<SourceRegistry>()

export function useSourceRegistry() {
	const value = useContext(SourceRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a SourceRegistryContext")
	}
	return value
}
