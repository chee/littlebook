import {For, type JSXElement} from "solid-js"
import "./menu.scss"

export type MenuOptions = {[option: string]: JSXElement | string}

export default function Menu<T extends MenuOptions, K extends keyof T>(props: {
	options: T
	select(option: K): void
	ref?(el: HTMLDivElement): void
}) {
	return (
		<div class="menu" ref={props.ref}>
			<ul class="menu-items">
				<For each={Object.entries(props.options)}>
					{([option, label]) => (
						<li>
							<button
								class="menu-item"
								type="button"
								onclick={() => props.select(option as K)}>
								{label}
							</button>
						</li>
					)}
				</For>
			</ul>
		</div>
	)
}
