declare let self: ServiceWorkerGlobalScope

import {precacheAndRoute} from "workbox-precaching"
import {clientsClaim} from "workbox-core"
import {registerRoute} from "workbox-routing"
import {StaleWhileRevalidate} from "workbox-strategies"
import {ExpirationPlugin} from "workbox-expiration"
import {
	Repo,
	WebSocketClientAdapter,
	IndexedDBStorageAdapter,
	type AutomergeUrl,
	isValidAutomergeUrl,
} from "@automerge/vanillajs/slim"
import {automergeWasmBase64} from "@automerge/automerge/automerge.wasm.base64"
import {next as Automerge} from "@automerge/automerge/slim"
Automerge.initializeBase64Wasm(automergeWasmBase64)

const repo = new Repo({
	network: [new WebSocketClientAdapter(`wss://galaxy.observer`)],
	storage: new IndexedDBStorageAdapter("littlebook"),
	enableRemoteHeadsGossiping: true,
})

declare global {
	interface ServiceWorkerGlobalScope {
		repo: Repo
	}
}

self.repo = repo

const mimes: [RegExp, string][] = [
	[/\.html$/, "text/html"],
	[/\.css$/, "text/css"],
	[/\.js$/, "application/javascript"],
	[/\.ts$/, "application/javascript"],
]

const langmime: Record<string, string> = {
	javascript: "application/javascript",
	typescript: "application/javascript",
	json: "application/json",
	css: "text/css",
	html: "text/html",
	xml: "application/xml",
	markdown: "text/markdown",
	txt: "text/plain",
	text: "text/plain",
	"": "text/plain",
}

self.skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener("fetch", event => {
	console.log("fetch", event.request.url)
	const url = new URL(event.request.url)
	const [, automergeUrl] =
		url.pathname.match(/^\/(automerge:[a-zA-Z0-9]+)/) ?? []
	if (automergeUrl && isValidAutomergeUrl(automergeUrl)) {
		try {
			const handle = repo.find<{text: string; language?: string}>(
				automergeUrl as AutomergeUrl,
			)
			event.respondWith(
				handle.then(handle => {
					if (typeof handle.doc().text != "string") {
						return new Response("not a string", {status: 400})
					}
					const doc = handle.doc()

					// todo configure path with query param
					return new Response(doc.text, {
						headers: {
							"content-type":
								langmime[doc.language] ??
								mimes.find(([re]) => re.test(url.pathname))?.[1] ??
								"text/plain",
							"cache-control": "no-store",
						},
						status: 200,
						statusText: "YAY!",
					})
				}),
			)
		} catch {}
	}
})

// registerRoute(({url}) => {
// 	console.log(
// 		"handle?",
// 		url.origin,
// 		self.location.origin,
// 		url.pathname,
// 		url.pathname.slice(0, 11),
// 		url.origin === self.location.origin &&
// 			url.pathname.startsWith("/automerge:"),
// 	)

// 	return (
// 		url.origin === self.location.origin &&
// 		url.pathname.startsWith("/automerge:")
// 	)
// })

registerRoute(
	({url}) => url.origin === "https://esm.sh",
	new StaleWhileRevalidate({
		cacheName: "cache.https://esm.sh",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 200,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	}),
)
