import {createMemo} from "solid-js"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {parseDocumentURL} from "../../dock/dock.tsx"
import {useEditorRegistry} from "../../registries/editor-registry.ts"
import type {Editor} from "../../../../types/src/editor.ts"
import {useHome} from "../../repo/home.ts"
import {useDocument} from "solid-automerge"
import type {Entry} from "@pointplace/types"

// todo usePerfectIcon that starts with entry, then editor, then contenttype,
// then defaults to a document icon

export function usePerfectEditor<Shape = unknown>(url: () => DocumentURL) {
	const docinfo = createMemo(() => parseDocumentURL(url()))
	const [home] = useHome()
	const [entry] = useDocument<Entry>(() => docinfo().url)
	const editorRegistry = useEditorRegistry()
	const editors = () => entry() && editorRegistry.editors(entry()!)
	const editor = (): Editor<Shape> | undefined => {
		const url = docinfo().url
		const associations = home()?.associations
		const association = associations?.[url]
		const firstEditor = editors()?.next().value
		const chosenID = docinfo().editor
		const chosen = chosenID && editorRegistry.get(chosenID)
		const associated = association && editorRegistry.get(association)
		return (chosen || associated || firstEditor) as Editor<Shape>
	}
	return editor
}
