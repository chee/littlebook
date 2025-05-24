import "./toast.css"
import {Toast, toaster} from "@kobalte/core/toast"
import type {JSX} from "solid-js"
import {Portal, Show} from "solid-js/web"
import type {BembyModifier, BembyModifiers} from "@chee/bemby"
import bemby from "@chee/bemby"

export function show(
	title: string,
	opts?: {
		body?: JSX.Element
		link?: JSX.Element
		modifiers?: BembyModifier | BembyModifiers
	},
) {
	const {body, modifiers} = opts ?? {}
	return toaster.show(props => (
		<Toast toastId={props.toastId} class={bemby("toast", modifiers)}>
			<div class="toast__content">
				<div>
					<Toast.Title class="toast__title">{title}</Toast.Title>
					<Show when={body}>
						<Toast.Description class="toast__body">
							{body}
						</Toast.Description>
					</Show>
				</div>
				<Toast.CloseButton class="toast__close">
					<span class="toast__close-icon" aria-hidden="true">
						&times;
					</span>
					<span class="screenreader">Close</span>
				</Toast.CloseButton>
			</div>
		</Toast>
	))
}

export const toast = {show}

export function ToastRegion() {
	return (
		<Portal>
			<Toast.Region class="toast-region">
				<Toast.List class="toast-list ui" />
			</Toast.Region>
		</Portal>
	)
}
