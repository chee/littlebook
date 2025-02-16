import {createMemo} from "solid-js"
import {useViewRegistry} from "../../registries/view-registry.ts"
import type {View} from "@pointplace/types"
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
	const viewRegistry = useViewRegistry()
	const views = () => entry() && viewRegistry.views(entry()!)
	const view = (): View<Shape> | undefined => {
		const url = docinfo().url
		const associations = home()?.associations
		const association = associations?.[url]
		const firstEditor = views()?.next().value
		const chosenID = docinfo().editor
		const chosen = chosenID && viewRegistry.get(chosenID)
		const associated = association && viewRegistry.get(association)
		return (chosen || associated || firstEditor) as View<Shape>
	}
	return view
}
