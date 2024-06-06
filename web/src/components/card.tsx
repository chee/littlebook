import {Link, useRoute} from "wouter-preact"
import "./card.css"
import type {FunctionComponent} from "preact"

export const Card: FunctionComponent<{title?: string; action?: () => void}> = ({
	title,
	action,
	children,
}) => {
	return (
		<div class="card">
			{title && (
				<header class="card-title">
					<span class="card-title-text">{title}</span>
					{action && (
						<button
							onClick={action}
							type="button"
							label="create project"
							class="card-action">
							⊕
						</button>
					)}
				</header>
			)}
			<div class="card-inner">{children}</div>
		</div>
	)
}

export type CardLinkProps = {
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
	onClick,
	current,
}: CardLinkProps) {
	const [exactCurrent] = useRoute(href)

	return (
		<span class="card-link">
			<Link asChild to={href} onClick={onClick}>
				{/* biome-ignore lint/a11y/useValidAnchor: it's in a Link asChild */}
				<a
					aria-current={current || exactCurrent ? "page" : "false"}
					class="card-link-inner">
					<span class="card-link-title">
						<span class="card-link-title__icon">{icon}</span>
						<span class="card-link-title__text">{title}</span>
					</span>
					{unread && <span class="card-link__unread">{unread}</span>}
				</a>
			</Link>
		</span>
	)
}
