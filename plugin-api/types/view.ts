import type {DocHandle} from "@automerge/vanillajs"
import type {FileMenu} from "./file-menu.ts"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type {BembyModifier, BembyModifiers} from "@chee/bemby"
import type {JSX} from "solid-js"

export type ViewID = string & {__viewID: true}

interface ViewBase<API> {
	id: ViewID
	icon?: string
	displayName?: string
	category: string
	render(api: API): HTMLElement
}

interface FileViewBase<Shape, API> extends ViewBase<API> {
	schema: StandardSchemaV1<Shape>
	getFileMenu?(): FileMenu<Shape>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StandaloneViewAPI extends ViewAPIBase {}
export type StandaloneViewID = ViewID & {standalone: true}

export function normalizeStandaloneViewID(
	id: StandaloneViewID
): StandaloneViewID {
	if (id.startsWith("standalone:")) {
		return id.slice(11) as StandaloneViewID
	} else {
		return id
	}
}

export interface StandaloneView extends ViewBase<StandaloneViewAPI> {
	id: StandaloneViewID
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
	registerKeybinding(
		keybinding: string,
		action: (event: KeyboardEvent) => void
	): void
	isActive(): boolean
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
	toast: {
		show(
			title: JSX.Element,
			opts?: {
				body?: JSX.Element
				link?: JSX.Element
				modifiers?: BembyModifier | BembyModifiers
			}
		): void
	}
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

export type FileEditorRenderFunction<Shape> = FileEditor<Shape>["render"]
export type FileViewerRenderFunction<Shape> = FileViewer<Shape>["render"]
export type StandaloneViewRenderFunction = StandaloneView["render"]
