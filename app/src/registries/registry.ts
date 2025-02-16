import {
	type DocumentPayload,
	type Repo,
	type DocHandleChangePayload,
} from "@automerge/automerge-repo"
import {getOwner, onCleanup, type Owner} from "solid-js"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {Task} from "true-myth/task"
const log = window.log.extend("registries")

export interface Stored<Typename extends string> {
	id: string
	bytes: Uint8Array
	type: Typename
	// todo part of type?
	category?: string
}

export function importFromAutomerge<Typename extends string, T>(
	stored: Stored<Typename>
): Task<T, Error> {
	return new Task(async (yay, boo) => {
		const blob = new Blob([stored.bytes], {type: "application/javascript"})
		const blobURL = URL.createObjectURL(blob)
		const module = await import(/* @vite-ignore */ blobURL)
		if (module.id == stored.id) {
			return yay(module as T)
		}
		if (module.default.id == stored.id) {
			return yay(module.default as T)
		}
		return boo(
			new Error(`document doesn't look like the thing it's meant to be`)
		)
	})
}

export abstract class Registry<
	Typename extends string,
	ValueType extends {id: string},
> {
	#repo: Repo
	#owner: Owner

	records: Record<string, ValueType>

	#updateRecords: SetStoreFunction<Record<string, ValueType>>

	#typename = ""

	get nameWithSpace() {
		if (this.#typename) return this.#typename + " "
		else return ""
	}

	get nameWithPrefixSpace() {
		if (this.#typename) return " " + this.#typename
		else return ""
	}

	constructor({repo, typename}: {repo: Repo; typename: Typename}) {
		this.#typename = typename
		this.#repo = repo
		this.#owner = getOwner()!
		if (!this.#owner) {
			throw new Error(
				`${this.nameWithSpace}registry must be created in a reactive context`
			)
		}

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
			if (doc.type != this.#typename) return
			if (!doc.bytes) return
			handle.on("change", this.#changeListener)
			return this.#import(doc as Stored<Typename>)
		})()
	}

	#changeListener = (payload: DocHandleChangePayload<Stored<Typename>>) => {
		return this.#import(payload.patchInfo.after)
	}

	#import = (doc: Stored<Typename>) => {
		return importFromAutomerge<Typename, ValueType>(doc)
			.map(bundle => {
				if (this.records[bundle.id]) {
					console.warn(
						`overwriting${this.nameWithPrefixSpace}: [${bundle.id}]`
					)
				}
				this.register(bundle)
			})
			.mapRejected(err => {
				console.error(`failed to import ${this.nameWithSpace}document`, err)
			})
	}

	register(bundle: ValueType) {
		log(`registering ${this.nameWithSpace}document: [${bundle.id}]`)
		this.#updateRecords(bundle.id, {...bundle})
	}

	get<T extends ValueType>(id: string): ValueType | undefined {
		return this.records[id] as T | undefined
	}

	deconstructor() {
		this.#repo.off("document", this.#documentListener)
	}
}
