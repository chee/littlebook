import {Entry} from "./entry.js"
import {DocHandle, type Doc} from "@automerge/automerge-repo"
import * as v from "valibot"
import {args, standard} from "./util.js"
import type {StandardSchemaV1} from "@standard-schema/spec"

// export function inferFileMenuAction<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.object({
// 		type: v.literal("action"),
// 		label: v.string(),
// 		keybinding: v.optional(v.string()),
// 		when: v.optional(
// 			v.pipe(
// 				v.function(),
// 				args(v.object({entry: Entry, file: standard(schema)})),
// 				v.returns(v.boolean())
// 			)
// 		),
// 		action: v.pipe(
// 			v.function(),
// 			args(
// 				v.object({
// 					fileHandle: v.instance(DocHandle) as v.GenericSchema<
// 						DocHandle<StandardSchemaV1.InferOutput<Document>>
// 					>,
// 				})
// 			),
// 			v.returns(v.void())
// 		),
// 	})
// }

// export function inferBaseFileMenuSubmenu<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.object({
// 		type: v.literal("sub"),
// 		label: v.string(),
// 		when: v.optional(
// 			v.pipe(
// 				v.function(),
// 				args(v.object({entry: Entry, file: standard(schema)})),
// 				v.returns(v.boolean())
// 			)
// 		),
// 	})
// }

// export type FileMenuSubMenu<T extends StandardSchemaV1> =
// 	StandardSchemaV1.InferOutput<
// 		ReturnType<typeof inferBaseFileMenuSubmenu<T>>
// 	> & {
// 		sub: AnyFileMenuItem[]
// 	}

// export function inferFileMenuSubMenu<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.object({
// 		...inferBaseFileMenuSubmenu(schema).entries,
// 		sub: v.lazy(() => v.array(inferFileMenuAction(v.unknown()))),
// 	})
// }

// export type AnyFileMenuSubMenu = StandardSchemaV1.InferOutput<
// 	ReturnType<typeof inferFileMenuSubMenu<any>>
// >

// export function inferFileMenuChoice<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.object({
// 		type: v.literal("choice"),
// 		value: v.pipe(
// 			v.function(),
// 			args(v.object({file: standard(schema)})),
// 			v.returns(v.string())
// 		),
// 		choices: v.array(
// 			v.object({
// 				label: v.string(),
// 				value: v.string(),
// 			})
// 		),
// 		action: v.pipe(
// 			v.function(),
// 			args(
// 				v.object({
// 					fileHandle: v.instance(DocHandle) as v.GenericSchema<
// 						DocHandle<StandardSchemaV1.InferOutput<typeof schema>>
// 					>,
// 					value: v.string(),
// 				})
// 			),
// 			v.returns(v.void())
// 		),
// 	})
// }

export interface FileMenuAction<Shape> {
	type: "action"
	label: string
	keybinding?: string
	when?: (args: {entry: Entry; file: Doc<Shape>}) => boolean
	action: (args: {fileHandle: DocHandle<any>}) => void
}

export interface FileMenuChoice<Shape> {
	type: "choice"
	value: (args: {file: Doc<Shape>}) => string
	choices: {label: string; value: string}[]
	action: (args: {fileHandle: DocHandle<any>; value: string}) => void
}

export interface FileMenuSubMenu<Shape> {
	type: "sub"
	label: string
	when?: (args: {entry: Entry; file: Doc<Shape>}) => boolean
	sub: FileMenuItem<Shape>[]
}

export type FileMenuItem<Shape> =
	| FileMenuSubMenu<Shape>
	| FileMenuAction<Shape>
	| FileMenuChoice<Shape>

// export type AnyFileMenuChoice = v.InferOutput<
// 	ReturnType<typeof inferFileMenuChoice<any>>
// >

// export type AnyFileMenuItem =
// 	| AnyFileMenuSubMenu
// 	| AnyFileMenuAction
// 	| AnyFileMenuChoice

// export function inferFileMenuItem<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.lazy(() =>
// 		v.variant("type", [
// 			inferFileMenuSubMenu(schema),
// 			inferFileMenuAction(schema),
// 			inferFileMenuChoice(schema),
// 		])
// 	)
// }

// export function inferFileMenu<Document extends StandardSchemaV1>(
// 	schema: Document
// ) {
// 	return v.array(inferFileMenuItem(schema))
// }

// export type FileMenu<T extends StandardSchemaV1> = v.InferOutput<
// 	ReturnType<typeof inferFileMenu<T>>
// >

// export type AnyFileMenu = FileMenu<any>
