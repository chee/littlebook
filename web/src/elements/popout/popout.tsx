import {createShortcut} from "@solid-primitives/keyboard"
import {
	createSignal,
	type JSXElement,
	type JSX,
	createEffect,
	onCleanup,
	onMount,
} from "solid-js"
import {Portal} from "solid-js/web"
import mousePosition from "../../lib/mouse.ts"
import "./popout.scss"
import clsx from "clsx"

type PopoutProps = {
	close(): void
	children: JSXElement
	style?: JSX.CSSProperties
	class?: string
	mouse?: boolean
	open?: boolean
}

export default function Popout(props: PopoutProps) {
	const [dialog, setDialog] = createSignal<HTMLDialogElement>()
	onMount(() => {
		dialog()?.showModal()
	})

	createEffect(() => {
		const listener = (event: MouseEvent) => {
			console.log(event)
			const element = dialog()
			console.log(event.target, element, event.target == element)
			if (
				element &&
				event.target instanceof HTMLElement &&
				(element == event.target || !element.contains(event.target))
			) {
				console.log(event.target, element)
				props.close()
				dialog()?.close()
			}
		}
		document.addEventListener("click", listener)
		document.addEventListener("contextmenu", listener)
		onCleanup(() => {
			document.removeEventListener("click", listener)
			document.removeEventListener("contextmenu", listener)
		})
	})
	createShortcut(["Escape"], props.close)
	const {x, y} = mousePosition()

	const mouseStyle: () => JSX.CSSProperties | undefined = () => {
		if (!props.mouse) return

		return {
			left: x + "px",
			top: y + "px",
		}
	}
	return (
		<Portal>
			<dialog
				ref={setDialog}
				class={clsx("popout", props.class)}
				style={{
					...mouseStyle(),
					...props.style,
				}}>
				{props.children}
			</dialog>
		</Portal>
	)
}

export function usePopout(
	dialog: () => HTMLDialogElement | undefined,
	close: () => void,
) {
	useClickOutside(dialog, close)
	createShortcut(["Escape"], close)
}
