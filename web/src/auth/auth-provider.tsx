import type {Repo} from "@automerge/automerge-repo"
import {RepoContext} from "@automerge/automerge-repo-react-hooks"
import type * as Auth from "@localfirst/auth"
import {
	getShareId,
	type AuthProvider,
} from "@localfirst/auth-provider-automerge-repo"
import {createContext} from "preact"
import {useEffect, useState} from "preact/hooks"
import {useLocalState} from "./use-local-state.ts"
import {assert} from "@localfirst/shared"
import type {FC} from "preact/compat"
import {Hello} from "./hello/hello.tsx"
import "./auth-provider.css"
import getDocIdFromTeam from "./teams/get-doc-id-from-team.ts"
import start from "../repo/start-repo.ts"

export const AuthContext = createContext<lb.UserInfo | undefined>(undefined)

/**
 * To use the app, we need a user, a device, and a team. If we've used the app before,
 * these will be persisted locally. If not, we'll need to create them.
 */
export const AuthContextProvider: FC = ({children}) => {
	const localState = useLocalState()
	const {user, device, shareId, spaceId, userName: name} = localState

	const [team, setTeam] = useState<Auth.Team>()
	const [auth, setAuth] = useState<AuthProvider>()
	const [repo, setRepo] = useState<Repo>()

	// biome-ignore lint/correctness/useExhaustiveDependencies: first time only
	useEffect(() => {
		if (device) {
			assert(shareId)
			// We've used the app before - use our existing user & device to instantiate the auth provider and the repo.
			start({user, device}).then(({auth, repo}) => {
				// Get the team from the auth provider (which will have loaded it from storage).
				const team = auth.getTeam(shareId)
				setTeam(team)
				setAuth(auth)
				setRepo(repo)
			})
		}
	}, [])

	if (!device) {
		return (
			<main class="first-time">
				<div class="first-time-inner">
					<Hello
						complete={({user, device, team, auth, repo}) => {
							const shareId = getShareId(team)
							const spaceId = getDocIdFromTeam(team)
							localState.updateLocalState({user, device, shareId, spaceId})
							setTeam(team)
							setAuth(auth)
							setRepo(repo)
						}}
					/>
				</div>
			</main>
		)
	}

	if (user && team && auth && repo) {
		return (
			<RepoContext.Provider value={repo}>
				<AuthContext.Provider value={{device, user, team, auth}}>
					{children}
				</AuthContext.Provider>
			</RepoContext.Provider>
		)
	}

	return <aside />
}
