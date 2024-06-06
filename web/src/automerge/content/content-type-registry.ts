import type {DocHandle, Repo} from "@automerge/automerge-repo"
import type {AutomergeValue, ChangeFn} from "@automerge/automerge/next"
import type {FC} from "preact/compat"

// todo the Type here should maybe be a lb.Content type rather than a loose type
export interface ContentCreator<Type extends AutomergeValue> {
	// todo does it seem sensible to define valid extensions here
	// in case we try to assign a handler for a file that can't
	// handle that ext?
	extensions: string[]
	// todo create functions for files
	// todo should this maybe return some kind of Content class instead of a
	// DocHandle? something that _has_ a DocHandle instead and also has other
	// content operations like .getBacklink() and .getIndexable() and
	// .search(term) etc and .share() etc? probably!
	// TODO oh almost certainly! should also have a .change() that handles how to
	// perform a .change when the data changes maybe? though i guess the view is
	// in charge of that? lmao i guess what i mean is... this should be a
	// controller lol i reïnvented MVC
	// does this need to be able to take a file? (repo: Repo, file: lb.File)
	create(repo: Repo): DocHandle<lb.Content<Type>>
}

// todo yes, a ContentManager is gonna need to exist, that is also the arg
// passed into here with a nice API that abstracts away some of the Automerge of
// it all. you'll probably still be able to get the underlying handle, though,
// if you want to do some weird shit.
export type ContentView<Type extends AutomergeValue> = FC<{
	content: Readonly<lb.Content<Type>>
	changeContent(changeFn: ChangeFn<lb.Content<Type>>): void
}>

export class ContentTypeRegistry {
	// todo should there be able to be multiple handlers for a file so we can
	// let the user choose a view/creator for a file?
	#creators = new Map<string, ContentCreator<any>>()
	#views = new Map<string, ContentView<any>>()

	define<Type extends AutomergeValue>(
		ext: string,
		creator: ContentCreator<Type>,
		view: ContentView<Type>,
	) {
		this.defineCreator(ext, creator)
		this.defineView(ext, view)
	}

	defineCreator<Type extends AutomergeValue>(
		ext: string,
		creator: ContentCreator<Type>,
	) {
		if (this.#creators.has(ext)) {
			throw new Error(
				`sorry, ${ext} already has a creator registered. unregister it first.`,
			)
		}
		this.#creators.set(ext, creator)
	}

	defineView<Type extends AutomergeValue>(
		ext: string,
		view: ContentView<Type>,
	) {
		if (this.#views.has(ext)) {
			throw new Error(
				`sorry, ${ext} already has a view registered. unregister it first.`,
			)
		}
		this.#views.set(ext, view)
	}

	getCreator(ext: string) {
		return this.#creators.get(ext)
	}

	getView(ext: string) {
		return this.#views.get(ext)
	}
}

export default new ContentTypeRegistry()
