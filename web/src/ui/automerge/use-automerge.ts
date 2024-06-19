import {
	type ResourceReturn,
	createContext,
	createResource,
	useContext,
	createEffect,
} from "solid-js"
import start from "../../repo/start-repo"
import * as local from "./local"
import getDocIdFromTeam from "../../auth/teams/get-doc-id-from-team.ts"

export const AutomergeContext =
	createContext<ResourceReturn<lb.AutomergeState | undefined>[0]>()

export function useAutomerge() {
	const context = useContext(AutomergeContext)
	if (!context) throw new Error("you gotta wrap me in a AutomergeContext")
	return context
}

export function startFromLocal(): ResourceReturn<
	lb.AutomergeState | undefined
> {
	const am = createResource(() => {
		const user = local.state.user
		const device = local.state.device
		const shareId = local.state.homeShareId
		return (
			user &&
			device &&
			shareId &&
			start({
				user,
				device,
			}).then(({auth, repo}) => {
				const team = auth.getTeam(shareId)
				return {
					team,
					auth,
					repo,
					user,
					device,
					shareId,
				} satisfies lb.AutomergeState
			})
		)
	})

	return am
}
