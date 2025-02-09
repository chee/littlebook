import {DocHandle} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import * as v from "valibot"

export const EditorMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
})

export type EditorMetadata = v.InferOutput<typeof EditorMetadata>

export const EditorAPI = v.object({
	handle: v.instance(DocHandle),
	setName: v.pipe(
		v.function(),
		v.args(v.tuple([v.string()])),
		v.returns(v.void())
	),
	cleanup: v.pipe(v.function(), v.returns(v.void())),
	setStatusItems: v.pipe(
		v.function(),
		v.args(v.tuple([v.array(v.string())])),
		v.returns(v.void())
	),
	registerKeybinding: v.pipe(
		v.function(),
		v.args(v.tuple([v.string()])),
		v.returns(v.function())
	),
})

export type EditorAPI<T> = Omit<v.InferOutput<typeof EditorAPI>, "handle"> & {
	handle: DocHandle<T>
}

export const Editor = v.object({
	render: v.pipe(
		v.function(),
		v.args(v.tuple([EditorAPI])),
		v.returns(v.instance(HTMLElement))
	),
	...EditorMetadata.entries,
})

export type Editor<T> = Omit<v.InferOutput<typeof Editor>, "render"> & {
	render: (api: EditorAPI<T>) => HTMLElement
}

export const StoredEditor = stored("editor", EditorMetadata.entries)

export type StoredEditor = v.InferOutput<typeof StoredEditor>
