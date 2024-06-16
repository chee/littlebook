import {Link, useRoute} from "wouter-preact"
import type {FunctionComponent} from "preact"
import cl from "../../cl.ts"
import type {HTMLProps} from "preact/compat"

export interface CardAction {
	icon: string
	label: string
	action(...any: any[]): any
}

export const Card: FunctionComponent<{
	title?: string
	headerAction?: CardAction
	footerActions?: CardAction[]
	className?: string
	class?: string
}> = ({
	title,
	footerActions,
	headerAction,
	children,
	className,
	class: clas,
}) => {
	return (
		<div class={cl("card", className, clas)}>
			{title && (
				<header class="card-header">
					<span>{title}</span>
					<div>
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
			{children}
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

export interface CardLinkProps extends HTMLProps<HTMLDivElement> {
	title: string
	icon: string
	href: string
	unread?: number
	onClick?: (event: HTMLElementEventMap["click"]) => void
	current?: boolean
}

export function CardLink({
	title,
	icon,
	href,
	unread,
	current,
	children,
	...props
}: CardLinkProps) {
	const [exactCurrent] = useRoute(href)

	return (
		<div {...props}>
			<Link asChild to={href} onClick={props.onClick} {...props}>
				{/* biome-ignore lint/a11y/useValidAnchor: it's in a Link asChild */}
				<a
					class="card-item"
					aria-current={current || exactCurrent ? "page" : "false"}>
					<span class="card-link-title">
						<span class="">{icon}</span>
						<span class="">{children || title}</span>
					</span>
					{unread && (
						<span class="rounded-full ring-primary-200 text-primary-300 bg-primary-100 ring-1">
							{unread}
						</span>
					)}
				</a>
			</Link>
		</div>
	)
}
