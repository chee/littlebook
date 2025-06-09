/*
 ok so here are some things i want to be able to do:
 - be able to turn a doc(+dochandle?) into a file (exported to disk)
 - be able to call API due to the contents of a file
 - be able to take a doc(+dochandle?) and export the whole automerge doc with history
 - a view might want to do this:
     1. ask another source to create a file
	  2. edit it in another view
	  3. get a URL for that file
	  ^ this might be a separate thing
 - a view might want to get a filesystemfile for the things it knows about,
   - may not want to have to implement the code for publishing all its referenced URLs
	- though... huh... maybe that's fine too
 - ok so what if we say for now that publishers have no category
 - they're a function that returns a MaybePromise<void>
 - and the api has .download() on it, so that's only implemented once
 */
import type {DocHandle} from "@automerge/vanillajs"
import type {StandardSchemaV1} from "@standard-schema/spec"

type MaybePromise<T> = T | Promise<T>

interface PublisherBase<API> {
	id: string
	icon?: string
	displayName?: string
	category?: string
	publish(api: API): MaybePromise<void | string | Error>
}

interface PublisherAPIBase {}

interface AutomergeFilePublisherAPI<Shape = unknown> extends PublisherAPIBase {
	handle: DocHandle<Shape>
	doc: Shape
}

interface AutomergeFilePublisher<Shape = unknown>
	extends PublisherBase<AutomergeFilePublisherAPI> {
	schema: StandardSchemaV1<Shape>
}

interface BlobPublisherAPI extends PublisherAPIBase {
	blob: Blob
}

interface BlobPublisher extends PublisherBase<BlobPublisherAPI> {}

export type Publisher<Shape = unknown> =
	| AutomergeFilePublisher<Shape>
	| BlobPublisher
