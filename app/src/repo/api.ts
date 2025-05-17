import type {AutomergeUrl} from "@automerge/vanillajs"
import repo from "./create.ts"
import {type Home, useHome} from "./home.ts"
import {createRoot} from "solid-js"
const api = {
	get home() {
		return createRoot(() => {
			const [_h, _hh, _hhh, entry] = useHome()
			return repo.findWithProgress<Home>(entry()!.url).handle
		})
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
