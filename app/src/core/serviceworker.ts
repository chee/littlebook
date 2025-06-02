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
	[/\.ts$/, "application/typescript"],
	[/\.tsx$/, "application/typescript"],
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
	const url = new URL(event.request.url)
	const [, automergeUrl, path] =
		url.pathname.match(/^\/(automerge:[^/]+)[./]?(.*)/) ?? []
	if (automergeUrl && isValidAutomergeUrl(automergeUrl)) {
		try {
			const handle = repo.find<
				{src: Record<string, string>} | {text: string}
			>(automergeUrl as AutomergeUrl)
			event.respondWith(
				handle.then(handle => {
					let text: string | undefined
					const doc = handle.doc()
					if ("src" in doc) {
						const p = path.split("/") ?? ["entry.tsx"]
						p.unshift("src")
						text = getProperty(doc.src, p)
					} else if ("text" in doc) {
						text = doc.text
					}
					if (typeof text != "string") {
						return new Response(`couldnt locate`, {status: 404})
					}

					return new Response(text, {
						headers: {
							"content-type":
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

registerRoute(
	({url}) => url.origin === "esm.sh",
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

registerRoute(
	({url}) => url.origin === "data.jsdelivr.com",
	new StaleWhileRevalidate({
		cacheName: "cache.https://jsdelivr.sh",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 200,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	}),
)

function getProperty(src: Record<string, string>, p: string[]) {
	let current: any = src
	for (const part of p) {
		if (current && typeof current === "object" && part in current) {
			current = current[part]
		} else {
			return undefined // Or throw an error if the property is required
		}
	}
	return current
}
