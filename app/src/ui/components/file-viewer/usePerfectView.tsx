import {createMemo} from "solid-js"
import {useDocument} from "solid-automerge"
import type {FileEntryDoc, FileEntryURL} from ":/docs/file-entry-doc.ts"
import {useUserDocContext} from ":/domain/user/user.ts"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
} from ":/core/sync/url.ts"
import {useViewRegistry} from "@littlebook/plugin-api/registries/view-registry.ts"
import type {View} from "@littlebook/plugin-api/types/view.ts"

// todo usePerfectIcon that starts with entry, then editor,
// then defaults to a document icon
export function usePerfectView<Schema = unknown>(
	url: () => AutomergeURLOrDocumentURL,
) {
	const docinfo = createMemo(() => parseDocumentURL(url()))
	const user = useUserDocContext()
	const [entry] = useDocument<FileEntryDoc>(() => docinfo().url)
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
