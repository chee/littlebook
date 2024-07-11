import {SidebarCard} from "../sidebar/sidebar-card/sidebar-card.tsx"
import getDock, {getActiveItemId} from "../area/dock.ts"
import getLayout, {toggleSidebar} from "../space-layout.ts"

import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import InfoPanel from "./info-panel/info-panel.tsx"
// import Notes from "./notes/notes.tsx"
import {createEffect, ErrorBoundary, on, Show, Suspense} from "solid-js"
import "./secondary-sidebar.scss"

export default function SecondarySidebar() {
	let [layout, updateLayout] = getLayout()
	let [dock] = getDock()
	let activeItemId = () => getActiveItemId(dock)

	return (
		<Suspense>
			<header class="primary-sidebar-header headstrip">
				<div class="headstrip-left" />
				<div class="headstrip-middle" />
				<div class="headstrip-right">
					<SidebarToggle
						open={() => layout.secondary.open}
						toggle={() => toggleSidebar("secondary", layout, updateLayout)}
						flip={false}
					/>
				</div>
			</header>
			<Show when={activeItemId()}>
				<ErrorBoundary
					fallback={(error, reset) => {
						createEffect(
							on([activeItemId], () => {
								reset()
							}),
						)
						return (
							<pre>
								<code>{JSON.stringify(error, null, "\t")}</code>
							</pre>
						)
					}}>
					<SidebarCard>
						<InfoPanel fileId={activeItemId()!} />
					</SidebarCard>
				</ErrorBoundary>
				<SidebarCard>
					<ErrorBoundary
						fallback={(error, reset) => {
							createEffect(
								on([activeItemId], () => {
									reset()
								}),
							)
							return (
								<pre>
									<code>{JSON.stringify(error, null, "\t")}</code>
								</pre>
							)
						}}>
						<div />
						{/* <Notes itemId={activeItemId} /> */}
					</ErrorBoundary>
				</SidebarCard>
			</Show>
		</Suspense>
	)
}
