import {createContext, useContext} from "solid-js"
import type z from "zod"
import type {ViewerRegistry} from "./viewer-registry.ts"

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
