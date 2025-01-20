/// <reference types="@serviceworker-types/serviceworker" />
// update this when changing the service worker
const SERVICE_WORKER_VERSION = "lb.v2"

/*const addResourcesToCache = async resources => {
	const cache = await caches.open(SERVICE_WORKER_VERSION)
	await cache.addAll(resources)
} */

self.addEventListener("install", () => {
	self.skipWaiting()
})

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const putInCache = async (request, response) => {
	const cache = await caches.open(SERVICE_WORKER_VERSION)
	await cache.put(request, response)
}

/**
 *
 * @param {{request: Request, preloadResponsePromise?: Promise<void>}} opts
 * @returns
 */
const cacheFirst = async ({request}) => {
	const cache = await caches.open(SERVICE_WORKER_VERSION)
	const responseFromCache = await cache.match(request)
	if (responseFromCache) {
		return responseFromCache
	}

	try {
		const responseFromNetwork = await fetch(request)
		if (responseFromNetwork.status === 200) {
			putInCache(request, responseFromNetwork.clone())
		}
		return responseFromNetwork
	} catch (e) {
		const error = /** @type {Error} */ (e)
		return new Response(
			`im sorry :( something went wrong and i have no idea what or why.
             please email me problems@chee.party
             ${error?.message?.toString()}
             `,
			{
				status: 408,
				headers: {"Content-Type": "text/plain"},
			}
		)
	}
}

self.addEventListener("fetch", event => {
	event.respondWith(
		cacheFirst({
			request: event.request,
		})
	)
})
