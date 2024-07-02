import {Show} from "solid-js"
import {useRegisterSW} from "virtual:pwa-register/solid"
import {Portal} from "solid-js/web"
import "./please-reload.scss"

export default function Reload() {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(r) {
			// eslint-disable-next-line prefer-template
			console.log("sw registered: " + r)
		},
		onRegisterError(error) {
			console.log("sw registration error", error)
		},
	})

	function close() {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<Portal>
			<Show when={offlineReady() || needRefresh()}>
				<div class="sw-please-reload">
					<p>
						<Show
							fallback={<span>refresh for the latest littlebook</span>}
							when={offlineReady()}>
							<span>littlebook ready for offline :)</span>
						</Show>
					</p>
					<Show when={needRefresh()}>
						<button
							type="button"
							class="button"
							onclick={() => updateServiceWorker(true)}>
							Reload
						</button>
					</Show>
					<button
						type="button"
						class="has-primary-300-background button"
						onclick={() => close()}>
						close
					</button>
				</div>
			</Show>
		</Portal>
	)
}
