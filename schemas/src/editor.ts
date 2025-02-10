import {DocHandle, Repo} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import {z} from "zod"
import {stdSchema} from "./standard.js"
import {StandardSchemaV1} from "@standard-schema/spec"
import {FileMenuItem} from "./filemenu.js"

export const EditorMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type EditorMetadata = z.infer<typeof EditorMetadata>

// todo pas a `callCommand`
export const EditorAPI = z.object({
	handle: z.instanceof(DocHandle),
	updateName: z.function().args(z.string()).returns(z.void()),
	updateStatusItems: z.function().args(z.string().array()).returns(z.void()),
	registerKeybinding: z
		.function()
		.args(z.string())
		.returns(z.function().args(z.instanceof(KeyboardEvent).optional())),
	onCleanup: z.function().returns(z.void()),
	onMount: z.function().returns(z.void()),
	isActive: z.function().returns(z.boolean()),
})

export type EditorAPI<T> = Omit<z.infer<typeof EditorAPI>, "handle"> & {
	handle: DocHandle<T>
}

// todo inferEditor like the pattern in content-type.ts
export const Editor = z
	.object({
		getFileMenu: z.function().args().returns(FileMenuItem.array()).optional(),
		render: z.function().args(EditorAPI).returns(z.instanceof(HTMLElement)),
		schema: stdSchema(z.unknown()).optional(),
	})
	.extend(EditorMetadata.shape)

// ^ instead of this
export type Editor<T> = Omit<z.infer<typeof Editor>, "render"> & {
	render: (api: EditorAPI<T>) => HTMLElement
	schema?: StandardSchemaV1<T>
}

export const StoredEditor = stored("editor", EditorMetadata.shape)

export type StoredEditor = z.infer<typeof StoredEditor>
