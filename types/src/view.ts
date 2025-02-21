import {DocHandle} from "@automerge/automerge-repo"
import {FileMenu} from "./file-menu.js"
import type {StandardSchemaV1} from "@standard-schema/spec"

interface ViewBase<Shape> {
	id: string
	displayName: string
	schema: StandardSchemaV1<Shape>
	category: string
}

export interface Editor<Shape = unknown> extends ViewBase<Shape> {
	category: "editor"
	getFileMenu?: () => FileMenu<Shape>
	render: (api: EditorAPI<Shape>) => HTMLElement
}

export interface ReadOnlyView<Shape = unknown> extends ViewBase<Shape> {
	category: "readonly"
	getFileMenu?: () => FileMenu<Shape>
	render: (api: ReadOnlyViewAPI<Shape>) => HTMLElement
}

interface ViewAPIBase<Shape> {
	updateStatusItems(items: string[]): void
	registerKeybinding(keybinding: string, action: () => void): void
	isActive(): boolean
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
}

export interface ReadOnlyViewAPI<Shape> extends ViewAPIBase<Shape> {
	doc(): Shape
	onChange(fn: () => {}): void
}

export type View<Shape = unknown> = Editor<Shape> | ReadOnlyView<Shape>

// todo pass a `adoptStylesheet` or `addCSS(string)`
// todo pass a `callCommand`
// todo maybe an `updateIndex` for search
// but maybe that's the content-type's job or maybe a
// Indexer is another thing
export interface EditorAPI<Shape> extends ViewAPIBase<Shape> {
	handle: DocHandle<Shape>
	updateName(name: string): void
}
