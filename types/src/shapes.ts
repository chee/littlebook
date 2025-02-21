// todo either this file doesn't belong here, or more things do. maybe this is
// better the @pointplace/plugin-api or something
import * as v from "valibot"
import {automergeURL} from "./util.js"

export const TextShape = v.object({text: v.string()})
export type TextShape = v.InferOutput<typeof TextShape>

export const CodeShape = v.object({
	text: v.string(),
	language: v.optional(v.string()),
	editorURL: v.optional(automergeURL),
})
export type CodeShape = v.InferOutput<typeof CodeShape>

export const MarkdownShape = v.object({
	text: v.string(),
	language: v.literal("markdown"),
	editorURL: v.optional(automergeURL),
})
export type MarkdownShape = v.InferOutput<typeof MarkdownShape>

export const JavaScriptEditorShape = v.object({
	text: v.string(),
	language: v.literal("javascript"),
	url: v.optional(automergeURL),
})

export type JavaScriptEditorShape = v.InferOutput<typeof JavaScriptEditorShape>

export const FolderShape = v.object({
	files: v.array(v.string()),
})

export type FolderShape = v.InferOutput<typeof FolderShape>
