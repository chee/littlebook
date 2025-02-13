import {
	type DocumentPayload,
	type Repo,
	type DocHandleChangePayload,
} from "@automerge/automerge-repo"
import {getOwner, onCleanup, type Owner} from "solid-js"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {err, ok, type Result} from "true-myth/result"
import {Task} from "true-myth/task"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type Unit from "true-myth/unit"
import {z} from "zod"
const log = window.log.extend("registries")

export function importFromAutomerge<T>(doc: {
	id: string
	bytes: Uint8Array
}): Task<T, Error> {
	return new Task(async (yay, boo) => {
		const blob = new Blob([doc.bytes], {type: "application/javascript"})
		const blobURL = URL.createObjectURL(blob)
		const module = await import(/* @vite-ignore */ blobURL)
		if (module.id == doc.id) {
			return yay(module as T)
		}
		// const starFromExport = await schema["~standard"].validate(module)
		// if (!starFromExport.issues) return yay(starFromExport.value)
		// const defaultExport = await schema["~standard"].validate(module.default)
		// if (!defaultExport.issues) return yay(defaultExport.value)
		if (module.default.id == doc.id) {
			return yay(module.default as T)
		}
		return boo(
			new Error(
				// `document doesn't look like a
				// ${schema}.\n${starFromExport.issues}\n${defaultExport.issues}`
				`document doesn't look like the thing it's meant to be`
			)
		)
	})
}

export abstract class Registry<
	StoredType extends {id: string; bytes: Uint8Array},
	ValueType extends {id: string},
> {
	#repo: Repo
	#owner: Owner
	#storedSchema: StandardSchemaV1<StoredType>

	records: Record<string, ValueType>

	#updateRecords: SetStoreFunction<Record<string, ValueType>>

	#type = ""

	get nameWithSpace() {
		if (this.#type) return this.#type + " "
		else return ""
	}

	get nameWithPrefixSpace() {
		if (this.#type) return " " + this.#type
		else return ""
	}

	constructor({
		repo,
		storedSchema,
		type = "",
	}: {
		repo: Repo
		storedSchema: StandardSchemaV1<StoredType>
		type: string
	}) {
		this.#type = type
		this.#repo = repo
		this.#owner = getOwner()!
		if (!this.#owner) {
			throw new Error(
				`${this.nameWithSpace}registry must be created in a reactive context`
			)
		}
		this.#storedSchema = storedSchema

		repo.on("document", this.#documentListener)
		onCleanup(() => {
			this.deconstructor()
		})

		// using records to describe the individual items managed by this registry
		const [records, updateRecords] = createStore<Record<string, ValueType>>(
			{}
		)
		// eslint-disable-next-line solid/reactivity
		this.records = records
		this.#updateRecords = updateRecords
	}

	#documentListener = (payload: DocumentPayload) => {
		const {handle} = payload
		const doc = handle.doc()
		if (!doc) return
		return (async () => {
			const parsed = await this.#storedSchema["~standard"].validate(doc)!
			if (parsed.issues) {
				if (
					"type" in doc &&
					doc.type == this.#type &&
					handle.doc()?.bytes
				) {
					console.warn(
						`failed to parse ${this.nameWithSpace}document`,
						parsed.issues
					)
				}
			} else {
				handle.on("change", this.#changeListener)
				return this.#import(parsed.value)
			}
		})()
	}

	#changeListener = (payload: DocHandleChangePayload<StoredType>) => {
		return this.#import(payload.patchInfo.after)
	}

	#import = (doc: StoredType) => {
		return importFromAutomerge<ValueType>(doc)
			.map(bundle => {
				if (this.records[bundle.id]) {
					console.warn(
						`overwriting${this.nameWithPrefixSpace}: [${bundle.id}]`
					)
				}
				this.#updateRecords(doc.id, bundle)
			})
			.mapRejected(err => {
				console.error(`failed to import ${this.nameWithSpace}document`, err)
			})
	}

	register(unknown: ValueType) {
		// const record = await this.#schema["~standard"].validate(unknown)
		// if (record.issues) {
		// 	console.error(
		// 		`failed to register${this.nameWithPrefixSpace}`,
		// 		record.issues
		// 	)
		// 	return err(new Error(record.issues.join("\n")))
		// } else {
		this.#updateRecords(unknown.id, {...unknown})
		// return ok()
		// }
	}

	get<T extends ValueType>(id: string): ValueType | undefined {
		return this.records[id] as T | undefined
	}

	deconstructor() {
		this.#repo.off("document", this.#documentListener)
	}
}
