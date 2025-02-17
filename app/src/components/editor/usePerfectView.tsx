import {createMemo} from "solid-js"
import {useViewRegistry} from "../../registries/view-registry.ts"
import type {Editor} from "@pointplace/types/src/view.ts"
import {useHome} from "../../repo/home.ts"
import {useDocument} from "solid-automerge"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
	type Entry,
} from "@pointplace/types"

// todo usePerfectIcon that starts with entry, then editor, then contenttype,
// then defaults to a document icon
export function usePerfectView<Shape = unknown>(
	url: () => AutomergeURLOrDocumentURL
) {
	const docinfo = createMemo(() => parseDocumentURL(url()))
	const [home] = useHome()
	const [entry] = useDocument<Entry>(() => docinfo().url)
	const editorRegistry = useViewRegistry()
	const editors = () => entry() && editorRegistry.views(entry()!)
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
