import type {DocHandle} from "@automerge/automerge-repo"
import {Entry} from "./entry.js"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type {MaybePromise} from "./util.js"

export interface SinkAPI<Shape = unknown> {
	entry: Entry
	handle: DocHandle<Shape>
}

interface SinkBase<Shape> {
	id: string
	displayName: string
	category: string
	schema: StandardSchemaV1<Shape>
}

export interface FileSink<Shape = unknown> extends SinkBase<Shape> {
	category: "file"
	publish(args: SinkAPI<Shape>): MaybePromise<File>
}

export interface TransmuteSink<Shape = unknown, NextShape = unknown>
	extends SinkBase<Shape> {
	category: "transmute"
	publish(args: SinkAPI<Shape>): MaybePromise<NextShape>
}

export interface VoidSink<Shape = unknown> extends SinkBase<Shape> {
	category: "void"
	publish(args: SinkAPI<Shape>): MaybePromise<void>
}

export type Sink<Shape = unknown> =
	| FileSink<Shape>
	| TransmuteSink<Shape>
	| VoidSink<Shape>
