import {type DocumentPayload, type Repo} from "@automerge/automerge-repo"
import {getOwner, onCleanup, type Owner} from "solid-js"
import z from "zod"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {err, ok, type Result} from "../lib/result.ts"
import type Unit from "true-myth/unit"
import {safelyTry, Task} from "true-myth/task"

export function importFromAutomerge<T extends z.ZodTypeAny>(
	doc: {bytes: Uint8Array},
	schema: T
): Task<z.infer<T>, Error> {
	return new Task(async (yay, boo) => {
		const blob = new Blob([doc.bytes], {type: "application/javascript"})
		const blobURL = URL.createObjectURL(blob)
		const module = await import(/* @vite-ignore */ blobURL)
		const star = schema.safeParse(module)
		if (star.success) return yay(star.data)
		const defaul = schema.safeParse(module.default)
		if (defaul.success) return yay(defaul.data)
		return boo(new Error(`document doesn't look like a ${schema}`))
	})
}

export abstract class Registry<
	Stored extends {id: string; bytes: Uint8Array},
	Shape extends {id: string},
> {
	#repo: Repo
	#owner: Owner
	#storedSchema: z.ZodType<Stored>
	#schema: z.ZodType<Shape>
	records: Record<string, Shape>

	#updateRecords: SetStoreFunction<Record<string, Shape>>

	constructor({
		repo,
		storedSchema,
		schema: schema,
	}: {
		repo: Repo
		storedSchema: z.ZodType<Stored>
		schema: z.ZodType<Shape>
	}) {
		this.#repo = repo
		this.#owner = getOwner()!
		if (!this.#owner) {
			throw new Error("registry must be created in a reactive context")
		}
		this.#storedSchema = storedSchema
		this.#schema = schema

		repo.on("document", this.#listener)
		onCleanup(() => {
			this.deconstructor()
		})

		// using records to describe the individual items managed by this registry
		const [records, updateRecords] = createStore<Record<string, Shape>>({})
		this.records = records
		this.#updateRecords = updateRecords
	}

	#listener = (payload: DocumentPayload) => {
		const {handle} = payload
		handle.doc().then(document => {
			const parsed = this.#storedSchema.safeParse(document)!

			if (parsed.success) {
				importFromAutomerge(parsed.data, this.#schema).map(bundle => {
					if (this.records[bundle.id]) {
						console.warn(
							`already registered: ${bundle.id}, not overwriting`
						)
						return
					}
					this.#updateRecords(parsed.data.id, bundle)
				})
			} else if (handle.docSync()?.bytes) {
				console.warn("failed to parse document", parsed.error)
			}
		})
	}

	register(unknown: Shape): Result<Unit, Error> {
		const parsed = this.#schema.safeParse(unknown)
		if (parsed.success) {
			this.#updateRecords(parsed.data.id, parsed.data)
			return ok()
		} else {
			console.error("failed to register coder", parsed.error)
			return err(parsed.error)
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
