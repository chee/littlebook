import "./littlebook.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Navigate, Route, Router} from "@solidjs/router"

import {Suspense, Show, createEffect} from "solid-js"

import {AutomergeContext, getAutomergeState} from "./automerge/use-automerge.ts"

import SpacePage from "./spaces/space-page.tsx"

import excalidraw from "@littlebook/excalidraw"
import text from "../plugins/content/text/text.tsx"
import media from "../plugins/content/media/media.tsx"
import unknown from "../plugins/content/unknown/unknown.ts"
import books from "../plugins/content/books/books.ts"
import tldraw from "@littlebook/tldraw"
import * as pluginAPI from "../plugins/plugin-api.ts"
import PleaseReload from "./sw/please-reload.tsx"
import {removeDirectory} from "../lib/opfs.ts"
import {render} from "solid-js/web"
import ContentViewer from "./files/content-viewer.tsx"
import * as local from "./automerge/local.ts"
import start from "../automerge/start-repo.ts"
const plugins = [excalidraw, text, media, unknown, books, tldraw]
import "@littlebook/tldraw/index.css"
import {createSpaceHandle} from "../api/spaces.ts"

for (const plugin of plugins) {
	plugin(pluginAPI)
}

export default function Littlebook() {
	const [automerge, _controlAutomerge] = getAutomergeState()

	return (
		<>
			<Show when={automerge.latest}>
				<Router
					root={props => (
						<MetaProvider>
							<Title>littlebook</Title>
							<AutomergeContext.Provider value={automerge.latest}>
								<Suspense>{props.children}</Suspense>
							</AutomergeContext.Provider>
						</MetaProvider>
					)}>
					<Route path="/documents/:itemId" component={ContentViewer} />
					<Route path="/space" component={SpacePage}>
						<Route path="/documents/:itemId" component={ContentViewer} />
						<Route path="/today" component={() => <div>today</div>} />
					</Route>
					<Route path="*" component={Fallback} />
				</Router>
			</Show>
			<PleaseReload />
		</>
	)
}
function Fallback() {
	return <Navigate href="/space/today" />
}

window.EXCALIDRAW_ASSET_PATH = "/"

async function destroy() {
	localStorage.clear()

	const proms: Promise<any>[] = []
	for (const db of await indexedDB.databases()) {
		proms.push(
			new Promise((yay, boo) => {
				const trans = indexedDB.deleteDatabase(db.name!)
				trans.onsuccess = yay
				trans.onerror = boo
				trans.onblocked = boo
			}),
		)
	}
	removeDirectory()
	Promise.allSettled(proms).then(() => location.reload())
}
declare global {
	interface Window {
		destroy: () => void
		EXCALIDRAW_ASSET_PATH: string
	}
}
window.destroy = destroy

start().then(repo => {
	let home = local.state.home
	if (!home) {
		const spaceHandle = createSpaceHandle(repo)
		home = spaceHandle.docSync()!.id
		local.set({home})
	}
})

render(() => <Littlebook />, document.getElementById("littlebook")!)
