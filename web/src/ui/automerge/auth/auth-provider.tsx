import {Repo} from "@automerge/automerge-repo"
import {RepoContext} from "../use-repo.ts"
import type * as Auth from "@localfirst/auth"
import {
	AuthProvider,
	getShareId,
	type ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import {useLocalAuthState} from "./local.ts"
import {assert} from "@localfirst/shared"
import {Hello} from "./hello.tsx"
import getDocIdFromTeam from "../../../auth/teams/get-doc-id-from-team.ts"
import start from "../../../repo/start-repo.ts"
import {
	Match,
	Suspense,
	Switch,
	createContext,
	createEffect,
	createSignal,
	type ParentComponent,
} from "solid-js"
import {
	createStore,
	type SetStoreFunction,
	type StoreSetter,
} from "solid-js/store"
import {useNavigate, useParams} from "@solidjs/router"

export const AuthContext = createContext<Partial<lb.AutomergeState>>()

/**
 * To use the app, we need a user, a device, and a team. If we've used the app before,
 * these will be persisted locally. If not, we'll need to create them.
 */
export const AuthContextProvider: ParentComponent = ({children}) => {
	const [localState, updateLocalState] = useLocalAuthState()
	console.log({children})

	// todo get shareId from router
	// const {user, device, shareId} = localState
	// const [team, setTeam] = createSignal<Auth.Team>()
	// const [provider, setProvider] = createSignal<AuthProvider>()
	// const [repo, setRepo] = createSignal<Repo>()
	// const [user, setUser] = createSignal<Auth.UserWithSecrets | undefined>(
	// 	localState.user,
	// )
	// const [device, setDevice] = createSignal<Auth.DeviceWithSecrets | undefined>(
	// 	localState.device,
	// )
	const [authState, updateAuthState] = createStore<Partial<lb.AutomergeState>>({
		user: localState.user,
		device: localState.device,
	})

	// todo move this stuff out of solid
	createEffect(() => {
		// const navigate = useNavigate()
		// const {device, shareId, user} = localState
		if (localState.device) {
			assert(localState.shareId)
			start({user: localState.user, device: localState.device}).then(
				({auth, repo}) => {
					// if (!auth.hasTeam(shareId)) {
					// 	console.error(
					// 		`we are trying to go to the page for a team we don't have access to.`,
					// 	)
					// 	// todo Notifications
					// 	navigate("/")
					// }
					const team = auth.getTeam(shareId)
					// hack that seems to work when the server freaks out
					auth.createTeam(team.teamName)
					// todo find out what happens if we aren't in this team
					console.log("using sasved info")
					updateAuthState({
						team,
						auth,
						repo,
						user,
						device,
						shareId,
					})
				},
			)
		}
	})

	return (
		<Switch fallback={<div>fallback</div>}>
			<Match when={!localState.device}>
				{console.log("match no device") || <div />}
				<dialog open class="first-time">
					<Hello
						complete={({user, device, team, auth, repo}) => {
							const shareId = getShareId(team)
							const spaceId = getDocIdFromTeam(team)
							updateLocalState({user, device, shareId, spaceId})
							updateAuthState({
								team,
								provider: auth,
								repo,
								user,
								device,
								shareId,
							})
						}}
					/>
				</dialog>
			</Match>
			<Match
				when={
					authState.user &&
					authState.team &&
					authState.provider &&
					authState.repo &&
					authState.shareId &&
					authState.device
				}>
				{console.log("match everything", authState, authState.repo) || <div />}
				<AuthContext.Provider value={authState}>
					<div>hello this is inside the context</div>
					{/* {children} */}
				</AuthContext.Provider>
			</Match>
		</Switch>
	)
}
