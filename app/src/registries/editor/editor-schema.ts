import {DocHandle} from "@automerge/automerge-repo"
import {z} from "zod"

export const EditorMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type EditorMetadata = z.infer<typeof EditorMetadata>

export const Editor = z
	.object({
		render: z
			.function()
			.args(
				z.object({
					handle: z.instanceof(DocHandle),
					setName: z.function().args(z.string()).returns(z.void()),
					cleanup: z
						.function()
						.args(z.function().returns(z.void()))
						.returns(z.void()),
				})
			)
			.returns(z.instanceof(HTMLElement)),
	})
	.extend(EditorMetadata.shape)

export type Editor = z.infer<typeof Editor>
// how a compiled editor plugin is stored in automerge

export const StoredEditor = z
	.object({
		type: z.literal("editor"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(EditorMetadata.shape)

export type StoredEditor = z.infer<typeof StoredEditor>
