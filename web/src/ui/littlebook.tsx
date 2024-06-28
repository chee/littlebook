import "./littlebook.scss"

import {MetaProvider, Title} from "@solidjs/meta"
import {Navigate, Route, Router} from "@solidjs/router"

import {Suspense, Show} from "solid-js"

import {AutomergeContext, initialize} from "./automerge/use-automerge.ts"

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
import start from "../repo/start-repo.ts"
import dbName from "../lib/db-name.ts"
const plugins = [excalidraw, text, media, unknown, books, tldraw]
import "@littlebook/tldraw/index.css"

for (const plugin of plugins) {
	plugin(pluginAPI)
}

export default function Littlebook({
	automergeState,
}: {automergeState: lb.AutomergeState}) {
	return (
		<>
			<Show when={automergeState}>
				<Router
					root={props => (
						<MetaProvider>
							<Title>littlebook</Title>
							<AutomergeContext.Provider value={automergeState}>
								<Suspense>{props.children}</Suspense>
							</AutomergeContext.Provider>
						</MetaProvider>
					)}>
					<Route path="/" component={SpacePage}>
						<Route path="/documents/:fileId" component={ContentViewer} />
						<Route path="/today" component={() => <div>today</div>} />
						<Route path="*" component={Fallback} />
					</Route>
				</Router>
			</Show>
			<PleaseReload />
		</>
	)
}
function Fallback() {
	return <Navigate href="/today" />
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

const {user, device, home} = local.state
if (user && device && home) {
	start({
		user: {...user, keys: {...user.keys}},
		device: {...device, keys: {...device.keys}},
	}).then(({auth, repo}) => {
		const team = auth.getTeam(home)
		render(
			() => (
				<Littlebook
					automergeState={
						{
							auth,
							repo,
							user: user!,
							device: device!,
							team,
						} satisfies lb.AutomergeState
					}
				/>
			),
			document.getElementById("littlebook")!,
		)
	})
} else {
	initialize()
}
