import {onCleanup} from "solid-js"

const keymap = {
	cmd: "command",
	super: "command",
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
}

enum mod {
	shift = 1 << 1,
	control = 1 << 2,
	option = 1 << 3,
	command = 1 << 4,
}

function modshift(event: KeyboardEvent) {
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
	keyup?: boolean
	/**
	 * trigger on keydown?
	 * @default true
	 */
	keydown?: boolean
	/**
	 * prevent browser default?
	 * @default true
	 */
	preventDefault?: boolean
}

// todo delegate to context?
export function createKeybinding(
	keybinding: string,
	action: () => void,
	options?: Options
) {
	const shouldTriggerOnKeyup = options?.keyup ?? false
	const shouldTriggerOnKeydown = options?.keydown ?? true
	const shouldPreventDefault = options?.preventDefault ?? true
	const binding = parse(keybinding)

	function onkeydown(event: KeyboardEvent) {
		if (shouldTriggerOnKeydown) {
			const bits = modshift(event)
			if (bits == binding.mask && event.key == binding.key) {
				if (shouldPreventDefault) {
					event.preventDefault()
				}
				action()
			}
		}
	}
	function onkeyup(event: KeyboardEvent) {
		if (shouldTriggerOnKeyup) {
			const bits = modshift(event)
			if (bits == binding.mask && event.key == binding.key) {
				if (shouldPreventDefault) {
					event.preventDefault()
				}
				action()
			}
		}
	}

	window.addEventListener("keydown", onkeydown)
	onCleanup(() => window.removeEventListener("keydown", onkeydown))
	window.addEventListener("keyup", onkeyup)
	onCleanup(() => window.removeEventListener("keyup", onkeyup))
}

function parse(keybinding: string) {
	const parts = [
		...new Set(
			keybinding.split("+").map(part => {
				part = part.trim().replace(/^(digit|arrow|key|numpad)/, "")
				return keymap[part as keyof typeof keymap] ?? part
			})
		),
	]
	let key = parts.pop()!.toLowerCase()
	const mask = parts.reduce(
		(bits, part) => bits | mod[part as keyof typeof mod],
		0
	)

	return {key, mask}
}
