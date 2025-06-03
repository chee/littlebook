import {
	type Repo,
	type DocHandleChangePayload,
	type AutomergeUrl,
} from "@automerge/vanillajs"
import {getOwner, onCleanup} from "solid-js"
import {createStore, type SetStoreFunction} from "solid-js/store"
import debug from "debug"
const log = debug("littlebook:registries")

export interface Stored<Typename extends string> {
	id: string
	bytes: Uint8Array
	type: Typename
	// todo part of type?
	category?: string
}

export async function importFromAutomerge<Typename extends string, T>(
	stored: Stored<Typename>
): Promise<T> {
	return new Promise(async (yay, boo) => {
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
	Doctype extends string,
	ValueType extends {id: string}
> {
	protected repo: Repo

	records: Record<string, ValueType>

	protected updateRecords: SetStoreFunction<Record<string, ValueType>>

	protected type = ""

	constructor({repo, doctype}: {repo: Repo; doctype: Doctype}) {
		this.type = doctype
		this.repo = repo

		if (!getOwner()!) {
			throw new Error(
				`${this.type} registry must be created in a reactive context`
			)
		}
		// using records to describe the individual items managed by this registry
		const [records, updateRecords] = createStore<Record<string, ValueType>>(
			{}
		)
		// eslint-disable-next-line solid/reactivity
		this.records = records
		this.updateRecords = updateRecords
	}

	private changeListener = (
		payload: DocHandleChangePayload<Stored<Doctype>>
	) => {
		return this.import(payload.patchInfo.after)
	}

	private import = async (doc: Stored<Doctype>) => {
		try {
			const bundle = await importFromAutomerge<Doctype, ValueType>(doc)
			return this.register(bundle)
		} catch (err) {
			console.error(`failed to import ${this.type} document`, err)
		}
	}

	async maybe(url: AutomergeUrl) {
		const handle = await this.repo.find<Stored<Doctype>>(url)
		const doc = handle.doc()
		if (doc.type != this.type) return
		if (!doc.bytes) return
		handle.on("change", this.changeListener)
		onCleanup(() => handle.off("change", this.changeListener))
		return this.import(doc as Stored<Doctype>)
	}

	register(bundle: ValueType) {
		if (this.records[bundle.id]) {
			log(`overwriting ${this.type}: [${bundle.id}]`)
		} else {
			log(`registering ${this.type} document: [${bundle.id}]`)
		}
		this.updateRecords(bundle.id, {...bundle})
	}

	get<T extends ValueType>(id: string): ValueType | undefined {
		return this.records[id] as T | undefined
	}
}
