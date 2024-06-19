import "./littlebook.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Navigate, Route, Router, useIsRouting, useParams} from "@solidjs/router"

import {
	Match,
	type ParentComponent,
	type ResourceReturn,
	Suspense,
	Switch,
	createMemo,
} from "solid-js"

import {
	type ShareId,
	getShareId,
} from "@localfirst/auth-provider-automerge-repo"
import createLittlebookAPI from "../api/api.ts"
import type {PairDeviceOptions} from "../auth/devices/pair-device.ts"
import {
	type CreateDefaultTeamOptions,
	createDefaultTeam,
} from "../auth/teams/create-team.ts"
import {LittlebookAPIContext} from "./api/use-api.ts"
import {Hello} from "./automerge/hello.tsx"
import * as local from "./automerge/local.ts"
import {
	AutomergeContext,
	startFromLocal,
	useAutomerge,
} from "./automerge/use-automerge.ts"
import ProjectPage from "./projects/project-page.tsx"
import SpacePage from "./spaces/space-page.tsx"

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
import text from "../plugins/content/text/text.tsx"

const plugins = [excalidraw, text]
import pairDevice from "../auth/devices/pair-device.ts"
import * as pluginAPI from "../plugins/plugin-api.ts"
import PleaseReload from "./sw/please-reload.tsx"

for (const plugin of plugins) {
	plugin(pluginAPI)
}

export default function Littlebook() {
	const [automergeState, control] = startFromLocal()

	return (
		<>
			<Switch>
				<Match when={automergeState.state == "ready" && !automergeState()}>
					<Hello
						pair={(opts: PairDeviceOptions) => {
							pairDevice(opts)
								.then(result => {
									const team = result.team

									local.set({
										device: result.device,
										homeShareId: getShareId(team),
										user: result.user,
									} satisfies Omit<
										Required<lb.LocalAutomergeState>,
										"username"
									>)
									control.refetch()
								})
								.catch(error => {
									console.error(error)
								})
						}}
						fresh={async (opts: CreateDefaultTeamOptions) => {
							createDefaultTeam(opts).then(result => {
								const team = result.team
								local.set({
									device: result.device,
									homeShareId: getShareId(team),
									user: result.user,
								} satisfies Omit<Required<lb.LocalAutomergeState>, "username">)
								control.refetch()
							})
						}}
					/>
				</Match>
				<Match when={automergeState.state == "ready"}>
					<Router
						root={props => (
							<MetaProvider>
								<Title>littlebook</Title>
								<AutomergeContext.Provider value={automergeState!}>
									<LittlebookAPIProvider automergeState={automergeState}>
										<Suspense>{props.children}</Suspense>
									</LittlebookAPIProvider>
								</AutomergeContext.Provider>
							</MetaProvider>
						)}>
						<Route path="/spaces/:shareId" component={SpacePage}>
							<Route path="/*" component={Fallback} />
							<Route path="/projects/:projectId" component={ProjectPage} />
						</Route>
						<Route path="*" component={Fallback} />
						{/* <Route path="/projects/:projectId" component={ProjectPage} /> */}
					</Router>
				</Match>
			</Switch>
			<PleaseReload />
		</>
	)
}
function Fallback() {
	const params = useParams<{shareId?: ShareId}>()
	const routing = useIsRouting()
	const automerge = useAutomerge()
	return (
		<Switch>
			<Match when={!routing() && automerge()?.shareId && !params.shareId}>
				<Navigate href={`/spaces/${automerge()!.shareId}/today`} />
			</Match>
		</Switch>
	)
}

window.EXCALIDRAW_ASSET_PATH = "/"

import {removeDirectory} from "../lib/opfs.ts"
import {render} from "solid-js/web"
declare global {
	interface Window {
		clearOPFS: typeof removeDirectory
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.clearOPFS = removeDirectory

render(() => <Littlebook />, document.getElementById("littlebook")!)
