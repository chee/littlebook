import {DocHandle, type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import z from "zod"
import {err, ok, type Result} from "../lib/result.ts"
import type {Entry} from "../documents/entry.ts"
import {Registry} from "./registry.ts"

export class EditorRegistry extends Registry<StoredEditor, Editor> {
	constructor({repo}: {repo: Repo}) {
		super({repo, storedSchema: StoredEditor, schema: Editor})
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	*editors(entry: Entry) {
		for (const editor of Object.values(this.records)) {
			if (typeof editor.contentTypes == "string") continue
			if (editor.contentTypes.includes(entry.contentType)) {
				yield editor
			}
		}

		// if (entry.conformsTo) {
		// 	for (const editor of Object.values(this.records)) {
		// 		if (typeof editor.contentTypes == "string") continue
		// 		if (
		// 			editor.contentTypes.some(type =>
		// 				entry.conformsTo?.includes(type)
		// 			)
		// 		) {
		// 			yield editor
		// 		}
		// 	}
		// }
		for (const editor of Object.values(this.records)) {
			if (editor.contentTypes == "*") {
				yield editor
			}
		}
	}

	get(id: string): Result<Editor, Error> {
		const editor = this.records[id]
		return editor ? ok(editor) : err(new Error(`editor not found: ${id}`))
	}
}

export const EditorMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type EditorMetadata = z.infer<typeof EditorMetadata>

export const Editor = z
	.object({
		render: z
			.function()
			.args(
				z.object({
					shadow: z.instanceof(ShadowRoot),
					handle: z.instanceof(DocHandle),
					setName: z.function().args(z.string()).returns(z.void()),
					cleanup: z
						.function()
						.args(z.function().returns(z.void()))
						.returns(z.void()),
				})
			)
			.returns(z.void()),
	})
	.extend(EditorMetadata.shape)

export type Editor = z.infer<typeof Editor>

// how a compiled editor plugin is stored in automerge
export const StoredEditor = z
	.object({
		type: z.literal("editor"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(EditorMetadata.shape)

export type StoredEditor = z.infer<typeof StoredEditor>

export const EditorRegistryContext = createContext<EditorRegistry>()

export function useEditorRegistry() {
	const value = useContext(EditorRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a EditorRegistryContext")
	}
	return value
}
