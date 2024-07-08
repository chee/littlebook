import type {ChangeFn} from "@automerge/automerge"
import type {lb} from "../../types.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import UniformType, {
	type ResolvableUniformType,
	type ResolvableUniformTypes,
	type UniformTypeIdentifier,
} from "./uniform-type.ts"
import type {ParentComponent, Component} from "solid-js"

export interface ContentViewProps<ContentType extends lb.AnyContentValue> {
	doc: lb.Content<ContentType>
	change(fn: ChangeFn<lb.Content<ContentType>>): void
	handle: DocHandle<lb.Content<ContentType>>
	value: ContentType
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

	change!: (fn: ChangeFn<lb.Content<ContentType>>) => void
}

export type ContentViewWebComponent<T extends lb.AnyContentValue> =
	(new () => ContentViewElement<T>) & typeof ContentViewElement<T>

export class ContentViewRegistry {
	private registry = new Map<
		string | SolidContentView<any>,
		UniformTypeIdentifier[]
	>()
	register(
		type: ResolvableUniformTypes,
		element: string | SolidContentView<any>,
	) {
		const uniformTypes = Array.isArray(type) ? type : [type]
		this.registry.set(
			element,
			uniformTypes.map(type => UniformType.getIdentifier(type)),
		)
	}

	remove(view: string | SolidContentView<any>) {
		this.registry.delete(view)
	}

	getstar = function* (
		registry: ContentViewRegistry["registry"],
		type: ResolvableUniformType,
	) {
		const uniformType = UniformType.get(type)
		for (const [view, types] of registry.entries()) {
			if (types.includes(uniformType.identifier)) {
				yield view
			}
		}
		for (const [view, types] of registry.entries()) {
			for (const type of types) {
				if (uniformType.conforms(type)) {
					yield view
				}
			}
		}
	}

	get(type: ResolvableUniformType) {
		return this.getstar(this.registry, type)
	}

	getFirst(type: ResolvableUniformType) {
		return this.get(type).next().value
	}
}

export const contentViewRegistry = new ContentViewRegistry()
