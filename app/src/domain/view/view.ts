import type {DocHandle} from "@automerge/vanillajs"
import type {FileMenu} from "../../domain/file/file-menu.ts"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type {AutomergeURL} from "../../core/sync/url.ts"
export type ViewURL = AutomergeURL & {type: "view"}

interface ViewBase<API> {
	id: string
	displayName: string
	category: string
	render(api: API): HTMLElement
}

interface FileViewBase<Shape, API> extends ViewBase<API> {
	schema: StandardSchemaV1<Shape>
	getFileMenu?(): FileMenu<Shape>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StandaloneViewAPI extends ViewAPIBase {}
export interface StandaloneView extends ViewBase<StandaloneViewAPI> {
	category: "standalone"
}

export interface FileEditor<Shape = unknown>
	extends FileViewBase<Shape, FileEditorAPI<Shape>> {
	category: "editor"
}

export interface FileViewer<Shape = unknown>
	extends FileViewBase<Shape, FileViewerAPI<Shape>> {
	category: "readonly"
}

interface ViewAPIBase {
	updateStatusItems(items: string[]): void
	registerKeybinding(keybinding: string, action: () => void): void
	isActive(): boolean
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
}

export interface FileViewerAPI<Shape> extends ViewAPIBase {
	doc(): Shape
	onChange(fn: () => void): void
}

// todo pass a `adoptStylesheet` or `addCSS(string)`
// todo pass a `callCommand`
// todo maybe an `updateIndex` for search
// but maybe that's the content-type's job or maybe a
// Indexer is another thing
export interface FileEditorAPI<Shape> extends ViewAPIBase {
	handle: DocHandle<Shape>
	updateName(name: string): void
}

export type View<Shape = unknown> =
	| FileEditor<Shape>
	| FileViewer<Shape>
	| StandaloneView
