import type {ChangeFn} from "@automerge/automerge"
import type {lb} from "../types.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import {type UniformTypeIdentifier, UniformType} from "./uniform-type.ts"

export interface EditorViewProps<ContentType extends lb.AnyContent> {
	doc: lb.Content<ContentType>
	change(fn: ChangeFn<lb.Content<ContentType>>): void
	handle: DocHandle<lb.Content<ContentType>>
	value: ContentType
	file: lb.File
}

export interface PreviewProps<ContentType extends lb.AnyContent> {
	value: ContentType
}

// todo are these useful?
export type EditorViewComponent<
	T extends lb.AnyContent,
	C extends (props: any) => any | {new (props: any): C},
> = (props: EditorViewProps<T>) => ReturnType<C>

export type PreviewComponent<
	T extends lb.AnyContent,
	C extends (props: any) => any | {new (props: any): C},
> = (props: PreviewProps<T>) => ReturnType<C>

// todo rethink all of this
// todo make more webby with events
export abstract class EditorViewElement<ContentType extends lb.AnyContent>
	extends HTMLElement
	implements EditorViewProps<ContentType>
{
	protected _doc!: lb.Content<ContentType>
	protected _handle!: DocHandle<lb.Content<ContentType>>
	protected _value!: ContentType
	protected _file!: lb.File

	set doc(doc) {
		this._doc = doc
	}

	get doc() {
		return this._doc
	}

	set handle(handle) {
		this._handle = handle
	}

	get handle() {
		return this._handle
	}

	set value(value) {
		this._value = value
	}

	get value() {
		return this._value
	}

	set file(file) {
		this._file = file
	}

	get file() {
		return this._file
	}

	change(_fn: ChangeFn<lb.Content<ContentType>>) {}
}

export abstract class PreviewElement<ContentType extends lb.AnyContent>
	extends HTMLElement
	implements PreviewProps<ContentType>
{
	protected _value!: ContentType
	set value(value) {
		this._value = value
		this.dispatchEvent(new CustomEvent("change"))
	}

	get value() {
		return this._value
	}
}

export type EditorViewConstructor<ContentType extends lb.AnyContent> =
	(new () => EditorViewElement<ContentType>) &
		typeof EditorViewElement<ContentType> & {
			displayName?: string
			name: string
		}

export type PreviewConstructor<ContentType extends lb.AnyContent> =
	(new () => PreviewElement<ContentType>) &
		typeof PreviewElement<ContentType> & {displayName?: string; name: string}

export type ContentViewName<T extends lb.AnyContentView<any>> = string & {
	"__content-view": T
}

/*
 * okay so what do i want here? probably i want the plugin to provide a function
 * that returns a custom element (or returns a promise that resolves to a custom
 * element) and then somewhere i want to register that custom element in the
 * registry, when it is needed and give it an id (which could be randomly
 * generated, or something the plugin defines) for the name it has when it is used, ah this should just be seomthing i require to be on the view
 */
export class ContentViewRegistry<T extends lb.AnyContentView<any>> {
	private registry = new Map<T, UniformTypeIdentifier[]>()
	register(
		type:
			| UniformType
			| UniformTypeIdentifier
			| (UniformType | UniformTypeIdentifier)[],
		element: T,
	) {
		const uniformTypes = Array.isArray(type) ? type : [type]
		this.registry.set(
			element,
			uniformTypes.map(type => UniformType.getIdentifier(type)),
		)
	}

	remove(view: T) {
		this.registry.delete(view)
	}

	getstar = function* (
		registry: ContentViewRegistry<T>["registry"],
		type: UniformType | UniformTypeIdentifier,
	) {
		const uniformType = UniformType.get(type)
		for (const [view, types] of registry.entries()) {
			if (types.includes(uniformType.identifier)) {
				yield view
			}
		}
		for (const [view, types] of registry.entries()) {
			for (const type of types) {
				if (uniformType.conforms(UniformType.get(type))) {
					yield view
				}
			}
		}
	}

	get(type: UniformType | UniformTypeIdentifier) {
		return this.getstar(this.registry, type)
	}

	getFirst(type: UniformType | UniformTypeIdentifier) {
		return this.get(type).next().value
	}
}

export const editorViewRegistry = new ContentViewRegistry<
	EditorViewConstructor<any>
>()

export const previewRegistry = new ContentViewRegistry<
	PreviewConstructor<any>
>()
