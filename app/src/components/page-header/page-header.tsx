import {Show} from "solid-js"
import "./page-header.css"
import {Icon} from "@iconify-icon/solid"

export default function PageHeader(props: {
	leftSidebarCollapsed: boolean
	toggleLeftSidebar(): void
	// rightSidebarExpanded: boolean
	// expandRightSidebar(): void
}) {
	return (
		<header class="page-header">
			<button
				class="sidebar-toggle sidebar-toggle--left"
				onclick={() => props.toggleLeftSidebar()}>
				<Show
					when={props.leftSidebarCollapsed}
					fallback={<Icon icon="solar:sidebar-minimalistic-outline" />}>
					<Icon icon="solar:sidebar-minimalistic-bold" />
				</Show>
			</button>
			<div class="page-header-logo">
				<span class="page-header-logo__icon">◉</span>
				pointplace
			</div>
		</header>
	)
}
