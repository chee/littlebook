import {useEffect, useState} from "preact/hooks"
import {useSpaceState} from "../space/space-state.tsx"
import Button from "../elements/button/button.tsx"
import "./editable-name.scss"

interface EditableNameProps<T extends lb.NamedDocument> {
	id: T["id"]
	name: string
	saveName(name: string): void
	which: "files" | "projects" // | "folders" | "spaces" | "areas"
}
// todo pop up the renaming input in a pretty floating window with a shadow
export default function EditableName<T extends lb.NamedDocument>({
	id,
	name,
	saveName,
	which,
}: EditableNameProps<T>) {
	const ui = useSpaceState()
	const selectedId = ui[which].selected
	const editingId = ui[which].renaming
	// todo pull the ext off from the name
	const [localName, setLocalName] = useState(name)

	useEffect(() => {
		setLocalName(name)
	}, [editingId.value, name, selectedId.value])

	if (selectedId.value == editingId.value && editingId.value == id) {
		return (
			<form class="editable-name editing inline-input-button">
				<input
					class="input px-3 dark:bg-black ring-2 ring-primary-400 rounded-l-lg text-lg"
					value={localName}
					autofocus
					ref={input => input?.focus()}
					onInput={event => {
						if (!(event.target instanceof HTMLInputElement)) return
						setLocalName(event.target.value)
					}}
				/>
				<Button
					type="submit"
					class="button p-2 ml-0 bg-primary-400 rounded-r-lg ring-2 ring-primary-400"
					onClick={event => {
						event.preventDefault()
						saveName(localName)
						ui[which].renaming.value = null
					}}>
					ok
				</Button>
			</form>
		)
	}

	return (
		<button
			type="button"
			class="editable-name not-editing"
			onClick={() => {
				if (selectedId.value == id) {
					ui[which].renaming.value = id
				}
			}}>
			{name}
		</button>
	)
}
