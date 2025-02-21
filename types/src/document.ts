import {isValidAutomergeUrl, type AutomergeUrl} from "@automerge/automerge-repo"

export type AutomergeURL = AutomergeUrl
export type DocumentURL = string & {__pointplacedoc: true}
export type AutomergeURLOrDocumentURL = DocumentURL | AutomergeURL

type ParsedDocumentURL = Record<string, string> & {
	url: AutomergeUrl
	editor?: string
}

export const isValidAutomergeURL = isValidAutomergeUrl

export function asAutomergeURL(url: AutomergeURLOrDocumentURL): AutomergeURL {
	if (isValidAutomergeURL(url)) {
		return url
	}
	const docinfo = parseDocumentURL(url)
	if (isValidAutomergeURL(docinfo.url)) {
		return docinfo.url
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
	url: AutomergeURLOrDocumentURL
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
