import type {AutomergeUrl} from "@automerge/vanillajs"
import repo from "./automerge.ts"
import {createRoot} from "solid-js"
import {useUserDoc} from ":/domain/user/user.ts"
import {useDocHandle} from "solid-automerge"
createRoot(async () => {
	const user = useUserDoc(repo)
	const home = useDocHandle(() => user()?.home, {repo})
	const api = {
		get user() {
			return user()
		},
		get home() {
			return home()
		},
		get entry() {
			return repo.findWithProgress(
				location.hash.match(/automerge:[^?]+/)?.[0] as AutomergeUrl,
			)?.handle
		},
		get file() {
			return repo.findWithProgress(this.entry?.doc().url).handle
		},
		get hdoc() {
			return this.home?.doc()
		},
		get fdoc() {
			return this.file.doc()
		},
	}

	// @ts-expect-error
	globalThis.api = api
})
//(await repo.find((await
//repo.find(location.hash.match(/automerge:[^?]+/)[0])).doc().url)).doc()
