import {DocHandle} from "@automerge/automerge-repo"
import {stored} from "./util.js"
import {FileMenu} from "./filemenu.js"
import * as v from "valibot"
import type {StandardSchemaV1} from "@standard-schema/spec"

// todo pass a `adoptStylesheet` or `addCSS(string)`
// todo pass a `callCommand`
export interface EditorAPI<Shape> {
	handle: DocHandle<Shape>
	updateName(name: string): void
	updateStatusItems(items: string[]): void
	registerKeybinding(keybinding: string): (e: KeyboardEvent) => void
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
	isActive(): boolean
}

export const EditorMetadata = v.object({
	id: v.string(),
	displayName: v.string(),
	contentTypes: v.union([v.array(v.string()), v.literal("*")]),
})

export type EditorMetadata = v.InferOutput<typeof EditorMetadata>

export type Editor<Shape = unknown> = EditorMetadata & {
	getFileMenu?: () => FileMenu<Shape>
	render: (api: EditorAPI<Shape>) => HTMLElement
	schema?: StandardSchemaV1<Shape>
}

export const StoredEditor = stored("editor", EditorMetadata.entries)

export type StoredEditor = v.InferOutput<typeof StoredEditor>
