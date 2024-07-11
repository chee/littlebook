import type {lb} from "../../types.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import UniformType, {
	type ResolvableUniformType,
	type UniformTypeIdentifier,
} from "./uniform-type.ts"
import type {ParentComponent, Component} from "solid-js"
import {createStore} from "solid-js/store"
import {createSingletonRoot} from "@solid-primitives/rootless"
import {pluginStore} from "../../plugins/plugins.ts"

export interface ContentViewProps<ContentType extends lb.AnyContentValue> {
	content: lb.Content<ContentType>
	handle: DocHandle<lb.Content<ContentType>>
	file: lb.File
}

// todo are these useful?
export type ContentViewComponent<
	T extends lb.AnyContentValue,
	C extends (props: any) => any | {new (props: any): C},
> = (props: ContentViewProps<T>) => ReturnType<C>

export type SolidContentView<T extends lb.AnyContentValue> =
	| Component<ContentViewProps<T>>
	| ParentComponent<ContentViewProps<T>>

/**
 * this guy is used in the content-editor view, the correct values are always
 * set before it is attached to the page
 */
export abstract class ContentViewElement<ContentType extends lb.AnyContentValue>
	extends HTMLElement
	implements ContentViewProps<ContentType>
{
	protected _content!: lb.Content<ContentType>
	protected _handle!: DocHandle<lb.Content<ContentType>>
	protected _file!: lb.File

	set content(content) {
		this._content = content
	}

	get content() {
		return this._content
	}

	set handle(handle) {
		this._handle = handle
	}

	get handle() {
		return this._handle
	}

	set file(file) {
		this._file = file
	}

	get file() {
		return this._file
	}
}

export type ContentViewWebComponent<T extends lb.AnyContentValue> =
	(new () => ContentViewElement<T>) & typeof ContentViewElement<T>

export type ContentViewName = string & {"__content-view-name": true}

let contentViewStore = createSingletonRoot(() =>
	createStore({
		views: {} as Record<UniformTypeIdentifier, ContentViewName[]>,
		displayNames: {} as Record<ContentViewName, string>,
		kinds: {} as Record<ContentViewName, "editor" | "preview">,
		ready: {} as Record<ContentViewName, boolean>,
	}),
)

export const contentViewRegistry = {
	add(view: lb.plugins.ContentViewDescriptor & {kind: "editor" | "preview"}) {
		let uniformTypes = (
			Array.isArray(view.contentTypes) ? view.contentTypes : [view.contentTypes]
		) as UniformTypeIdentifier[]
		let [cv, update] = contentViewStore()
		let elementName = view.element as ContentViewName
		for (let type of uniformTypes) {
			if (type in cv.views) {
				update("views", type, cv.views[type]?.length || 0, elementName)
			} else {
				update("views", type, [elementName])
			}
		}
		update("displayNames", elementName, view.displayName)
		update("kinds", elementName, view.kind)
		update("ready", elementName, false)
	},
	addEditor(view: lb.plugins.ContentViewDescriptor) {
		contentViewRegistry.add({...view, kind: "editor"})
	},
	addPreview(view: lb.plugins.ContentViewDescriptor) {
		contentViewRegistry.add({...view, kind: "preview"})
	},
	get: function* (type: ResolvableUniformType) {
		try {
			let [cv] = contentViewStore()
			let uniformType = UniformType.get(type)
			if (uniformType.identifier in cv.views) {
				yield* cv.views[uniformType.identifier]
			}

			for (const supertype of uniformType.supertypes) {
				if (supertype.identifier in cv.views) {
					yield* cv.views[supertype.identifier]
				}
			}
		} catch (error) {
			console.warn(error)
		}
	},
	getTypes: function* (element: ContentViewName) {
		let [cv] = contentViewStore()
		for (const [type, views] of Object.entries(cv.views)) {
			if (views.includes(element)) {
				yield type as UniformTypeIdentifier
			}
		}
	},
	getDisplayName(element: ContentViewName) {
		let [cv] = contentViewStore()
		return cv.displayNames[element]
	},
	getKind(element: ContentViewName) {
		let [cv] = contentViewStore()
		return cv.kinds[element]
	},
	getFirst(type: ResolvableUniformType) {
		return contentViewRegistry.get(type).next().value
	},
	getEditors: function* () {
		let [cv] = contentViewStore()
		for (let [name, kind] of Object.entries(cv.kinds)) {
			if (kind == "editor") {
				yield name as ContentViewName
			}
		}
	},
	ready(element: ContentViewName) {
		let [cv] = contentViewStore()
		return cv.ready[element]
	},
	async request(identifier: ContentViewName) {
		let [cv, update] = contentViewStore()
		let [plugins] = pluginStore
		let activator = plugins.views[identifier]
		if (activator && !activator.active && !cv.ready[identifier]) {
			await activator.activate()
			update("ready", identifier, true)
		} else {
			console.warn(`can't activate ${identifier}. never heard of her`)
		}
	},
}
