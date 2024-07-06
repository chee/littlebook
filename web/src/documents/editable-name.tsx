import {Show, createEffect, createSignal, on} from "solid-js"
import useClickOutside from "solid-click-outside"
import {createShortcut} from "@solid-primitives/keyboard"
import "./editable-name.scss"
import {Portal} from "solid-js/web"
import {createScrollPosition} from "@solid-primitives/scroll"

interface EditableNameProps {
	name(): string | undefined
	renaming(): boolean
	save(name: string): void
	cancel(): void
}

// todo render the input in a portal, so it doesn't matter what it's inside of
export default function EditableName(props: EditableNameProps) {
	const [renamer, setRenamer] = createSignal<HTMLInputElement>()
	const [buttonRef, setButtonRef] = createSignal<HTMLButtonElement>()
	createShortcut(["Escape"], cancel)

	let localName = props.name() || ""
	createEffect(() => {
		localName = props.name() || ""
	})

	function cancel() {
		localName = props.name() || ""
		cancel()
	}

	function save() {
		props.save(localName)
	}

	const scroll = createScrollPosition(
		document.querySelector(".primary.sidebar")!,
	)

	const buttonBox = () =>
		props.renaming() && scroll.y != null
			? buttonRef()?.getBoundingClientRect()
			: undefined

	// purple stairwell, purple lift, deck 5
	return (
		<>
			<button
				ref={setButtonRef}
				type="button"
				class="editable-name not-editing">
				{props.name()}
			</button>
			<Show when={props.renaming()}>
				<Portal>
					<form
						class="editable-name-editor submit-inline"
						style={{
							left: buttonBox()?.left + "px",
							top: buttonBox()?.top + "px",
						}}>
						<input
							autofocus
							ref={input => {
								createEffect(
									on([props.renaming], () => {
										input.selectionStart = 0
										input.selectionEnd = input?.value.lastIndexOf(".")
										input.selectionDirection = "forward"
										input.focus()
										useClickOutside(renamer, cancel)
									}),
								)
								setRenamer(input)
							}}
							value={localName}
							onInput={event => {
								if (!(event.target instanceof HTMLInputElement)) return
								localName = event.target.value
							}}
						/>
						<button
							type="submit"
							onClick={event => {
								event.preventDefault()
								save()
							}}>
							ok
						</button>
					</form>
				</Portal>
			</Show>
		</>
	)
}
