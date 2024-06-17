import typeRegistry from "./uniform-type-identifiers.ts"
import type {ContentCoder} from "./coders.ts"

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

export type ContentViewName<T extends lb.ContentView<any>> = string & {
	"__content-view": T
}

export class ContentViewRegistry {
	private registry = new Map<ContentViewName<any>, lb.UniformTypeIdentifier[]>()
	register(
		identifiers: lb.UniformTypeIdentifier[],
		element: ContentViewName<any>,
	) {
		this.registry.set(element, identifiers)
	}

	registerAll(
		items: {view: ContentViewName<any>; types: lb.UniformTypeIdentifier[]}[],
	) {
		for (const {view, types} of items) {
			this.register(types, view)
		}
	}

	remove(view: ContentViewName<any>) {
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
export const previewRegistry = new ContentViewRegistry()
export {typeRegistry}

const registries = {
	coders: coderRegistry,
	contentTypes: typeRegistry,
	views: {
		content: contentViewRegistry,
		metadata: metadataViewRegistry,
		preview: previewRegistry,
	},
}

export default registries
