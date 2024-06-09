import type {ContentCreator, ContentView} from "./content-type.ts"

export class ContentTypeRegistry {
	#creators = new Map<lb.ContentTypeId, ContentCreator<any>>()
	define(creator: ContentCreator<any>) {
		if (this.#creators.has(creator.type)) {
			throw new Error(`Content Creator already registered for ${creator.type}`)
		}
		this.#creators.set(creator.type, creator)
	}
}

export default new ContentTypeRegistry()
