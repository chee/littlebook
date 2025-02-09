import {DocHandle} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import {array, literal, object, string, union, z} from "zod"

export const EditorMetadata = object({
	id: string(),
	displayName: string(),
	contentTypes: union([array(string()), literal("*")]),
})

export type EditorMetadata = z.infer<typeof EditorMetadata>

export const EditorAPI = object({
	handle: z.instanceof(DocHandle),
	setName: z.function().args(string()).returns(z.void()),
	cleanup: z.function().args().returns(z.void()),
	setStatusItems: z.function().args(array(string())).returns(z.void()),
	registerKeybinding: z.function().args(string(), z.function()),
})

export type EditorAPI<T> = Omit<z.infer<typeof EditorAPI>, "handle"> & {
	handle: DocHandle<T>
}

export const Editor = object({
	render: z.function().args(EditorAPI).returns(z.instanceof(HTMLElement)),
}).extend(EditorMetadata.shape)

export type Editor<T> = Omit<z.infer<typeof Editor>, "render"> & {
	render: (api: EditorAPI<T>) => HTMLElement
}

export const StoredEditor = stored("editor", EditorMetadata.shape)

export type StoredEditor = z.infer<typeof StoredEditor>
