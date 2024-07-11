import "solid-devtools"
import "./littlebook.scss"

import {
	Show,
	Suspense,
	createSignal,
	getOwner,
	lazy,
	runWithOwner,
} from "solid-js"

import {AutomergeContext, getAutomergeState} from "./automerge/use-automerge.ts"

let SpacePage = lazy(() => import("./space/space.tsx"))
let getStartPlugins = () => import("./plugins/start-plugins.ts")

let PleaseReload = lazy(() => import("./service-worker/please-reload.tsx"))

import {render} from "solid-js/web"

export default function Littlebook() {
	let [automerge, _controlAutomerge] = getAutomergeState()
	let owner = getOwner()
	let [pluginsReady, setPluginsReady] = createSignal(false)
	getStartPlugins()
		.then(start => runWithOwner(owner, () => start.default()))
		.then(() => setPluginsReady(true))

	return (
		<>
			<Suspense>
				<PleaseReload />
			</Suspense>

			<Show when={automerge.latest && pluginsReady()}>
				<AutomergeContext.Provider value={automerge.latest}>
					<Suspense>
						<SpacePage />
					</Suspense>
				</AutomergeContext.Provider>
			</Show>
		</>
	)
}

window.EXCALIDRAW_ASSET_PATH = "/"

declare global {
	interface Window {
		EXCALIDRAW_ASSET_PATH: string
	}
}

render(() => <Littlebook />, document.getElementById("littlebook")!)
