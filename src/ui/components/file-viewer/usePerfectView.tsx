import {createMemo} from "solid-js"
import {useDocument} from "solid-automerge"
import {useViewRegistry} from "../../../registries/view-registry.ts"
import type {View} from ":/domain/view/view.ts"
import type {FileEntry, FileEntryURL} from ":/docs/file-entry-doc.ts"
import {useUserDocContext} from ":/domain/user/user.ts"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
} from ":/core/sync/url.ts"

// todo usePerfectIcon that starts with entry, then editor,
// then defaults to a document icon
export function usePerfectView<Schema = unknown>(
	url: () => AutomergeURLOrDocumentURL,
) {
	const docinfo = createMemo(() => parseDocumentURL(url()))
	const user = useUserDocContext()
	const [entry] = useDocument<FileEntry>(() => docinfo().url)
	const viewRegistry = useViewRegistry()
	const [file] = useDocument<Schema>(() => entry()?.url)
	const views = () => file() && viewRegistry.views(file()!)
	const view = (): View<Schema> | undefined => {
		const url = docinfo().url as FileEntryURL
		const associations = user()?.associations
		const association = associations?.[url]
		const firstEditor = views()?.next().value
		const chosenID = docinfo().editor
		const chosen = chosenID && viewRegistry.get(chosenID)
		const associated = association && viewRegistry.get(association)
		return (chosen || associated || firstEditor) as View<Schema>
	}
	return view
}
