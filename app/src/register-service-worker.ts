export default async function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			})
			if (registration.installing) {
				console.info("service worker installing")
			} else if (registration.waiting) {
				console.info("service worker installed")
				location.reload()
			} else if (registration.active) {
				console.info("service worker active")
			}
		} catch (error) {
			console.error(`service worker registration failed with ${error}`)
		}
		let ref = false
		navigator.serviceWorker.addEventListener("controllerchange", () => {
			if (ref) return
			ref = true
			window.location.reload()
		})
	}
}
