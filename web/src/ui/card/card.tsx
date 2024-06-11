import {Link, useRoute} from "wouter-preact"
import type {FunctionComponent, RenderableProps} from "preact"
import clsx from "clsx"
import "./card.css"

export interface CardAction {
	icon: string
	label: string
	action(...any: any[]): any
}

export const Card: FunctionComponent<{
	title?: string
	headerAction?: CardAction
	footerActions?: CardAction[]
	padding?: number
}> = ({title, footerActions, headerAction, children, padding}) => {
	return (
		<div class={"card"}>
			{title && (
				<header class="card-header">
					<span class="card-header-title">{title}</span>
					<div class="card-header-icon">
						{headerAction && (
							<button
								onClick={headerAction.action}
								type="button"
								label={headerAction.label}
								class="card-action">
								{headerAction.icon}
							</button>
						)}
					</div>
				</header>
			)}
			<div class={clsx("card-content", padding != null && `p-${padding}`)}>
				{children}
			</div>
			{footerActions && (
				<footer class="card-footer">
					{footerActions.map(desc => (
						<button key={desc.action} type="button" class="card-footer-item">
							{desc.label}
						</button>
					))}
				</footer>
			)}
		</div>
	)
}

export type CardLinkProps = RenderableProps<{
	title: string
	icon: string
	href: string
	unread?: number
	onClick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
}>

export function CardLink({
	title,
	icon,
	href,
	unread,
	onClick,
	current,
	children,
}: CardLinkProps) {
	const [exactCurrent] = useRoute(href)

	return (
		<span class="card-link">
			<Link asChild to={href} onClick={onClick}>
				{/* biome-ignore lint/a11y/useValidAnchor: it's in a Link asChild */}
				<a
					aria-current={current || exactCurrent ? "page" : "false"}
					class={clsx(
						"card-link-anchor",
						(current || exactCurrent) && "has-background-primary",
					)}>
					<span class="card-link-title">
						<span class="card-link-title__icon">{icon}</span>
						<span class="card-link-title__text">{children || title}</span>
					</span>
					{unread && <span class="card-link__unread">{unread}</span>}
				</a>
			</Link>
		</span>
	)
}
