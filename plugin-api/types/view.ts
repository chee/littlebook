import type {DocHandle} from "@automerge/vanillajs"
import type {FileMenu} from "./file-menu.ts"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type {BembyModifier, BembyModifiers} from "@chee/bemby"
import type {JSX} from "solid-js"

/* todo
 * what are some other kinds of views that are missing?
 * - sidebar widgets
 * - views over multiple files
 * - views over the whole repo
 */

export type ViewID = string & {__viewID: true}

type ViewStyle = string
type MaybePromise<T> = T | Promise<T>
type MaybeModule<T> = T | {default: T}

export type ViewStylesType = MaybePromise<MaybeModule<ViewStyle>>

interface ViewBase<API> {
	id: ViewID
	icon?: string
	displayName?: string
	category: string
	styles?: ViewStylesType | ViewStylesType[]
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
	// todo this should be a plugin concern, not a view concern.
	// and maybe it's just registerTask and it requires an icon and display name and a schema
	// that i guess would be registerFileTask. there's also other tasks. registerStartupTask registerScheduledTask
	// nah, these are all just tasks with categories. maybe a sink is also a task? or... idk, a sink is maybe different.
	//

	// and then we need sinks. sinks are maybe just functions
	updateStatusItems(items: string[]): void
	// todo maybe this is a plugin concern? and then `when` should know about the current view

	registerKeybinding(
		keybinding: string,
		action: (event: KeyboardEvent) => void
	): void
	// todo stick this on pluginAPI
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

	isActive(): boolean
	onCleanup(cleanup: () => void): void
	onMount(mount: () => void): void
	shadow: ShadowRoot
}

export interface FileViewerAPI<Shape> extends ViewAPIBase {
	doc(): Shape
	onChange(fn: () => void): void
}

// todo pass a `callCommand`
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
