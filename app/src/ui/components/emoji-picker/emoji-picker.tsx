import "emoji-picker-element"
import "./emoji-picker.css"
import {createSignal, JSX} from "solid-js"
import {Popover} from "@kobalte/core/popover"

import bemby, {type BembyModifier} from "@chee/bemby"
import {clsx} from "clsx"

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			"emoji-picker": {
				"emoji-version"?: string
				class?: "dark" | "light"
			}
		}
		interface CustomEvents {
			"emoji-click": {
				detail: {
					emoji: {
						annotation: string
						group: number
						order: number
						shortcodes: string[]
						tags: string[]
						unicode: string
						version: number
					}
					skinTone: 0
					unicode: string
				}
			}
		}
	}
}

export default function EmojiPicker(props: {
	icon: string
	onEmoji(emoji: string): void
	modifiers: BembyModifier | BembyModifier[]
}) {
	const [open, setOpen] = createSignal(false)
	return (
		<Popover open={open()} onOpenChange={setOpen}>
			<Popover.Trigger
				class={bemby("emoji-picker__trigger", props.modifiers)}>
				{props.icon}
			</Popover.Trigger>
			<Popover.Anchor />
			<Popover.Portal>
				<Popover.Content
					class={clsx("popmenu", bemby("emoji-picker", props.modifiers))}>
					<Popover.CloseButton />
					<emoji-picker
						class="dark"
						emoji-version="17.0"
						on:emoji-click={(event: JSX.CustomEvents["emoji-click"]) => {
							props.onEmoji(event.detail.unicode)
							setOpen(false)
						}}
					/>
				</Popover.Content>
			</Popover.Portal>
		</Popover>
	)
}
