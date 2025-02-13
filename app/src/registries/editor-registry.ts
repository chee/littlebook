import {type Repo} from "@automerge/automerge-repo"
import {createContext, useContext} from "solid-js"
import {Registry} from "./registry.ts"
import {type ContentTypeRegistry} from "./content-type-registry.ts"
import {type Editor, StoredEditor, type Entry} from "@pointplace/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EditorRegistry extends Registry<StoredEditor, Editor<any>> {
	#contentTypeRegistry: ContentTypeRegistry

	constructor({
		repo,
		contentTypeRegistry,
	}: {
		repo: Repo
		contentTypeRegistry: ContentTypeRegistry
	}) {
		super({
			repo,
			storedSchema: StoredEditor,
			type: "editor",
		})
		this.#contentTypeRegistry = contentTypeRegistry
	}

	/*
	 * a way to add these:
	 * 1. cli: build the bundle
	 * 2. cli: cat bundle.js|base64 -w0|pbcopy
	 * 3. browser: repo.find(url).change(doc => doc.bytes = Uint8Array.fromBase64(`⌘+v`))<RET>
	 */

	// this yields in three steps to allow for more specific matches to be yielded first
	*editors(entry: Entry) {
		const seen = new Set<Editor<unknown>>()
		for (const editor of Object.values(this.records)) {
			if (typeof editor.contentTypes == "string") continue
			if (editor.contentTypes.includes(entry.contentType)) {
				seen.add(editor)
				yield editor
			}
		}

		const entryType = this.#contentTypeRegistry.get(entry.contentType)

		if (entryType && entryType.conformsTo) {
			for (const editor of Object.values(this.records)) {
				if (typeof editor.contentTypes == "string") continue
				if (
					editor.contentTypes.some(type =>
						entryType.conformsTo?.includes(type)
					) &&
					!seen.has(editor)
				) {
					seen.add(editor)
					yield editor
				}
			}
		}

		for (const editor of Object.values(this.records)) {
			if (editor.contentTypes == "*" && !seen.has(editor)) {
				seen.add(editor)
				yield editor
			}
		}
	}

	get<T>(id: string): Editor<T> | undefined {
		return this.records[id] as Editor<T>
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
