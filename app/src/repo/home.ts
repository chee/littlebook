import {makePersisted} from "@solid-primitives/storage"
import repo from "./create.ts"
import {createSignal, untrack} from "solid-js"
import {type AutomergeUrl, type ChangeFn} from "@automerge/automerge-repo"
import {useDocument} from "solid-automerge"
import {automergeURL, type Entry} from "@pointplace/types"
import * as v from "valibot"

export const Home = v.object({
	name: v.string(),
	sinks: v.array(automergeURL),
	sources: v.array(automergeURL),
	views: v.array(automergeURL),
	files: v.array(automergeURL),
	associations: v.record(automergeURL, v.string()),
})

export type Home = v.InferOutput<typeof Home>

const forceString = (string: string) =>
	(string?.[0] == `"` ? JSON.parse(string) : string) as AutomergeUrl

const [homeEntryURL, setHomeEntryURL] = makePersisted(
	// eslint-disable-next-line solid/reactivity
	createSignal<AutomergeUrl>(
		forceString(localStorage.getItem("home")!) ??
			repo.create({
				type: "entry",
				name: "home",
				icon: "ghost-smile-bold",
				url: repo.create({
					name: "home",
					sinks: [],
					sources: [],
					views: [],
					files: [
						createEntry({
							name: "my manifesto.txt",
							content: {
								text: "hello world",
							},
						}).url,
					],
					associations: {},
				} satisfies Home).url,
			} satisfies Entry).url
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
	content: T
	icon?: string
}) {
	return repo.create<Entry>({
		type: "entry",
		name: opts.name,
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
