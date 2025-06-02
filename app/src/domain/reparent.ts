import type {AutomergeURL} from ":/core/sync/url.ts"
import {deleteAt} from "@automerge/automerge"
import type {DocHandle} from "@automerge/automerge-repo"
import {FolderShape} from "@littlebook/plugin-api/shapes/shapes.ts"

export default async function reparent(
	url: AutomergeURL,
	lastParentHandle: DocHandle<FolderShape>,
	nextParentHandle: DocHandle<FolderShape>,
) {
	const lastParent = lastParentHandle.doc()
	const nextParent = nextParentHandle.doc()

	const lfiles = Array.from(lastParent.files)
	const lindex = lfiles.indexOf(url)

	if (lindex > -1) {
		lastParentHandle.change(doc => {
			deleteAt(doc.files, lindex)
		})
	}

	if (!nextParent.files.includes(url)) {
		nextParentHandle.change(doc => {
			doc.files.push(url)
		})
	}
}
