import {runWithOwner} from "solid-js"
import {onCleanup} from "solid-js"
import {getOwner} from "solid-js"

const keymap = {
	cmd: "command",
	super: "command",
	meta: "command",
	ctrl: "control",
	alt: "option",

	dot: ".",
	period: ".",
	comma: ",",
	slash: "/",
	backslash: "\\",
	space: " ",
	backtick: "`",
	backquote: "`",
	hash: "#",
	plus: "+",
	minus: "-",
	equals: "=",
	equal: "=",
	return: "enter",
	"˚": "k",

	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright",
}

enum mod {
	shift = 1,
	control = 2,
	option = 3,
	command = 4,
}

export function modshift(event: {
	ctrlKey: boolean
	shiftKey: boolean
	altKey: boolean
	metaKey: boolean
}) {
	let bits = 0
	bits |= +event.shiftKey << mod.shift
	bits |= +event.ctrlKey << mod.control
	bits |= +event.altKey << mod.option
	bits |= +event.metaKey << mod.command

	return bits
}

interface Options {
	/**
	 * trigger on keyup?
	 * @default false
	 */
	keyup?(): boolean
	/**
	 * trigger on keydown?
	 * @default true
	 */
	keydown?(): boolean
	/**
	 * prevent browser default?
	 * @default true
	 */
	preventDefault?(): boolean
}

// todo delegate to a single event handler
/**
 * @param keybinding the hotkey to bind e.g. command+backslash
 * @param action
 * @param options
 * @returns disposer
 */
export function useHotkeys(
	keybinding: string,
	action: (event: KeyboardEvent) => void,
	options?: Options,
) {
	const shouldTriggerOnKeyup = options?.keyup?.() ?? false
	const shouldTriggerOnKeydown = options?.keydown ?? true
	const shouldPreventDefault = options?.preventDefault ?? (() => true)
	const binding = parse(keybinding)
	const owner = getOwner()

	function onkeydown(event: KeyboardEvent) {
		if (shouldTriggerOnKeydown) {
			const bits = modshift(event)

			if (bits == binding.mask && event.key.toLowerCase() == binding.key) {
				if (shouldPreventDefault()) {
					event.preventDefault()
				}
				if (
					event.target instanceof HTMLButtonElement ||
					event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement ||
					(event.target as HTMLElement).nodeName?.includes("-")
				) {
					runWithOwner(owner, () => action(event))
				}
			}
		}
	}
	function onkeyup(event: KeyboardEvent) {
		if (
			event.target instanceof HTMLButtonElement ||
			event.target instanceof HTMLInputElement ||
			event.target instanceof HTMLTextAreaElement ||
			(event.target as HTMLElement).nodeName?.includes("-")
		) {
			// don't trigger the space key if the button is focused
			return
		}

		if (shouldTriggerOnKeyup) {
			const bits = modshift(event)

			if (bits == binding.mask && event.key == binding.key) {
				if (shouldPreventDefault()) {
					event.preventDefault()
				}
				runWithOwner(owner, () => action(event))
			}
		}
	}

	self.addEventListener("keydown", onkeydown)
	onCleanup(() => self.removeEventListener("keydown", onkeydown))
	self.addEventListener("keyup", onkeyup)
	onCleanup(() => self.removeEventListener("keyup", onkeyup))
	return () => {
		self.removeEventListener("keydown", onkeydown)
		self.removeEventListener("keyup", onkeyup)
	}
}

function parse(keybinding: string) {
	const parts = keybinding.split("+").map(part => {
		part = part.trim().replace(/^(digit|arrow|key|numpad)/, "")
		return keymap[part as keyof typeof keymap] ?? part
	})

	const key = parts.pop()!.toLowerCase()

	const mask = parts.reduce(
		(bits, part) => bits | (1 << mod[part as keyof typeof mod]),
		0,
	)

	return {key, mask}
}
