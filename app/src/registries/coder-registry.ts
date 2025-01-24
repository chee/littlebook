import {type DocumentPayload, type Repo} from "@automerge/automerge-repo"
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
import micromatch from "micromatch"

class ImportFromAutomergeError extends Error {
	type = "ImportFromAutomergeError"
}

// todo rewrite with Task
export async function importCoderFromAutomerge(
	manifest: StoredCoder
): Promise<Result<Coder, Error>> {
	try {
		const blob = new Blob([manifest.bytes], {
			type: "application/javascript",
		})
		const blobURL = URL.createObjectURL(blob)
		return import(/* @vite-ignore */ blobURL)
			.then(mod => {
				const root = Coder.safeParse(mod)
				if (root.success) return ok(root.data)
				const def = Coder.safeParse(mod.default)
				if (def.success) return ok(def.data)
				return err(
					new ImportFromAutomergeError(
						"document doesn't look like a coder"
					)
				)
			})
			.catch(error => {
				return err(error)
			})
	} catch (error) {
		if (error instanceof Error) {
			return err(error)
		}
		return err(
			new ImportFromAutomergeError(
				`failed to import editor from manifest: [${manifest.id}]: ${manifest.displayName}`
			)
		)
	}
}

export class CoderRegistry {
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

		const [coders, updateCoders] = createStore<Record<string, Coder>>({})
		this.#coders = coders
		this.#updateCoders = updateCoders
	}

	#coders: Record<string, Coder>

	#updateCoders: SetStoreFunction<Record<string, Coder>>

	#listener = (payload: DocumentPayload) => {
		const {handle} = payload
		const storedCoder = StoredCoder.safeParse(handle.docSync())!
		if (storedCoder.success) {
			importCoderFromAutomerge(storedCoder.data).then(coder => {
				coder.map(coder => this.#updateCoders(storedCoder.data.id, coder))
			})
		}
	}

	register(unknownCoder: Coder) {
		const coder = Coder.safeParse(unknownCoder)
		if (coder.success) {
			this.#updateCoders(coder.data.id, coder.data)
			return ok()
		} else {
			console.error("failed to register coder", coder.error)
			return err(coder.error)
		}
	}

	// this yields in three steps to allow for more specific matches to be yielded first
	*codersForContentType(contentType: string) {
		for (const coder of Object.values(this.#coders)) {
			if (coder.contentType === contentType) {
				yield coder
			}
		}
	}

	*codersForMimeType(mimeType: string) {
		for (const coder of Object.values(this.#coders)) {
			if (coder.mimeTypes && coder.mimeTypes.includes(mimeType)) {
				yield coder
			}
		}
	}

	*codersForFilename(filename: string) {
		for (const coder of Object.values(this.#coders)) {
			if (
				coder.filePatterns &&
				coder.filePatterns.some(
					coderFilePattern => micromatch(filename, coderFilePattern).length
				)
			) {
				yield coder
			}
		}
	}

	deconstructor() {
		this.#repo.off("document", this.#listener)
	}
}

export const CoderMetadata = z.object({
	id: z.string(),
	displayName: z.string(),
	contentType: z.string(),
	plugin: z.string().optional(),
	mimeTypes: z.array(z.string()).optional(),
	filePatterns: z.array(z.string()).optional(),
})
// .refine(
// 	data =>
// 		(data.mimeTypes && data.mimeTypes.length) ||
// 		(data.filePatterns && data.filePatterns.length),
// 	"must define at least one of `filePatterns` or `mimeTypes`"
// )

export type CoderMetadata = z.infer<typeof CoderMetadata>

// todo make generic, and allow for a content `shape` to be passed in
export const Coder = z
	.object({
		decode: z.function().args(z.instanceof(Uint8Array)).returns(z.unknown()),
		encode: z.function().args(z.unknown()).returns(z.instanceof(Uint8Array)),
		new: z.function().args().returns(z.unknown()),
	})
	.extend(CoderMetadata.shape)

export function inferCoder<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		decode: z.function().args(z.instanceof(Uint8Array)).returns(schema),
		encode: z.function().args(schema).returns(z.instanceof(Uint8Array)),
		new: z.function().args().returns(z.unknown()),
	})
}

export type Coder = z.infer<typeof Coder>

// how a compiled coder plugin is stored in automerge
export const StoredCoder = z
	.object({
		type: z.literal("coder"),
		bytes: z.instanceof(Uint8Array),
	})
	.extend(CoderMetadata.shape)

export type StoredCoder = z.infer<typeof StoredCoder>

export const CoderRegistryContext = createContext<CoderRegistry>()

export function useCoderRegistry() {
	const value = useContext(CoderRegistryContext)
	if (!value) {
		throw new Error("this needs to be used within a CoderRegistryContext")
	}
	return value
}
