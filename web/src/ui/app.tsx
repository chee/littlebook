import "./app.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Navigate, Route, Router, useParams} from "@solidjs/router"
// import {FileRoutes} from "@solidjs/start/router"
import {Match, Suspense, Switch, createEffect, createMemo} from "solid-js"

import {
	AuthContext,
	AuthContextProvider,
} from "./automerge/auth/auth-provider.tsx"
import {LittlebookAPIContext} from "./api/use-api.ts"
import SpacePage from "./littlebook/spaces/space-page.tsx"
import {useLocalState} from "./automerge/auth/use-local-state.ts"
import {createStore} from "solid-js/store"
import {Hello} from "./automerge/auth/hello.tsx"
import {
	getShareId,
	type ShareId,
} from "@localfirst/auth-provider-automerge-repo"
import getDocIdFromTeam from "../auth/teams/get-doc-id-from-team.ts"
import {assert} from "@localfirst/shared"
import start from "../repo/start-repo.ts"
import {useAuth} from "./automerge/auth/use-auth.ts"
import createLittlebookAPI from "../api/api.ts"

export default function Littlebook() {
	const [localState, updateLocalState] = useLocalState()
	const [authState, updateAuthState] = createStore<
		Partial<lb.AutomergeAuthState>
	>({})
	createEffect(() => {
		updateAuthState({
			...localState,
		})
	})

	createEffect(() => {
		// const navigate = useNavigate()
		const {device, shareId, user} = localState
		if (device) {
			assert(shareId)
			start({user, device}).then(({auth, repo}) => {
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
				updateLocalState({
					device,
					shareId,
					user,
				})
				updateAuthState({
					team,
					provider: auth,
					repo,
				})
			})
		}
	})

	const api = createMemo(
		() => authState.repo && createLittlebookAPI(authState.repo),
	)

	return (
		<Router
			root={props => (
				<MetaProvider>
					<Title>littlebook</Title>
					<AuthContext.Provider value={authState}>
						<LittlebookAPIContext.Provider value={api}>
							<Suspense>{props.children}</Suspense>
						</LittlebookAPIContext.Provider>
					</AuthContext.Provider>
				</MetaProvider>
			)}>
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
					<Route path="*" component={Fallback} />
					<Route path="/spaces/:shareId" component={SpacePage} />
				</Match>
			</Switch>
		</Router>
	)
}

function Fallback() {
	const auth = useAuth()
	console.log("fallback", {auth})
	console.log(auth?.device, auth?.provider)
	const params = useParams<{shareId?: ShareId}>()
	if (auth?.shareId && !params.shareId) {
		return <Navigate href={`/spaces/${auth.shareId}`} />
	}
	return <div>nothing</div>
}
