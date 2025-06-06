import {
	createRenderEffect,
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
import {toast} from ":/ui/components/toast/toast.tsx"
import bemby from "@chee/bemby"
import {useViewRegistry} from "@littlebook/plugin-api"
import ViewErrorBoundary from ":/ui/components/view/error-boundary/error-boundary.tsx"
import {Shadows} from ":/ui/components/view/shadow.tsx"

export default function StandaloneViewer(props: {
	id: string
	isActive?: boolean
}) {
	const views = useViewRegistry()
	const view = () => views.get(props.id) as StandaloneView
	const [statusItems, updateStatusItems] = createStore([] as string[])
	let ref!: HTMLDivElement
	return (
		<div class={bemby("view", "standalone")}>
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
					<ViewErrorBoundary view={view()}>
						<Shadows>
							{shadowProps => {
								createRenderEffect(() => {
									if (view()!.styles) {
										shadowProps.setViewStyles(view()!.styles!)
									}
								})

								// todo toast should be part of the plugin api

								return (
									<Dynamic
										component={view()!.render}
										ref={ref}
										onMount={(fn: () => void) => onMount(fn)}
										onCleanup={fn => onCleanup(fn)}
										registerKeybinding={(
											key: string,
											action: (event: KeyboardEvent) => void,
										) => onCleanup(useHotkeys(key, action))}
										toast={toast}
										isActive={() => !!props.isActive}
										shadow={shadowProps.shadow()}
										updateStatusItems={updateStatusItems}
									/>
								) as HTMLElement
							}}
						</Shadows>

						<footer
							class={clsx(
								"view-status-bar",
								props.isActive && "view-status-bar--active",
							)}>
							<span class="view-status-bar__editor-name">
								{view()?.displayName ?? view()?.id}
							</span>
							<For each={statusItems}>{item => <span>{item}</span>}</For>
						</footer>
					</ViewErrorBoundary>
				</Show>
			</Suspense>
		</div>
	)
}
