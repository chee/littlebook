import type {StandardSchemaV1} from "@standard-schema/spec"
import {type MaybePromise} from "./util.js"

type MaybeNamedShape<Shape> = [shape: Shape] | [shape: Shape, {name: string}]

interface SourceBase<Shape = unknown> {
	id: string
	displayName: string
	category: string
}

export interface VoidSource<Shape = unknown> extends SourceBase {
	category: "new"
	"new"(): MaybePromise<MaybeNamedShape<Shape>>
}

export interface FilesystemSource<Shape = unknown> extends SourceBase {
	category: "filesystem"
	import(file: File): MaybePromise<MaybeNamedShape<Shape>>
	patterns?: string[]
	mimes?: string[]
}

// export interface NetworkSource<Shape> extends SourceBase {
// 	category: "network"
// 	import(url: string): MaybePromise<SourceReturn<Shape>>
// }

export type Source<Shape = unknown> =
	| VoidSource<Shape>
	| FilesystemSource<Shape>
// | NetworkSource<Shape>
