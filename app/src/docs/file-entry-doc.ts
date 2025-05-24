import {curl} from "../core/sync/automerge.ts"
import type {AutomergeURL} from "../core/sync/url.ts"

import type {AutomergeValue} from "@automerge/automerge"
export type AutomergeMapValue = {
	[key: string]: AutomergeValue
}
export type FileEntryURL = AutomergeURL & {__entryURL: true}
export type FileContentURL = AutomergeURL & {__contentURL: true}

export interface FileEntryDoc {
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
	entry: Partial<FileEntryDoc> &
		({content?: AutomergeMapValue} | {url: FileContentURL}),
): FileEntryDoc {
	let content: AutomergeMapValue | undefined
	if ("content" in entry) {
		content = entry.content
		delete entry.content
	}
	return {
		name: "new",
		...entry,
		type: "entry",
		url: "url" in entry ? entry.url! : curl<FileContentURL>(content),
	}
}

export function createFileEntry(
	entry: Partial<FileEntryDoc> &
		({content: AutomergeMapValue} | {url: FileContentURL}),
): FileEntryURL {
	return curl(createFileEntryDoc(entry))
}

export type FileEntryTemplate = Parameters<typeof createFileEntry>[0]
