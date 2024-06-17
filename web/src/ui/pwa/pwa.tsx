import "./pwa.css"

import {useRegisterSW} from "virtual:pwa-register/solid"

export function Badge() {
	// check for updates every 10 minutes
	const period = 60 * 60 * 100

	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (period <= 0) return
			if (r?.active?.state === "activated") {
				registerPeriodicSync(period, swUrl, r)
			} else if (r?.installing) {
				r.installing.addEventListener("statechange", e => {
					const sw = e.target as ServiceWorker
					if (sw.state === "activated") registerPeriodicSync(period, swUrl, r)
				})
			}
		},
	})

	function close() {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<div class="pwa-badge" role="alert" aria-labelledby="toast-message">
			{(offlineReady() || needRefresh()) && (
				<div class="pwa-badge-toast">
					<div class="pwa-badge-message">
						{offlineReady() ? (
							<span id="toast-message">we can work offline</span>
						) : (
							<button
								type="button"
								id="toast-message"
								onClick={() => location.reload()}>
								refresh your browser to get the new version of littlebook
							</button>
						)}
					</div>
					<div class="pwa-badge-buttons">
						{needRefresh() && (
							<button
								type="button"
								class="pwa-badge-toast-button"
								onClick={() => updateServiceWorker(true)}>
								Reload
							</button>
						)}
						<button
							type="button"
							class="pwa-badge-toast-button"
							onClick={() => close()}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

/**
 * This function will register a periodic sync check every {@link period}, you can modify
 * the interval as needed.
 */
function registerPeriodicSync(
	period: number,
	swUrl: string,
	r: ServiceWorkerRegistration,
) {
	if (period <= 0) return

	setInterval(async () => {
		if ("onLine" in navigator && !navigator.onLine) return

		const resp = await fetch(swUrl, {
			cache: "no-store",
			headers: {
				cache: "no-store",
				"cache-control": "no-cache",
			},
		})

		if (resp?.status === 200) await r.update()
	}, period)
}
