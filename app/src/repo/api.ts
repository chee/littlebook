import type {AutomergeUrl} from "@automerge/automerge-repo"
import repo from "./create.ts"
import homeURL from "./home.ts"
const api = {
	get home() {
		return repo.find(homeURL())
	},
	get current() {
		return repo.find(location.hash.slice(1) as AutomergeUrl)
	},
}
window.api = api

declare global {
	interface Window {
		api: typeof api
	}
}
