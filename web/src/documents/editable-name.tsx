import {Match, Switch, createEffect, createSignal, on} from "solid-js"
import createBoolean from "../lib/create-boolean.ts"
import {getActiveItemId} from "../ui/ui-state.ts"
import {useUI} from "../ui/use-ui-state.tsx"
import useClickOutside from "solid-click-outside"
import {createShortcut} from "@solid-primitives/keyboard"
import "./editable-name.scss"

interface EditableNameProps<T extends lb.NamedDocument> {
	id: T["id"]
	name: string
	saveName(name: string): void
}

// todo render the input in a portal, so it doesn't matter what it's inside of
export default function EditableName<T extends lb.NamedDocument>(
	props: EditableNameProps<T>,
) {
	const [ui] = useUI()
	const activeId = () => getActiveItemId(ui)
	const [renaming, , setRenaming] = createBoolean(false)
	const [renamer, setRenamer] = createSignal<HTMLInputElement>()

	createShortcut(["Escape"], cancel)

	let localName = props.name

	function cancel() {
		localName = props.name
		setRenaming(false)
	}

	function save() {
		props.saveName(localName)
		setRenaming(false)
	}

	// purple stairwell, purple lift, deck 5
	return (
		<Switch>
			<Match when={renaming()}>
				<form class="editable-name editing submit-inline">
					<input
						autofocus
						ref={input => {
							createEffect(
								on([renaming], () => {
									input.selectionStart = 0
									input.selectionEnd = input?.value.lastIndexOf(".")
									input.selectionDirection = "forward"
									input.focus()
									useClickOutside(() => renamer(), cancel)
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
			</Match>
			<Match when={!renaming()}>
				<button
					type="button"
					class="editable-name not-editing"
					onclick={() => {
						if (activeId() && activeId() == props.id) {
							setRenaming(true)
						}
					}}>
					{props.name}
				</button>
			</Match>
		</Switch>
	)
}
