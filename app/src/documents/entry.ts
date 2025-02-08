import {z} from "zod"
import {h} from "../schema-helpers.ts"
import type {AutomergeUrl, Repo} from "@automerge/automerge-repo"
import {type Accessor} from "solid-js"
import {useDocument} from "solid-automerge"
import {ContentType} from "../registries/content-type/content-type-schema.ts"
import repo from "../repo/create.ts"

export const Entry = z.object({
	/**
	 * an entry that describes and points to a file
	 */
	type: z.literal("file"),
	// the file's name
	name: z.string(),
	// a solar icon name or a URL
	icon: z.string().optional(),
	// the file's contentType
	contentType: z.string(),
	contentTypeURL: h.automergeURL().optional(),

	// a ref to the file
	url: h.automergeURL(),
})

export type Entry = z.infer<typeof Entry>

export const ResolvedEntry = z.object({
	name: z.string(),
	icon: z.string().optional(),
	contentType: ContentType,
	file: z.unknown(),
})

export type ResolvedEntry = z.infer<typeof ResolvedEntry>

export async function entryResolver(entry: Entry) {
	const file = (await repo.findClassic(entry.url)).doc()
	const contentType = (await repo.findClassic(entry.contentType)).doc()
	return {name: entry.name, icon: entry.icon, contentType, file}
}

export function useEntry(url: Accessor<AutomergeUrl>, {repo}: {repo: Repo}) {
	return useDocument<Entry>(url)
}
