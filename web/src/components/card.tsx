import {NavLink} from "react-router-dom"
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

export function CardLink({
	title,
	icon,
	href,
	unread,
}: {
	title: string
	icon: string
	href: string
	unread?: number
}) {
	return (
		<span class="card-link">
			<NavLink to={href}>
				<span class="card-link-title">
					<span class="card-link-title__icon">{icon}</span>
					<span class="card-link-title__text">{title}</span>
				</span>
				{unread && <span class="card-link__unread">{unread}</span>}
			</NavLink>
		</span>
	)
}
