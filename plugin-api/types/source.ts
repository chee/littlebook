import type {ContentShape} from "./content.ts"

type PartialEntry<Shape> = {
	/** the file's name */
	name?: string
	/** an emoji */
	icon?: string
	/** the file's inner helpings */
	content: Shape
}
export type MaybePromise<T> = T | Promise<T>

interface SourceBase {
	id: string
	displayName?: string
	category: string
}

export interface CreateSource<Shape = unknown> extends SourceBase {
	category: "new"
	"new"(): MaybePromise<PartialEntry<Shape>>
}

export interface FilesystemSource<Shape = unknown> extends SourceBase {
	category: "filesystem"
	import(file: File): MaybePromise<PartialEntry<Shape>>
	patterns?: string[]
	mimes?: string[]
}

// export interface NetworkSource<Shape> extends SourceBase {
// 	category: "network"
// 	import(url: string): MaybePromise<SourceReturn<Shape>>
// }

export type Source<Shape = unknown> =
	| CreateSource<Shape>
	| FilesystemSource<Shape>
// | NetworkSource<Shape>
