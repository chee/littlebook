import {useEffect, useState} from "preact/hooks"

interface EditableNameProps<T extends lb.NamedDocument> {
	id: T["id"]
	selectedId?: T["id"]
	editingId?: T["id"]
	name: string
	saveName(name: string): void
	setEditingId(set?: T["id"]): void
}
export default function EditableName<T extends lb.NamedDocument>({
	id,
	selectedId,
	editingId,
	name,
	saveName,
	setEditingId,
}: EditableNameProps<T>) {
	// todo pull the ext off from the name
	const [localName, setLocalName] = useState(name)

	useEffect(() => {
		setLocalName(name)
	}, [editingId, name, selectedId])
	if (selectedId == editingId && editingId == id) {
		return (
			<form>
				<div class="field has-addons is-small">
					<div class="control">
						<input
							class="input pb-0 pt-0"
							value={localName}
							autofocus
							ref={input => input?.focus()}
							onInput={event => {
								if (!(event.target instanceof HTMLInputElement)) return
								setLocalName(event.target.value)
							}}
						/>
					</div>
					<div class="control">
						<button
							type="submit"
							class="button pb-1 pt-0 is-outlined"
							onClick={event => {
								event.preventDefault()
								console.log("saving name")
								saveName(localName)
								setEditingId(undefined)
							}}>
							ok
						</button>
					</div>
				</div>
			</form>
		)
	}

	return (
		<button
			style={{appearance: "none", background: "transparent", padding: 0}}
			type="button"
			onClick={() => {
				selectedId == id && setEditingId(id)
			}}>
			{name}
		</button>
	)
}
