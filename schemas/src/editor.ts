import {DocHandle} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import {z} from "zod"

export const EditorMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type EditorMetadata = z.infer<typeof EditorMetadata>

export const EditorAPI = z.object({
	handle: z.instanceof(DocHandle),
	setName: z.function().args(z.string()).returns(z.void()),

	cleanup: z.function().returns(z.void()),
	setStatusItems: z.function().args(z.array(z.string())).returns(z.void()),

	registerKeybinding: z
		.function()
		.args(z.string())
		.returns(z.function().args(z.instanceof(KeyboardEvent).optional())),
})

export type EditorAPI<T> = Omit<z.infer<typeof EditorAPI>, "handle"> & {
	handle: DocHandle<T>
}

export const Editor = z
	.object({
		render: z.function().args(EditorAPI).returns(z.instanceof(HTMLElement)),
	})
	.extend(EditorMetadata.shape)

export type Editor<T> = Omit<z.infer<typeof Editor>, "render"> & {
	render: (api: EditorAPI<T>) => HTMLElement
}

export const StoredEditor = stored("editor", EditorMetadata.shape)

export type StoredEditor = z.infer<typeof StoredEditor>
