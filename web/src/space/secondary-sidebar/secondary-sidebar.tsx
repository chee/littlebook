import {SidebarCard} from "../sidebar/sidebar-card/sidebar-card.tsx"
import getDock, {getActiveItemId} from "../area/dock.ts"
import getLayout, {toggleSidebar} from "../space-layout.ts"

import SidebarToggle from "../sidebar/sidebar-toggle.tsx"
import InfoPanel from "../../files/info-panel/info-panel.tsx"
import {Show, Suspense} from "solid-js"
import "./secondary-sidebar.scss"

export default function SecondarySidebar() {
	const [layout, updateLayout] = getLayout()
	const [dock] = getDock()
	const activeItemId = () => getActiveItemId(dock)

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
				<SidebarCard>
					<InfoPanel fileId={activeItemId()!} />
				</SidebarCard>
			</Show>
		</Suspense>
	)
}
