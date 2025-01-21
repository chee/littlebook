/* @refresh reload */
import "./styles/preflight.css"
import "./styles/font-face.css"
import "./styles/global.css"
import "./styles/palette.css"

import {render} from "solid-js/web"
import App from "./pages/app.tsx"
import {attachDevtoolsOverlay} from "@solid-devtools/overlay"
import registerServiceWorker from "./register-service-worker.ts"

if (import.meta.env.DEV) {
	attachDevtoolsOverlay()
} else {
	registerServiceWorker()
}

const root = document.getElementById("root")!

render(() => <App />, root)

/*
sources: files, rss, calendars
       -> importer ->
	   -> handle ->
	   -> editor ->
sinks: files, api calls, out->in
*/
