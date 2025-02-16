import type {StandardSchemaV1} from "@standard-schema/spec"
import {type MaybePromise} from "./util.js"

const nameKey = Symbol("name")

type MaybeNamedShape<Shape> = Shape & {[nameKey]?: string}

interface SourceBase<Shape = unknown> {
	id: string
	displayName: string
	contentType: string
	category: string
	schema?: StandardSchemaV1<Shape>
}

export interface VoidSource<Shape = unknown> extends SourceBase {
	category: "new"
	create(help: {nameKey: typeof nameKey}): MaybePromise<MaybeNamedShape<Shape>>
}

export interface FilesystemSource<Shape = unknown> extends SourceBase {
	category: "filesystem"
	import(
		file: File,
		help: {nameKey: typeof nameKey}
	): MaybePromise<MaybeNamedShape<Shape>>
	filePatterns?: string[]
	mimeTypes?: string[]
}

// export interface NetworkSource<Shape> extends SourceBase {
// 	category: "network"
// 	import(url: string): MaybePromise<SourceReturn<Shape>>
// }

export type Source<Shape = unknown> =
	| VoidSource<Shape>
	| FilesystemSource<Shape>
// | NetworkSource<Shape>
