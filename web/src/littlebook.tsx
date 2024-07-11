import "solid-devtools"
import "./littlebook.scss"

import {Show, Suspense, getOwner, lazy, runWithOwner} from "solid-js"

import {AutomergeContext, getAutomergeState} from "./automerge/use-automerge.ts"

let SpacePage = lazy(() => import("./space/space.tsx"))
let getStartPlugins = () => import("./plugins/start-plugins.ts")

let PleaseReload = lazy(() => import("./service-worker/please-reload.tsx"))

import {render} from "solid-js/web"

export default function Littlebook() {
	let [automerge, _controlAutomerge] = getAutomergeState()
	let owner = getOwner()
	getStartPlugins().then(start => runWithOwner(owner, () => start.default()))

	return (
		<Show when={automerge.latest}>
			<AutomergeContext.Provider value={automerge.latest}>
				<Suspense>
					<SpacePage />
				</Suspense>
				<Suspense>
					<PleaseReload />
				</Suspense>
			</AutomergeContext.Provider>
		</Show>
	)
}

window.EXCALIDRAW_ASSET_PATH = "/"

declare global {
	interface Window {
		EXCALIDRAW_ASSET_PATH: string
	}
}

render(() => <Littlebook />, document.getElementById("littlebook")!)
