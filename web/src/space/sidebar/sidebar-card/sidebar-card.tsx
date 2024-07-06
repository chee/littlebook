import {Show, type Component, type ParentComponent} from "solid-js"
import cl from "../../../lib/cl.ts"
import "./sidebar-card.scss"
import clsx from "clsx"
import {Dynamic} from "solid-js/web"

interface CardHeaderAction {
	icon: string
	label: string
	action(...any: any[]): any
}

export const SidebarCard: ParentComponent<{
	title?: string
	hidden?: boolean
	headerAction?: CardHeaderAction
	class?: string
}> = props => {
	return (
		<div
			class={cl("sidebar-card", props.class)}
			hidden={props.hidden ? "hidden" : false}>
			<Show when={props.title || props.headerAction}>
				<header class="sidebar-card-header">
					<span>{props.title}</span>
					<div>
						{props.headerAction && (
							<button
								onclick={props.headerAction.action}
								type="button"
								aria-label={props.headerAction.label}
								class="card-action">
								{props.headerAction.icon}
							</button>
						)}
					</div>
				</header>
			</Show>
			{props.children}
		</div>
	)
}

interface CardItemProps {
	as?: string | Component<any>
	onclick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
	class?: string
	[key: string]: any
}

export const SidebarCardItem: ParentComponent<CardItemProps> = props => {
	return (
		<Dynamic
			component={props.as || "button"}
			{...props}
			class={clsx("sidebar-card-item", props.class)}
			onclick={props.onclick}
			aria-current={
				props.current == null ? false : props.current ? "page" : "false"
			}>
			{props.children}
		</Dynamic>
	)
}
