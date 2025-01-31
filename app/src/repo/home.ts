import {makePersisted} from "@solid-primitives/storage"
import repo from "./create.ts"
import {createSignal, untrack} from "solid-js"
import type {AutomergeUrl, ChangeFn} from "@automerge/automerge-repo"
import type {Entry} from "../documents/entry.ts"
import {useDocument} from "automerge-repo-solid-primitives"

export interface Home {
	type: "home"
	name: string
	importers: AutomergeUrl[]
	publishers: AutomergeUrl[]
	editors: AutomergeUrl[]
	treeviewers: AutomergeUrl[]
	tabviewers: AutomergeUrl[]
	viewers: AutomergeUrl[]
	files: AutomergeUrl[]
	// automerge url to manifest.id
	associations: Record<AutomergeUrl, string>
}

const forceString = (string: string) =>
	(string?.[0] == `"` ? JSON.parse(string) : string) as AutomergeUrl

const [homeURL, setHomeURL] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal(
		forceString(localStorage.getItem("home")!) ??
			repo.create<Home>({
				type: "home",
				name: "home",
				importers: [],
				publishers: [],
				// todo automatically populate with repo.on("document")
				editors: [],
				treeviewers: [],
				tabviewers: [],
				viewers: [],
				associations: {},
				files: [
					// todo add a `createEntry` function
					repo.create<Entry>({
						type: "file",
						name: "my manifesto.txt",
						contentType: "public.text",
						url: repo.create({
							text: "i'm a nice little text document",
						}).url,
					}).url,
				],
			}).url
	),
	{
		storage: localStorage,
		name: "home",
		serialize(string) {
			return string
		},
		deserialize(string) {
			return forceString(string as AutomergeUrl)
		},
	}
)

setHomeURL(untrack(homeURL))

export function useHome() {
	const [doc, handle] = useDocument<Home>(homeURL())
	return [
		doc,
		(change: ChangeFn<Home>) => handle()?.change(change),
		handle,
	] as const
}

export default homeURL
