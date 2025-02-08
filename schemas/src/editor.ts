import {DocHandle} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import {
	args,
	array,
	function_,
	instance,
	literal,
	object,
	pipe,
	returns,
	string,
	tuple,
	union,
	type InferOutput,
} from "valibot"

export const EditorMetadata = object({
	id: string(),
	displayName: string(),
	contentTypes: union([array(string()), literal("*")]),
})

export type EditorMetadata = InferOutput<typeof EditorMetadata>

export const EditorAPI = object({
	handle: instance(DocHandle),
	setName: pipe(function_(), args(tuple([string()]))),
	cleanup: pipe(function_(), args(tuple([function_()]))),
	setStatusItems: pipe(function_(), args(tuple([array(string())]))),
	registerKeybinding: pipe(function_(), args(tuple([string(), function_()]))),
})

export type EditorAPI<T> = InferOutput<typeof EditorAPI> & {
	handle: DocHandle<T>
}

export const Editor = object({
	render: pipe(
		function_(),
		args(
			tuple([
				object({
					handle: instance(DocHandle),
					cleanup: pipe(function_(), args(tuple([function_()]))),
				}),
			])
		),
		returns(instance(HTMLElement))
	),
	...EditorMetadata.entries,
})

export type Editor = InferOutput<typeof Editor>

export const StoredEditor = stored("editor", EditorMetadata.entries)

export type StoredEditor = InferOutput<typeof StoredEditor>
