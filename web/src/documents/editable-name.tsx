import {Show, createEffect, createSignal, on} from "solid-js"
import createBoolean from "../lib/create-boolean.ts"
import {getActiveItemId} from "../ui/ui-state.ts"
import {useUI} from "../ui/use-ui-state.tsx"
import useClickOutside from "solid-click-outside"
import {createShortcut} from "@solid-primitives/keyboard"
import "./editable-name.scss"
import {Portal} from "solid-js/web"
import {createScrollPosition} from "@solid-primitives/scroll"

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
	const [buttonRef, setButtonRef] = createSignal<HTMLButtonElement>()
	createShortcut(["Escape"], cancel)

	let localName = props.name
	createEffect(() => {
		localName = props.name
	})

	function cancel() {
		localName = props.name
		setRenaming(false)
	}

	function save() {
		props.saveName(localName)
		setRenaming(false)
	}

	const scroll = createScrollPosition(
		document.querySelector(".primary.sidebar")!,
	)

	const buttonBox = () =>
		renaming() && scroll.y != null
			? buttonRef()?.getBoundingClientRect()
			: undefined

	// purple stairwell, purple lift, deck 5
	return (
		<>
			<button
				ref={setButtonRef}
				type="button"
				class="editable-name not-editing"
				onclick={() => {
					if (activeId() && activeId() == props.id) {
						setRenaming(true)
					}
				}}>
				{props.name}
			</button>
			<Show when={renaming()}>
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
				</Portal>
			</Show>
		</>
	)
}
