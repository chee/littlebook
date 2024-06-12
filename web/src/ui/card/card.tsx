import {Link, useRoute} from "wouter-preact"
import type {FunctionComponent, RenderableProps} from "preact"
import clsx from "clsx"
import cl from "../cl.ts"

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
		<div
			class={cl(
				"card group/card block rounded-lg bg-white shadow-sm shadow-theme-100 mb-4 dark:bg-black dark:text-white",
				className,
				clas,
			)}>
			{title && (
				<header class="header flex justify-between py-2 px-4">
					<span class="font-bold text-lg">{title}</span>
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
		<div class="group/card-link">
			<Link asChild to={href} onClick={onClick}>
				{/* biome-ignore lint/a11y/useValidAnchor: it's in a Link asChild */}
				<a
					aria-current={current || exactCurrent ? "page" : "false"}
					class={clsx(
						"flex px-4 py-1 gap-2  items-center group-first/card-link:rounded-t-lg group-last/card-link:rounded-b-lg ",
						"target:bg-yes-200",
						current || exactCurrent
							? "bg-yes-300 dark:bg-yes-800"
							: "hover:bg-yes-50 dark:hover:bg-yes-950",
					)}>
					<span class="flex px-2 py-1 gap-2 flex-1 truncate">
						<span class="card-link-title__icon">{icon}</span>
						<span class="">{children || title}</span>
					</span>
					{unread && (
						<span class="rounded-full ring-yes-200 text-yes-300 bg-yes-100 ring-1">
							{unread}
						</span>
					)}
				</a>
			</Link>
		</div>
	)
}
