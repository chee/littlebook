import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import z from "zod"
import {err, ok, type Result} from "../lib/result.ts"
import type {Entry} from "../documents/entry.ts"
import {Registry} from "./registry.ts"

export class ViewerRegistry extends Registry<StoredViewer, Viewer> {
	constructor({repo}: {repo: Repo}) {
		super({repo, storedSchema: StoredViewer, schema: Viewer})
	}

	*viewers(entry: Entry) {
		for (const viewer of Object.values(this.records)) {
			if (typeof viewer.contentTypes == "string") continue
			if (viewer.contentTypes.includes(entry.contentType)) {
				yield viewer
			}
		}

		if (entry.conformsTo) {
			for (const viewer of Object.values(this.records)) {
				if (typeof viewer.contentTypes == "string") continue
				if (
					viewer.contentTypes.some(type =>
						entry.conformsTo?.includes(type)
					)
				) {
					yield viewer
				}
			}
		}

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

export const ViewerMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type ViewerMetadata = z.infer<typeof ViewerMetadata>

export const Viewer = z
	.object({
		render: z
			.function()
			.args(
				z.object({
					shadow: z.instanceof(ShadowRoot),
					file: z.unknown(),
					cleanup: z
						.function()
						.args(z.function().returns(z.void()))
						.returns(z.void()),
				})
			)
			.returns(z.void()),
	})
	.extend(ViewerMetadata.shape)

export type Viewer = z.infer<typeof Viewer>

export const StoredViewer = z
	.object({
		type: z.literal("viewer"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(ViewerMetadata.shape)

export type StoredViewer = z.infer<typeof StoredViewer>

export const ViewerRegistryContext = createContext<ViewerRegistry>()

export function useViewerRegistry() {
	const value = useContext(ViewerRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a ViewerRegistryContext")
	}
	return value
}
