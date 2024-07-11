import {createEffect, createSignal, on} from "solid-js"
import {createShortcut} from "@solid-primitives/keyboard"
import "./editable-name.scss"
import {createScrollPosition} from "@solid-primitives/scroll"
import Popout from "../elements/popout/popout.tsx"

interface EditableNameProps {
	name(): string | undefined
	renaming(): boolean
	save(name: string): void
	cancel(): void
}

// todo render the input in a portal, so it doesn't matter what it's inside of
export default function EditableName(props: EditableNameProps) {
	let [buttonRef, setButtonRef] = createSignal<HTMLButtonElement>()
	createShortcut(["Escape"], cancel)

	let localName = props.name() || ""
	createEffect(() => {
		localName = props.name() || ""
	})

	function cancel() {
		localName = props.name() || ""
		props.cancel()
	}

	function save() {
		props.save(localName)
	}

	let scroll = createScrollPosition(document.querySelector(".primary.sidebar")!)

	let buttonBox = () =>
		props.renaming() && scroll.y != null
			? buttonRef()?.getBoundingClientRect()
			: undefined

	// purple stairwell, purple lift, deck 5
	return (
		<>
			<span ref={setButtonRef} class="editable-name not-editing">
				{props.name()}
			</span>

			<Popout
				when={props.renaming}
				close={cancel}
				class="editable-name-editor"
				style={{
					left: buttonBox()?.left + "px",
					top: buttonBox()?.top + "px",
				}}>
				<form class="submit-inline">
					<input
						autofocus
						ref={input => {
							createEffect(
								on([props.renaming], () => {
									input.selectionStart = 0
									input.selectionEnd = input?.value.lastIndexOf(".")
									input.selectionDirection = "forward"
									input.focus()
								}),
							)
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
			</Popout>
		</>
	)
}
