import {makePersisted} from "@solid-primitives/storage"
import repo from "./create.ts"
import {createSignal, untrack} from "solid-js"
import type {AutomergeUrl} from "@automerge/automerge-repo"
import {Schema} from "effect"
import type {AutomergeValue} from "@automerge/automerge/next"

type pptypes =
	| "folder"
	| "text"
	| "sound"
	| "canvas"
	| "bookmark"
	| "folder"
	| "richtext"

// todo make an AutomergeURL schema type
// const FolderType = Schema.Struct({
// 	name: Schema.Literal("folder"),
// 	shape: Schema.Struct({
// 		children: Schema.List(Schema.String),
// 	}),
// })

// type FolderType = Schema.Schema.Type<typeof FolderType>

const Folder = Schema.Struct({
	// todo consider symbol
	type: Schema.Literal("folder"),
	children: Schema.Array(Schema.String),
})

type Folder = Schema.Schema.Type<typeof Folder>

const Text = Schema.Struct({
	type: Schema.Literal("text"),
	text: Schema.String,
})

type Text = Schema.Schema.Type<typeof Text>

export interface FolderDocument {
	type: "folder"
	children: AutomergeUrl[]
}

export interface TextDocument {
	type: "text"
	text: string
}

const [homeURL, setHomeURL] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal(
		(localStorage.getItem("home") as AutomergeUrl) ??
			repo.create<FolderDocument>({
				type: "folder",
				children: [
					repo.create<TextDocument>({
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
