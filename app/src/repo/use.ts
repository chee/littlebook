import type {AutomergeUrl, Repo} from "@automerge/automerge-repo"
import {createResource, type Accessor} from "solid-js"
import defaultRepo from "./create.ts"
import type {Entry} from "../documents/entry.ts"
import {createDocumentStore} from "automerge-repo-solid-primitives"

export function useHandle(
	url: Accessor<AutomergeUrl>,
	{repo = defaultRepo}: {repo: Repo}
) {
	const [handle] = createResource(async function () {
		const handle = repo.find<Entry>(url())
		await handle.whenReady()
		return handle
	})
	return [createDocumentStore(handle), handle] as const
}
