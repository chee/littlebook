import {Entry} from "./entry.js"
import {DocHandle, type Doc} from "@automerge/vanillajs"

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

export type FileMenu<Shape> = FileMenuItem<Shape>[]
