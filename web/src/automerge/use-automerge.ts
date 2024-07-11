import {
	createContext,
	createResource,
	useContext,
	type ResourceReturn,
} from "solid-js"
import * as local from "./local.ts"
import start from "./start-repo.ts"
import type {AutomergeList} from "../types.ts"
export let AutomergeContext = createContext<lb.AutomergeState>()
import createDocumentHandle from "../documents/create-document-handle.ts"

export function useAutomerge() {
	let context = useContext(AutomergeContext)
	if (!context) throw new Error("you gotta wrap me in a AutomergeContext")
	return context
}

export function getAutomergeState(): ResourceReturn<lb.AutomergeState> {
	return createResource(async () => {
		let repo = await start()
		let home = local.state.home
		if (!home) {
			let spaceHandle = createDocumentHandle<lb.Space>(repo, {
				type: "space",
				name: "",
				items: [] as lb.FolderId[] as AutomergeList<lb.FolderId>,
			})
			home = spaceHandle.docSync()!.id
			local.set({home})
		}
		return {repo, home}
	})
}
