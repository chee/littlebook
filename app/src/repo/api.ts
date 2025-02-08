import type {AutomergeUrl, DocHandle} from "@automerge/automerge-repo"
import repo from "./create.ts"
import homeURL, {type Home} from "./home.ts"
const api = {
	get home() {
		return repo.findWithProgress<Home>(homeURL()).handle
	},
	get current() {
		return repo.findWithProgress(location.hash.slice(1) as AutomergeUrl)
			.handle
	},
	get hdoc() {
		return this.home.doc()
	},
	get cdoc() {
		return this.current.doc()
	},
}
window.api = api

declare global {
	interface Window {
		api: typeof api
	}
}
