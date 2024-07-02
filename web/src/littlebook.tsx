import "./littlebook.scss"

import {MetaProvider, Title} from "@solidjs/meta"

import {Show, Suspense, createEffect} from "solid-js"

import {AutomergeContext, getAutomergeState} from "./automerge/use-automerge.ts"

import SpacePage from "./spaces/space-page.tsx"

import excalidraw from "@littlebook/excalidraw"
import text from "./plugins/content/text/text.tsx"
import media from "./plugins/content/media/media.tsx"
import unknown from "./plugins/content/unknown/unknown.ts"
import books from "./plugins/content/books/books.ts"
import tldraw from "@littlebook/tldraw"
import * as pluginAPI from "./plugins/plugin-api.ts"
import PleaseReload from "./service-worker/please-reload.tsx"
import {removeDirectory} from "./lib/opfs.ts"
import {render} from "solid-js/web"
import "@littlebook/tldraw/index.css"
import {createUI} from "./ui/ui-state.ts"
import {UIProvider} from "./ui/use-ui-state.tsx"
const plugins = [excalidraw, text, media, unknown, books, tldraw]

for (const plugin of plugins) {
	plugin(pluginAPI)
}

export default function Littlebook() {
	const [automerge, _controlAutomerge] = getAutomergeState()

	return (
		<MetaProvider>
			<Title>littlebook</Title>
			<Show when={automerge.latest}>
				<AutomergeContext.Provider value={automerge.latest}>
					<UIProvider>
						<Suspense>
							<SpacePage />
						</Suspense>
						<PleaseReload />
					</UIProvider>
				</AutomergeContext.Provider>
			</Show>
		</MetaProvider>
	)
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

render(() => <Littlebook />, document.getElementById("littlebook")!)
