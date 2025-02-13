import {makePersisted} from "@solid-primitives/storage"
import repo from "./create.ts"
import {createSignal, untrack} from "solid-js"
import {type AutomergeUrl, type ChangeFn} from "@automerge/automerge-repo"
import {useDocument} from "solid-automerge"
import {automergeURL, type ContentType, type Entry} from "@pointplace/types"
import * as v from "valibot"

export const Home = v.object({
	type: v.literal("home"),
	name: v.string(),
	importers: v.array(automergeURL),
	publishers: v.array(automergeURL),
	editors: v.array(automergeURL),
	treeviewers: v.array(automergeURL),
	tabviewers: v.array(automergeURL),
	viewers: v.array(automergeURL),
	files: v.array(automergeURL),
	associations: v.record(automergeURL, v.string()),
})

export type Home = v.InferOutput<typeof Home>

export const HomeContentType: ContentType<Home> = {
	displayName: "home",
	id: "public.home",
	schema: Home,
	conformsTo: ["public.folder"],
	icon: "ghost-smile-bold",
}

const forceString = (string: string) =>
	(string?.[0] == `"` ? JSON.parse(string) : string) as AutomergeUrl

const [homeEntryURL, setHomeEntryURL] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal(
		forceString(localStorage.getItem("home")!) ??
			createEntry({
				name: "home",
				contentType: "public.home",
				icon: "ghost-smile-bold",
				content: {
					importers: [],
					publishers: [],
					editors: [],
					treeviewers: [],
					tabviewers: [],
					viewers: [],
					associations: {},
					files: [
						createEntry({
							name: "my manifesto.txt",
							contentType: "public.text",
							content: {
								text: "hello world",
							},
						}).url,
					],
				},
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

export function createEntry<T>(opts: {
	name: string
	contentType: string
	content: T
	icon?: string
}) {
	return repo.create<Entry>({
		type: "file",
		name: opts.name,
		contentType: opts.contentType,
		icon: opts.icon ?? "",
		url: repo.create(opts.content).url,
	})
}

setHomeEntryURL(untrack(homeEntryURL))

export function useHome() {
	const [entry, entryHandle] = useDocument<Entry>(homeEntryURL(), {repo})
	const [home, homeHandle] = useDocument<Home>(() => entry()?.url, {repo})
	return [
		home,
		(change: ChangeFn<Home>) => homeHandle()?.change(change),
		homeHandle,
		entry,
		entryHandle,
	] as const
}

export {homeEntryURL}
