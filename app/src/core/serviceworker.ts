declare let self: ServiceWorkerGlobalScope

import {precacheAndRoute} from "workbox-precaching"
import {clientsClaim} from "workbox-core"
import {registerRoute} from "workbox-routing"
import {StaleWhileRevalidate} from "workbox-strategies"
import {ExpirationPlugin} from "workbox-expiration"

self.skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

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
