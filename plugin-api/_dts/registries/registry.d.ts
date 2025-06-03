import {type Repo, type AutomergeUrl} from "@automerge/vanillajs"
import {type SetStoreFunction} from "solid-js/store"
export interface Stored<Typename extends string> {
	id: string
	bytes: Uint8Array
	type: Typename
	category?: string
}
export declare function importFromAutomerge<Typename extends string, T>(
	stored: Stored<Typename>
): Task<T, Error>
export declare abstract class Registry<
	Doctype extends string,
	ValueType extends {
		id: string
	}
> {
	protected repo: Repo
	records: Record<string, ValueType>
	protected updateRecords: SetStoreFunction<Record<string, ValueType>>
	protected type: string
	constructor({repo, doctype}: {repo: Repo; doctype: Doctype})
	private changeListener
	private import
	maybe(url: AutomergeUrl): Promise<ValueType>
	register(bundle: ValueType): void
	get<T extends ValueType>(id: string): ValueType | undefined
}
