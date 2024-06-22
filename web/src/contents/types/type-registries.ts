import type {AnyContentView} from "../../global"
import type {
	EditorViewConstructor,
	EditorViewElement,
	PreviewConstructor,
} from "../views/content-view.ts"
import type {ContentCoder} from "./coders.ts"
import typeRegistry from "./uniform-type-identifiers.ts"

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

export class ContentViewRegistry<T extends AnyContentView<any>> {
	private viewToTypes = new Map<T, lb.UniformTypeIdentifier[]>()
	private nameToView = new Map<string, T>()
	register(identifiers: lb.UniformTypeIdentifier[], element: T) {
		this.viewToTypes.set(element, identifiers)
	}

	remove(view: T) {
		this.viewToTypes.delete(view)
	}

	getstar = function* (
		registry: ContentViewRegistry<T>["viewToTypes"],
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
		return this.getstar(this.viewToTypes, type)
	}
}

export const coderRegistry = new ContentCoderRegistry()
export const editorViewRegistry = new ContentViewRegistry<
	EditorViewConstructor<any>
>()
// export const metadataViewRegistry = new ContentViewRegistry<MetadataView<any>>()
export const previewRegistry = new ContentViewRegistry<
	PreviewConstructor<any>
>()
export {typeRegistry}

const registries = {
	coders: coderRegistry,
	contentTypes: typeRegistry,
	views: {
		editor: editorViewRegistry,
		// metadata: metadataViewRegistry,
		preview: previewRegistry,
	},
}

export default registries
