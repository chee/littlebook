import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/vanillajs"

/**
 * littlebook+automerge://<docid>#<head>[/path/to/prop]?editor=editor
 * littlebook+opfs://path/to/file?editor=editor
 * littlebook+magnet
 */

export type LittlebookURL = string & {__littlebookURL: true}

export type AutomergeURL = AutomergeUrl
export type DocumentURL = string & {littlebookdoc: true}
export type AutomergeURLOrDocumentURL = DocumentURL | AutomergeURL

type ParsedDocumentURL = Record<string, string> & {
	url: AutomergeUrl
	editor?: string
}

export const isValidAutomergeURL = isValidAutomergeUrl

export function asAutomergeURL<T extends AutomergeURL = AutomergeURL>(
	url: AutomergeURLOrDocumentURL,
): T {
	if (isValidAutomergeURL(url)) {
		return url as T
	}
	const docinfo = parseDocumentURL(url)
	if (isValidAutomergeURL(docinfo.url)) {
		return docinfo.url as T
	}
	throw new Error(`invalid documentURL: ${url}`)
}

export function asDocumentURL(url: AutomergeURLOrDocumentURL): DocumentURL {
	if (isValidAutomergeURL(url)) {
		return url as unknown as DocumentURL
	}
	const docinfo = parseDocumentURL(url)
	if (isValidAutomergeURL(docinfo.url)) {
		return docinfo.url as unknown as DocumentURL
	}
	throw new Error(`invalid documentURL: ${url}`)
}

export function isValidDocumentURL(url: string): url is DocumentURL {
	return (
		isValidAutomergeURL(url) ||
		(typeof url == "string" &&
			url.startsWith("automerge:") &&
			isValidAutomergeURL(parseDocumentURL(url as DocumentURL).url))
	)
}

export function parseDocumentURL(
	url: AutomergeURLOrDocumentURL,
): ParsedDocumentURL {
	const u = new URL(url)
	const base = u.protocol + u.pathname
	return {
		...Object.fromEntries(u.searchParams.entries()),
		url: base as AutomergeUrl,
	}
}

export function renderDocumentURL(docinfo: ParsedDocumentURL): DocumentURL {
	const u = new URL(docinfo.url)
	for (const [key, value] of Object.entries(docinfo)) {
		if (key === "url") continue
		u.searchParams.set(key, value)
	}
	return u.toString() as DocumentURL
}

interface LittlebookIndexedDBURLDescriptor {
	type: "indexeddb"
	key: string
}

export function parseLittlebookURL(
	url: LittlebookURL,
): LittlebookURLDescriptor {
	if (isValidAutomergeURL(url)) {
		return parseDocumentURL(url)
	}
	const u = new URL(url)
	if (u.protocol !== "littlebook:") {
		throw new Error(`invalid littlebook URL: ${url}`)
	}
	const docinfo = parseDocumentURL(u.pathname as DocumentURL)
	docinfo.editor = u.searchParams.get("editor") ?? undefined
	return docinfo
}
