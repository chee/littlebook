import {DocHandle} from "@automerge/automerge-repo"
import {args, standard, stored} from "./util.js"
import {inferFileMenu} from "./filemenu.js"
import * as v from "valibot"
import type {StandardSchemaV1} from "@standard-schema/spec"

// todo pass a `callCommand`
// export function inferEditorAPI<Document extends StandardSchemaV1>(
// 	_schema: Document
// ) {
// 	return v.object({
// 		handle: v.instance(DocHandle) as v.GenericSchema<
// 			DocHandle<StandardSchemaV1.InferOutput<Document>>
// 		>,
// 		updateName: v.pipe(v.function(), args(v.string()), v.returns(v.void())),
// 		updateStatusItems: v.pipe(
// 			v.function(),
// 			args(v.array(v.string())),
// 			v.returns(v.void())
// 		),
// 		registerKeybinding: v.pipe(
// 			v.function(),
// 			args(v.string()),
// 			v.returns(v.pipe(v.function(), args(v.instance(KeyboardEvent))))
// 		),
// 		onCleanup: v.pipe(v.function(), args(v.function())),
// 		onMount: v.pipe(v.function(), args(v.function())),
// 		isActive: v.pipe(v.function(), v.returns(v.boolean())),
// 	})
// }

export interface EditorAPI<Shape> {
	handle: DocHandle<Shape>
	updateName(name: string): void
	updateStatusItems(items: string[]): void
	registerKeybinding(keybinding: string): (e: KeyboardEvent) => void
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
	isActive(): boolean
}

// export const AnyEditorAPI = inferEditorAPI(v.any())
// export const UnknownEditorAPI = inferEditorAPI(v.unknown())
// export type AnyEditorAPI = v.InferOutput<typeof AnyEditorAPI>
// export type UnknownEditorAPI = v.InferOutput<typeof UnknownEditorAPI>

// export type EditorAPI<Schema extends v.GenericSchema> = v.InferOutput<
// 	ReturnType<typeof inferEditorAPI<Schema>>
// >

// export function inferEditor<Schema extends StandardSchemaV1>(schema: Schema) {
// 	return v.object({
// 		getFileMenu: v.optional(
// 			v.pipe(v.function(), v.returns(inferFileMenu(schema)))
// 		),
// 		render: v.pipe(
// 			v.function(),
// 			args(inferEditorAPI(schema)),
// 			v.returns(v.instance(HTMLElement))
// 		),
// 		schema: v.optional(standard(schema)),
// 		...EditorMetadata.entries,
// 	})
// }

// export type Editor<Shape> = v.InferOutput<
// 	ReturnType<typeof inferEditor<StandardSchemaV1<Shape>>>
// >

export const EditorMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
})

export type EditorMetadata = v.InferOutput<typeof EditorMetadata>

export type Editor<Shape> = EditorMetadata & {
	getFileMenu?: () => ReturnType<FileMenu<Shape>>
	render: (api: EditorAPI<Shape>) => HTMLElement
	schema?: Shape
}

export const StoredEditor = stored("editor", EditorMetadata.entries)

export type StoredEditor = v.InferOutput<typeof StoredEditor>
