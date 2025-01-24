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

export async function importEditorFromAutomerge(
	manifest: EditorManifestWithBytes
): Promise<Result<Editor>> {
	try {
		const blob = new Blob([manifest.bytes], {
			type: "application/javascript",
		})
		const blobURL = URL.createObjectURL(blob)
		return import(/* @vite-ignore */ blobURL)
			.then(mod => {
				const root = Editor.safeParse(mod)
				if (root.success) return ok(root.data)
				const def = Editor.safeParse(mod.default)
				if (def.success) return ok(def.data)
				return err(new Error("document doesn't look like an editor"))
			})
			.catch(error => {
				return err(error)
			})
	} catch (error) {
		if (error instanceof Error) {
			err(error)
		}
		return err(
			new Error(
				`failed to import editor from manifest: [${manifest.id}]: ${manifest.name}`
			)
		)
	}
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

		const [manifests, updateManifests] = createStore<
			Record<string, EditorManifest>
		>({})
		const [editors, updateEditors] = createStore<Record<string, Editor>>({})
		;[this.manifests, this.editors] = [manifests, editors]
		this.updateManifests = updateManifests
		this.updateEditors = updateEditors
	}

	manifests: Record<string, EditorManifest>
	editors: Record<string, Editor>

	updateManifests: SetStoreFunction<Record<string, EditorManifest>>
	updateEditors: SetStoreFunction<Record<string, Editor>>

	#listener = (payload: DocumentPayload) => {
		const {handle} = payload
		const manifestWithBytes = EditorManifestWithBytes.safeParse(
			handle.docSync()
		)!
		if (manifestWithBytes.success) {
			const withBytes = manifestWithBytes.data
			const manifest = EditorManifest.parse(withBytes)
			this.updateManifests(manifest.id, manifest)
			importEditorFromAutomerge(withBytes).then(editor => {
				if (editor.ok) {
					this.updateEditors(withBytes.id, editor.val)
				}
			})
		}
	}

	register(unknownBundle: BundledEditor) {
		const bundle = EditorManifest.safeParse(unknownBundle)
		if (bundle.success) {
			const manifest = EditorManifest.parse(bundle.data)
			const editor = Editor.parse(bundle.data)
			this.updateManifests(manifest.id, manifest)
			this.updateEditors(manifest.id, editor)
			return ok()
		} else {
			console.error("failed to register editor from bundle", bundle.error)
			return err(bundle.error)
		}
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	getEditorsFor = function* (this: EditorRegistry, entry: Entry) {
		for (const manifest of Object.values(this.manifests)) {
			if (typeof manifest.contentTypes == "string") continue
			if (manifest.contentTypes.includes(entry.contentType)) {
				const editor =
					manifest.id in this.editors && this.editors[manifest.id]
				if (editor) {
					yield editor
				}
			}
		}

		if (entry.conformsTo) {
			for (const manifest of Object.values(this.manifests)) {
				if (typeof manifest.contentTypes == "string") continue
				if (
					manifest.contentTypes.some(type =>
						entry.conformsTo?.includes(type)
					)
				) {
					const editor =
						manifest.id in this.editors && this.editors[manifest.id]
					if (editor) {
						yield editor
					}
				}
			}
		}
		for (const manifest of Object.values(this.manifests)) {
			if (manifest.contentTypes == "*") {
				const editor =
					manifest.id in this.editors && this.editors[manifest.id]
				if (editor) {
					yield editor
				}
			}
		}
	}

	deconstructor() {
		this.#repo.off("document", this.#listener)
	}
}

export const EditorManifest = z.object({
	id: z.string(),
	name: z.string(),
	contentTypes: z.union([z.array(z.string()), z.literal("*")]),
})

export type EditorManifest = z.infer<typeof EditorManifest>

export const Editor = z.object({
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

export const BundledEditor = Editor.extend(EditorManifest.shape)
export type BundledEditor = z.infer<typeof BundledEditor>

export type Editor = z.infer<typeof Editor>

// how a compiled editor plugin is stored in automerge
export const EditorManifestWithBytes = z
	.object({
		type: z.literal("editor"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(EditorManifest.shape)

export type EditorManifestWithBytes = z.infer<typeof EditorManifestWithBytes>

export const EditorRegistryContext = createContext<EditorRegistry>()

export function useEditorRegistry() {
	const value = useContext(EditorRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a EditorRegistryContext")
	}
	return value
}
