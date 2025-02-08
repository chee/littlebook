import {createMemo} from "solid-js"
import type Result from "true-myth/result"
import {err, ok} from "true-myth/result"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {parseDocumentURL} from "../../dock/dock.tsx"
import type {Entry} from "../../documents/entry.ts"
import {useEditorRegistry} from "../../registries/editor-registry.ts"
import type {Editor} from "../../../../schemas/src/editor.ts"
import {useHome} from "../../repo/home.ts"
import {useDocument} from "solid-automerge"

// todo usePerfectIcon that starts with entry, then editor, then contenttype,
// then defaults to a document icon

export function usePerfectEditor(url: () => DocumentURL) {
	const docinfo = createMemo(() => parseDocumentURL(url()))
	const [home] = useHome()
	const [entry] = useDocument<Entry>(() => docinfo().url)
	const registry = useEditorRegistry()
	const editors = () => entry() && registry.editors(entry()!)
	const editor = (): Result<Editor, Error> => {
		const url = docinfo().url
		const associations = home()?.associations
		const associated = associations?.[url]
		const firstEditor = editors()?.next().value
		if (docinfo().editor) {
			const editor = registry.get(docinfo().editor!)
			return editor
				? editor
				: err(new Error(`couldn't find editor ${docinfo().editor}`))
		}
		if (associated) {
			const editor = registry.get(associated)
			return editor
		} else if (firstEditor) {
			return ok(firstEditor)
		} else {
			return err(new Error("no editor found"))
		}
	}
	return editor
}
