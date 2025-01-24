import {z} from "zod"
import {h} from "../schema-helpers.ts"
import type {AutomergeUrl, Repo} from "@automerge/automerge-repo"
import {createResource, type Accessor} from "solid-js"
import {createDocumentStore} from "automerge-repo-solid-primitives"

export const Entry = z.object({
	/**
	 * an entry that describes and points to a file
	 */
	type: z.literal("file"),
	// the file's name
	name: z.string(),
	// the file's contentType
	contentType: z.string(),
	// additional content types interfaces this file presents
	// e.g. {contentType: "gfm", conformsTo: ["markdown", "text"]}
	// todo should this be something the _type_ knows about instead
	// i.e. should a type be a URL to a type, which is a description
	// in automerge? could even come with a schema attached to
	// it and
	conformsTo: z.array(z.string()).optional(),
	// a ref to the file
	url: h.automergeURL(),
})

export type Entry = z.infer<typeof Entry>

export function useEntry(url: Accessor<AutomergeUrl>, {repo}: {repo: Repo}) {
	const [handle] = createResource(async function () {
		const handle = repo.find<Entry>(url())
		await handle.whenReady()
		return handle
	})
	return [createDocumentStore(handle), handle] as const
}
