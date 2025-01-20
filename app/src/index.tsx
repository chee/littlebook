/* @refresh reload */
import "./styles/preflight.css"
import "./styles/font-face.css"
import "./styles/global.css"
import "./styles/palette.css"

import {render} from "solid-js/web"
import App from "./pages/app.tsx"
import {attachDevtoolsOverlay} from "@solid-devtools/overlay"

if (import.meta.env.DEV) {
	attachDevtoolsOverlay()
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

async function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			})
			if (registration.installing) {
				console.info("Service worker installing")
			} else if (registration.waiting) {
				console.info("Service worker installed")
				location.reload()
			} else if (registration.active) {
				console.info("Service worker active")
			}
		} catch (error) {
			console.error(`Registration failed with ${error}`)
		}
		let ref = false
		navigator.serviceWorker.addEventListener("controllerchange", () => {
			if (ref) return
			ref = true
			window.location.reload()
		})
	}
}

if (import.meta.env.PROD) {
	registerServiceWorker()
}
