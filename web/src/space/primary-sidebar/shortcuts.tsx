import type {ParentComponent} from "solid-js"
import "./shortcuts.scss"
import {SidebarCardItem} from "../sidebar/sidebar-card/sidebar-card.tsx"
import clsx from "clsx"

interface ShortcutProps {
	title: string
	icon: string
	unread?: number
	onclick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
	class?: string
}

export const SidebarShortcut: ParentComponent<ShortcutProps> = props => {
	return (
		<SidebarCardItem
			{...props}
			class={clsx("sidebar-shortcut", props.class)}
			current={props.current}>
			<span>{props.icon}</span>
			<p>{props.title}</p>
			{props.unread && (
				<span class="sidebar-shortcut-unread">{props.unread}</span>
			)}
		</SidebarCardItem>
	)
}
