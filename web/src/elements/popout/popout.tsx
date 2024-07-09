import {createShortcut} from "@solid-primitives/keyboard"
import {
	createSignal,
	type JSXElement,
	type JSX,
	createEffect,
	onMount,
	Show,
	untrack,
} from "solid-js"
import {Portal} from "solid-js/web"
import mousePosition from "../../lib/mouse.ts"
import "./popout.scss"
import clsx from "clsx"
import createPreventScroll from "solid-prevent-scroll"
import type {NullableBounds} from "@solid-primitives/bounds"

type PopoutProps = {
	when(): boolean
	close(): void
	children: JSXElement
	style?: JSX.CSSProperties
	class?: string
	mouse?: boolean
	box?: NullableBounds
}

export default function Popout(props: PopoutProps) {
	const [popover, setPopover] = createSignal<HTMLDivElement>()

	createPreventScroll({
		enabled: props.when,
	})

	onMount(() => {
		if (props.when()) {
			popover()?.showPopover()
		}
	})

	createEffect(() => {
		if (props.when()) {
			popover()?.showPopover()
		} else {
			popover()?.hidePopover()
		}
	})

	createShortcut(["Escape"], props.close)

	const mouseStyle: () => JSX.CSSProperties | undefined = () => {
		if (!props.mouse) return

		const {x, y} = untrack(mousePosition)
		return {
			left: x - 1 + "px",
			top: y - 16 + "px",
		}
	}

	const boxStyle: () => JSX.CSSProperties | undefined = () => {
		if (!props.box) return
		return {
			left: props.box.left + "px",
			top: props.box.bottom + "px",
			translate: "-50%",
		}
	}

	return (
		<Show when={props.when()}>
			<Portal>
				<div
					ref={setPopover}
					popover
					class={clsx("popout", props.class)}
					onclick={event => event.stopImmediatePropagation()}
					oncontextmenu={event => event.stopImmediatePropagation()}
					ontoggle={event => {
						if (event.newState == "closed") {
							props.close()
						}
					}}
					style={{
						...untrack(mouseStyle),
						...boxStyle(),
						...props.style,
					}}>
					{props.children}
				</div>
			</Portal>
		</Show>
	)
}

declare module "solid-js" {
	namespace JSX {
		interface HTMLAttributes<T> {
			ontoggle?(event: ToggleEvent): void
		}
	}
}
