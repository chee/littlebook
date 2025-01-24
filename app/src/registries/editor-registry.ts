import {
	DocHandle,
	type DocumentPayload,
	type Repo,
} from "@automerge/automerge-repo"
import {
	createContext,
	getOwner,
	onCleanup,
	useContext,
	type Owner,
} from "solid-js"
import z from "zod"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {err, ok, type Result} from "../lib/result.ts"
import type {Entry} from "../documents/entry.ts"
import {Task, fromPromise} from "true-myth/task"

export async function importEditorFromAutomerge(
	manifest: StoredEditor
): Promise<Result<Editor, Error>> {
	return new Task((ok, err) => {
		const blob = new Blob([manifest.bytes], {
			type: "application/javascript",
		})
		const blobURL = URL.createObjectURL(blob)
		return fromPromise(import(/* @vite-ignore */ blobURL)).map(mod => {
			const root = Editor.safeParse(mod)
			if (root.success) return ok(root.data)
			const def = Editor.safeParse(mod.default)
			if (def.success) return ok(def.data)
			return err(new Error("document doesn't look like an editor"))
		})
	})
}

export class EditorRegistry {
	#repo: Repo
	#owner: Owner
	constructor({repo}: {repo: Repo}) {
		this.#repo = repo
		repo.on("document", this.#listener)
		this.#owner = getOwner()
		onCleanup(() => {
			this.deconstructor()
		})

		if (!this.#owner) {
			throw new Error("registry must be created in a reactive context")
		}

		const [editors, updateEditors] = createStore<Record<string, Editor>>({})
		this.#editors = editors
		this.#updateEditors = updateEditors
	}

	#editors: Record<string, Editor>

	#updateEditors: SetStoreFunction<Record<string, Editor>>

	#listener = (payload: DocumentPayload) => {
		const {handle} = payload
		const manifestWithBytes = StoredEditor.safeParse(handle.docSync())!
		if (manifestWithBytes.success) {
			const withBytes = manifestWithBytes.data
			importEditorFromAutomerge(withBytes).then(editor => {
				editor.map(editor => this.#updateEditors(withBytes.id, editor))
			})
		}
	}

	register(unknownEditor: Editor) {
		const editor = Editor.safeParse(unknownEditor)
		if (editor.success) {
			this.#updateEditors(editor.data.id, editor.data)
			return ok()
		} else {
			console.error("failed to register editor from bundle", editor.error)
			return err(editor.error)
		}
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	*editors(entry: Entry) {
		for (const editor of Object.values(this.#editors)) {
			if (typeof editor.contentTypes == "string") continue
			if (editor.contentTypes.includes(entry.contentType)) {
				yield editor
			}
		}

		if (entry.conformsTo) {
			for (const editor of Object.values(this.#editors)) {
				if (typeof editor.contentTypes == "string") continue
				if (
					editor.contentTypes.some(type =>
						entry.conformsTo?.includes(type)
					)
				) {
					yield editor
				}
			}
		}
		for (const editor of Object.values(this.#editors)) {
			if (editor.contentTypes == "*") {
				yield editor
			}
		}
	}

	get(id: string): Result<Editor, Error> {
		const editor = this.#editors[id]
		return editor ? ok(editor) : err(new Error(`editor not found: ${id}`))
	}

	deconstructor() {
		this.#repo.off("document", this.#listener)
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
