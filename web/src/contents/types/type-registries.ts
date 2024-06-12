import type {FunctionalComponent} from "preact"
import typeRegistry from "./uniform-type-identifiers.ts"
import type {ContentCoder} from "./coders.ts"
import type {ChangeFn} from "@automerge/automerge-repo"

export interface ContentViewProps<ContentType extends lb.AnyContent> {
	file: lb.File
	changeFile(fn: ChangeFn<lb.File>): void
	content: lb.Content<ContentType>
	changeContent(fn: ChangeFn<lb.Content<ContentType>>): void
}

export type ContentView<ContentType extends lb.AnyContent> =
	FunctionalComponent<ContentViewProps<ContentType>>

export class ContentCoderRegistry {
	private registry = new Map<lb.UniformTypeIdentifier, ContentCoder<any>>()

	register<Type extends lb.AnyContent>(
		identifier: lb.UniformTypeIdentifier,
		coder: ContentCoder<Type>,
	) {
		if (this.registry.get(identifier)) {
			throw new Error(
				`there is already a coder for ${identifier}. remove it first`,
			)
		}
		this.registry.set(identifier, coder)
	}

	get(identifier: lb.UniformTypeIdentifier) {
		return this.registry.get(identifier)
	}

	remove(identifier: lb.UniformTypeIdentifier, coder: ContentCoder<any>) {
		if (this.get(identifier) == coder) {
			this.registry.delete(identifier)
		} else {
			// todo throw or just silently accept?
		}
	}
}

export class ContentViewRegistry {
	private registry = new Map<ContentView<any>, lb.UniformTypeIdentifier[]>()
	register<Type extends lb.AnyContent>(
		identifiers: lb.UniformTypeIdentifier[],
		view: ContentView<Type>,
	) {
		this.registry.set(view, identifiers)
	}

	registerAll(
		items: {view: ContentView<any>; types: lb.UniformTypeIdentifier[]}[],
	) {
		for (const {view, types} of items) {
			this.register(types, view)
		}
	}

	remove(view: ContentView<any>) {
		this.registry.delete(view)
	}

	getstar = function* (
		registry: ContentViewRegistry["registry"],
		type: lb.UniformTypeIdentifier,
	) {
		for (const [view, types] of registry.entries()) {
			if (types.includes(type)) {
				yield view
			}
		}
		for (const [view, types] of registry.entries()) {
			if (typeRegistry.conformsToAny(type, types)) {
				yield view
			}
		}
	}

	get(type: lb.UniformTypeIdentifier) {
		return this.getstar(this.registry, type)
	}
}

export const coderRegistry = new ContentCoderRegistry()
export const contentViewRegistry = new ContentViewRegistry()
export const metadataViewRegistry = new ContentViewRegistry()
// todo or displayView or outputView or liveView
export const previewRegistry = new ContentViewRegistry()
export {typeRegistry}
