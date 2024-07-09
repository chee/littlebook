import "solid-devtools"
import "./littlebook.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Show, Suspense, lazy} from "solid-js"

import {AutomergeContext, getAutomergeState} from "./automerge/use-automerge.ts"

const SpacePage = lazy(() => import("./space/space.tsx"))
const getStartPlugins = () => import("./plugins/start-plugins.ts")

const PleaseReload = lazy(() => import("./service-worker/please-reload.tsx"))

import {render} from "solid-js/web"

export default function Littlebook() {
	const [automerge, _controlAutomerge] = getAutomergeState()
	getStartPlugins().then(start => start.default())
	return (
		<MetaProvider>
			<Title>littlebook</Title>
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
		</MetaProvider>
	)
}

window.EXCALIDRAW_ASSET_PATH = "/"

declare global {
	interface Window {
		EXCALIDRAW_ASSET_PATH: string
	}
}

render(() => <Littlebook />, document.getElementById("littlebook")!)
