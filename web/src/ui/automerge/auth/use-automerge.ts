import {
	createContext,
	useContext,
	createResource,
	type ResourceReturn,
} from "solid-js"
import type {CreateRepoOpts} from "../../../repo/start-repo"
import start from "../../../repo/start-repo"
import * as local from "./local"
import * as createTeams from "../../../auth/teams/create-team"
import type {PairDeviceOptions} from "../../../auth/devices/pair-device"
import pairDevice from "../../../auth/devices/pair-device"

export const AutomergeContext =
	createContext<ResourceReturn<lb.AutomergeState | undefined>[0]>()

export function useAutomerge() {
	const context = useContext(AutomergeContext)
	if (!context) throw new Error("you gotta wrap me in a AutomergeContext")
	return context
}

export function startRepo(opts: CreateRepoOpts) {
	return createResource(() => start({user: opts.user, device: opts.device}))
}

export function startFromLocal(): ResourceReturn<
	lb.AutomergeState | undefined
> {
	return createResource(
		() =>
			local.state.user &&
			local.state.device &&
			local.state.homeShareId &&
			start({
				user: local.state.user,
				device: local.state.device,
			}).then(({auth, repo}) => {
				const team = auth.getTeam(local.state.homeShareId!)
				// hack that seems to work when the server freaks out
				auth.createTeam(team.teamName)
				return {
					team,
					auth,
					repo,
					user: local.state.user!,
					device: local.state.device!,
					homeShareId: local.state.homeShareId!,
				} satisfies lb.AutomergeState
			}),
	)
}

export function pair(opts: PairDeviceOptions) {
	return createResource(() => pairDevice(opts))
}

export function createTeam(opts: createTeams.CreateTeamOptions) {
	return createResource(() => createTeams.default(opts))
}

export function createDefaultTeam(opts: createTeams.CreateDefaultTeamOptions) {
	return createResource(() => createTeams.createDefaultTeam(opts))
}
