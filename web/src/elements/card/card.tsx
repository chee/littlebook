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

export interface CardItemProps {
	title: string
	icon: string
	href: string
	unread?: number
	onclick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
}

export const CardItem: ParentComponent<CardItemProps> = props => {
	return (
		<button
			{...props}
			type="button"
			class="card-item"
			aria-current={props.current ? "page" : "false"}>
			<span>{props.icon}</span>
			<p>{props.children || props.title}</p>
			{props.unread && (
				// todo
				<span>{props.unread}</span>
			)}
		</button>
	)
}
