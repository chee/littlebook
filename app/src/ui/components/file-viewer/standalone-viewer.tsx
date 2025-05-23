import "./file-viewer.css"
import "./error.css"

import {
	createEffect,
	ErrorBoundary,
	For,
	onCleanup,
	onMount,
	Show,
	Suspense,
} from "solid-js"
import {Dynamic} from "solid-js/web"
import clsx from "clsx"
import {createStore} from "solid-js/store"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"

import type {StandaloneView} from "@littlebook/plugin-api/types/view.ts"
import {useViewRegistry} from "@littlebook/plugin-api/registries/view-registry.ts"
import {toast} from ":/ui/components/toast/toast.tsx"

export default function StandaloneViewer(props: {
	id: string
	isActive?: boolean
}) {
	const views = useViewRegistry()
	const view = () => views.get(props.id) as StandaloneView
	const [statusItems, updateStatusItems] = createStore([] as string[])

	return (
		<div class="file-viewer file-viewer--standalone">
			<Suspense>
				<Show
					when={view()}
					fallback={
						<p
							style={{
								padding: "1rem",
								background: "var(--danger-light)",
								height: "100%",
							}}>
							No such Standalone View: <br />
							<br />
							<strong>
								&nbsp;&nbsp;<code>{props.id}</code>
							</strong>
						</p>
					}>
					<ErrorBoundary
						fallback={(error, reset) => {
							createEffect(again => {
								if (view() && again) reset()
								return true
							})
							return (
								<div>
									<p>
										Error in view {props.id}.<code>{error}</code>
									</p>
									<pre>{error.stack}</pre>
								</div>
							)
						}}>
						<article class="file-viewer__content file-viewer__content--standalone">
							<Dynamic
								component={view().render}
								isActive={() => !!props.isActive}
								registerKeybinding={(key, action) =>
									onCleanup(useHotkeys(key, action))
								}
								toast={toast}
								updateStatusItems={updateStatusItems}
								onMount={onMount}
								onCleanup={onCleanup}
							/>
						</article>
						<footer
							class={clsx(
								"file-viewer-status-bar",
								props.isActive && "file-viewer-status-bar--active",
							)}>
							<span class="file-viewer-status-bar__editor-name">
								{view()?.displayName}
							</span>
							<For each={statusItems}>{item => <span>{item}</span>}</For>
						</footer>
					</ErrorBoundary>
				</Show>
			</Suspense>
		</div>
	)
}
