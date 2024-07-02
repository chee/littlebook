import {
	createContext,
	createResource,
	useContext,
	type ResourceReturn,
} from "solid-js"
import * as local from "./local.ts"
import start from "./start-repo.ts"
import {createSpaceHandle} from "../api/spaces.ts"
export const AutomergeContext = createContext<lb.AutomergeState>()

export function useAutomerge() {
	const context = useContext(AutomergeContext)
	if (!context) throw new Error("you gotta wrap me in a AutomergeContext")
	return context
}

export function getAutomergeState(): ResourceReturn<lb.AutomergeState> {
	return createResource(async () => {
		const repo = await start()
		let home = local.state.home
		if (!home) {
			const spaceHandle = createSpaceHandle(repo)
			home = spaceHandle.docSync()!.id
			local.set({home})
		}
		return {repo, home}
	})
}
