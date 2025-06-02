import defaultRepo from ":/core/sync/automerge.ts"
import {setIcon} from ":/docs/traits/icon.ts"
import type {
	AutomergeMapValue,
	FileEntryDoc,
	FileEntryURL,
} from ":/docs/file-entry-doc.ts"
import type {Doc} from "@automerge/automerge"
import type {DocHandle} from "@automerge/automerge-repo"
import {
	createDocumentProjection,
	makeDocumentProjection,
	RepoContext,
	useDocHandle,
} from "solid-automerge"
import {createMemo, useContext} from "solid-js"
import cache from "../cache.ts"

export function useFileEntry(url: FileEntryURL) {
	const handle = useDocHandle<FileEntryDoc>(url)
	return createMemo(() => handle() && createFileEntry(handle()!))
}

/**
 *
 * @param handle
 * @returns
 */

export default function createFileEntry<Content extends AutomergeMapValue = {}>(
	handle: DocHandle<FileEntryDoc>,
): FileEntry {
	if (cache.has(handle)) {
		return cache.get(handle) as FileEntry
	}
	const doc = makeDocumentProjection<FileEntryDoc>(handle)
	if (doc.type !== "entry") {
		throw new Error(
			`expected to find an entry in there, but got type: ${doc.type}`,
		)
	}
	let contentHandle: () => DocHandle<Content> | undefined
	let content: () => Doc<Content> | undefined

	const entry = {
		type: "entry" as const,
		get doc() {
			return handle.doc()
		},
		get url() {
			return handle.url as FileEntryURL
		},
		get handle() {
			return handle
		},
		get icon() {
			return doc.icon ?? ""
		},
		get name() {
			return doc.name
		},
		set name(name: string) {
			handle.change(doc => (doc.name = name))
		},
		set icon(icon: string) {
			handle.change(doc => setIcon(doc, icon))
		},

		get contentHandle() {
			if (!contentHandle) {
				const repo = useContext(RepoContext) ?? defaultRepo
				contentHandle = useDocHandle<Content>(() => doc?.url, {repo})
			}
			return contentHandle()
		},
		get content() {
			if (!content) {
				content = createDocumentProjection<Content>(
					() => this.contentHandle,
				)
			}
			return content()
		},
	}
	cache.set(handle, entry)
	return entry
}

export interface FileEntry<Content extends AutomergeMapValue = {}> {
	readonly type: "entry"
	readonly url: FileEntryURL
	readonly doc: Doc<FileEntryDoc>

	readonly contentHandle: DocHandle<Content> | undefined
	readonly content: Doc<Content> | undefined
	readonly handle: DocHandle<FileEntryDoc>
	icon: string
	name: string
}
