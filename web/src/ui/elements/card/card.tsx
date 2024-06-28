import {A} from "@solidjs/router"
import {For, Show, type ParentComponent} from "solid-js"
import cl from "../../lib/cl.ts"
import "./card.scss"

export interface CardAction {
	icon: string
	label: string
	action(...any: any[]): any
}

export const Card: ParentComponent<{
	title?: string
	headerAction?: CardAction
	footerActions?: CardAction[]
	className?: string
	class?: string
}> = props => {
	return (
		<div class={cl("card", props.className, props.class)}>
			<Show when={props.title || props.headerAction}>
				<header class="card-header">
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
			<Show when={props.footerActions}>
				<footer class="card-footer">
					<For each={props.footerActions}>
						{footerAction => (
							<button
								type="button"
								class="card-footer-item"
								onclick={footerAction.action}>
								{footerAction.label}
							</button>
						)}
					</For>
				</footer>
			</Show>
		</div>
	)
}

export interface CardLinkProps {
	title: string
	icon: string
	href: string
	unread?: number
	onClick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
}

export const CardLink: ParentComponent<CardLinkProps> = props => {
	return (
		<A
			{...props}
			href={props.href}
			onClick={props.onClick}
			class="card-item"
			aria-current={props.current ? "page" : "false"}>
			<span>{props.icon}</span>
			<p class="card-link-title">{props.children || props.title}</p>
			{props.unread && (
				// todo
				<span class="rounded-full ring-primary-200 text-primary-300 bg-primary-100 ring-1">
					{props.unread}
				</span>
			)}
		</A>
	)
}
