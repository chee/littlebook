import "./app.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {
	Navigate,
	Route,
	Router,
	action,
	useIsRouting,
	useParams,
} from "@solidjs/router"
// import {FileRoutes} from "@solidjs/start/router"
import {
	Match,
	Show,
	Suspense,
	Switch,
	createEffect,
	createMemo,
	type ParentComponent,
	type ResourceReturn,
} from "solid-js"

import {LittlebookAPIContext} from "./api/use-api.ts"
import SpacePage from "./littlebook/spaces/space-page.tsx"
import type {ShareId} from "@localfirst/auth-provider-automerge-repo"
import createLittlebookAPI from "../api/api.ts"
import {
	AutomergeContext,
	createDefaultTeam,
	pair,
	startFromLocal,
	useAutomerge,
} from "./automerge/auth/use-automerge.ts"
import * as local from "./automerge/auth/local.ts"
import {Hello} from "./automerge/auth/hello.tsx"
import type {PairDeviceOptions} from "../auth/devices/pair-device.ts"
import type {CreateDefaultTeamOptions} from "../auth/teams/create-team.ts"
import ProjectPage from "./littlebook/projects/project-page.tsx"

const LittlebookAPIProvider: ParentComponent<{
	automergeState: ResourceReturn<lb.AutomergeState | undefined>[0]
}> = props => {
	const api = createMemo(() => {
		const state = props.automergeState()
		return state?.repo && createLittlebookAPI(state.repo)
	})
	return (
		<LittlebookAPIContext.Provider value={api}>
			{props.children}
		</LittlebookAPIContext.Provider>
	)
}

import excalidraw from "@littlebook/excalidraw"

const plugins = [excalidraw]
import * as pluginAPI from "../plugins/plugin-api.ts"

for (const plugin of plugins) {
	plugin(pluginAPI)
}

export default function Littlebook() {
	const [state, control] = startFromLocal()

	return (
		<Switch>
			<Match when={state.state == "ready" && state() == null}>
				<Hello
					pair={(opts: PairDeviceOptions) => {
						const [state] = pair(opts)
						createEffect(() => {
							const s = state()
							if (s) {
								local.set(s)
								// stateResource[1].refetch()
							}
						})
					}}
					fresh={(opts: CreateDefaultTeamOptions) => {
						const [state] = createDefaultTeam(opts)
						createEffect(() => {
							const s = state()
							if (s) {
								local.set(s)
								// stateResource[1].refetch()
							}
						})
					}}
				/>
			</Match>
			<Match when={state() != null}>
				<Router
					root={props => (
						<MetaProvider>
							<Title>littlebook</Title>
							<AutomergeContext.Provider value={state}>
								<LittlebookAPIProvider automergeState={state}>
									<Suspense>{props.children}</Suspense>
								</LittlebookAPIProvider>
							</AutomergeContext.Provider>
						</MetaProvider>
					)}>
					<Route path="*" component={Fallback} />
					<Route path="/spaces/:shareId" component={SpacePage}>
						<Route path="/*" component={Fallback} />
						<Route path="/projects/:projectId" component={ProjectPage} />
					</Route>
					{/* <Route path="/projects/:projectId" component={ProjectPage} /> */}
				</Router>
			</Match>
		</Switch>
	)
}

function Fallback() {
	const params = useParams<{shareId?: ShareId}>()
	const routing = useIsRouting()
	return (
		<Switch>
			<Match when={!routing() && local.state.homeShareId && !params.shareId}>
				<Navigate href={`/spaces/${local.state.homeShareId}`} />
			</Match>
		</Switch>
	)
}
