/* @refresh reload */
import "./styles/preflight.css"
import "./styles/font-face.css"
import "./styles/global.css"
import "./styles/palette.css"
import "./styles/animations.css"

import {render} from "solid-js/web"
import App from "./pages/app.tsx"
import {attachDevtoolsOverlay} from "@solid-devtools/overlay"
import registerServiceWorker from "./register-service-worker.ts"
import "./documents/entry.ts"

if (import.meta.env.DEV) {
	attachDevtoolsOverlay()
} else {
	registerServiceWorker()
}

const root = document.getElementById("root")!

import {
	EditorRegistry,
	EditorRegistryContext,
} from "./registries/editor/editor-registry.ts"
import repo from "./repo/create.ts"

render(
	() => (
		<EditorRegistryContext.Provider value={new EditorRegistry({repo})}>
			<App />
		</EditorRegistryContext.Provider>
	),
	root
)

/*
sources: files, rss, calendars
       -> importer ->
	   -> handle ->
	   -> editor ->
sinks: files, api calls, out->in
*/
