import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {err, ok, type Result} from "true-myth/result"
import type {Entry} from "../../documents/entry.ts"
import {Registry} from "../registry.ts"
import {StoredEditor, Editor} from "./editor-schema.ts"

export class EditorRegistry extends Registry<StoredEditor, Editor> {
	constructor({repo}: {repo: Repo}) {
		super({repo, storedSchema: StoredEditor, schema: Editor, name: "editor"})
	}

	/*
	 * a way to add these:
	 * 1. cli: build the bundle
	 * 2. cli: cat bundle.js|base64 -w0|pbcopy
	 * 3. browser: repo.find(url).change(doc => doc.bytes = Uint8Array.fromBas64(`⌘+v`))<RET>
	 */

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

export const EditorRegistryContext = createContext<EditorRegistry>()

export function useEditorRegistry() {
	const value = useContext(EditorRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a EditorRegistryContext")
	}
	return value
}
