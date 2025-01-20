import {makePersisted} from "@solid-primitives/storage"
import repo from "./create.ts"
import {createSignal, untrack} from "solid-js"
import type {AutomergeUrl} from "@automerge/automerge-repo"

export interface DocumentBase {
	name: string
	icon?: string
	type: string
	importer?: AutomergeUrl
	editors?: AutomergeUrl[]
}

export interface ParentDocument extends DocumentBase {
	children: AutomergeUrl[]
}

export interface FolderDocument extends ParentDocument {
	type: "folder"
}

export interface HomeDocument extends ParentDocument {
	type: "home"
	importers: AutomergeUrl[]
	exporters: AutomergeUrl[]
	editors: AutomergeUrl[]
	treeviewers: AutomergeUrl[]
	viewers: AutomergeUrl[]
}

export interface TextDocument extends DocumentBase {
	type: "text"
	text: string
}

export interface RichtextDocument extends DocumentBase {
	type: "richtext"
	text: string
}

const [homeURL, setHomeURL] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal(
		(localStorage.getItem("home") as AutomergeUrl) ??
			repo.create<HomeDocument>({
				name: "home",
				type: "home",
				importers: [],
				exporters: [],
				editors: [],
				treeviewers: [],
				viewers: [],
				children: [
					repo.create<TextDocument>({
						name: "my manifesto.txt",
						type: "text",
						text: "",
					}).url,
				],
			}).url
	),
	{storage: localStorage, name: "home"}
)

setHomeURL(untrack(homeURL))

export default homeURL
