import {curl} from "../core/sync/automerge.ts"
import type {AutomergeURL} from "../core/sync/url.ts"
import type {AutomergeMapValue} from "+types+"

export type FileEntryURL = AutomergeURL & {type: "entry"}
export type FileContentURL = AutomergeURL & {type: "content"}

export interface FileEntry {
	/**
	 * an entry that describes and points to a file
	 */
	type: "entry"
	/** the file's name */
	name: string
	/**  a solar icon name or a URL or a dataURI or an automerge url to bytes doc */
	icon?: string
	/* ref to file content */
	url: FileContentURL
}

export function createFileEntryDoc(
	entry: Partial<FileEntry> &
		({content: AutomergeMapValue} | {url: FileContentURL}),
): FileEntry {
	return {
		name: "new",
		...entry,
		type: "entry",
		url: "url" in entry ? entry.url! : curl<FileContentURL>(entry.content),
	}
}

export function createFileEntry(
	entry: Partial<FileEntry> &
		({content: AutomergeMapValue} | {url: FileContentURL}),
): FileEntryURL {
	return curl(createFileEntryDoc(entry))
}

window.createFileEntry = createFileEntry
