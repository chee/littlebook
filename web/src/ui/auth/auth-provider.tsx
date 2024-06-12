import type {Repo} from "@automerge/automerge-repo"
import {RepoContext} from "@automerge/automerge-repo-react-hooks"
import type * as Auth from "@localfirst/auth"
import {
	getShareId,
	type AuthProvider,
	type ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import {createContext} from "preact"
import {useEffect, useState} from "preact/hooks"
import {useLocalState} from "./use-local-state.ts"
import {assert} from "@localfirst/shared"
import type {FC} from "preact/compat"
import {Hello} from "./hello.tsx"
import getDocIdFromTeam from "../../auth/teams/get-doc-id-from-team.ts"
import start from "../../repo/start-repo.ts"
import {useRoute} from "wouter-preact"
import {navigate} from "wouter-preact/use-browser-location"

export const AuthContext = createContext<lb.UserInfo | undefined>(undefined)

/**
 * To use the app, we need a user, a device, and a team. If we've used the app before,
 * these will be persisted locally. If not, we'll need to create them.
 */
export const AuthContextProvider: FC = ({children}) => {
	const localState = useLocalState()
	const [routing, routeParams] = useRoute<{shareId: ShareId}>("/space/:shareId")

	const {user, device} = localState
	const shareId = routing ? routeParams.shareId : localState.shareId

	const [team, setTeam] = useState<Auth.Team>()
	const [auth, setAuth] = useState<AuthProvider>()
	const [repo, setRepo] = useState<Repo>()

	useEffect(() => {
		if (device) {
			assert(shareId)
			start({user, device}).then(({auth, repo}) => {
				if (!auth.hasTeam(shareId)) {
					console.error(
						`we are trying to go to the page for a team we don't have access to.`,
					)
					// todo Notifications
					navigate("/")
				}
				const team = auth.getTeam(shareId)
				// todo find out what happens if we aren't in this team
				setTeam(team)
				setAuth(auth)
				setRepo(repo)
			})
		}
	}, [])

	if (!device) {
		return (
			<dialog open class="first-time">
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
			</dialog>
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
