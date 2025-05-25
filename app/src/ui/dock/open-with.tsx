import {Show, For, createMemo} from "solid-js"
import {ContextMenu} from "@kobalte/core"
import Icon from "../components/icons/icon.tsx"
import type {OpenDocumentOptions} from "./dock-api.ts"
import {useDocument} from "solid-automerge"
import {
	parseDocumentURL,
	renderDocumentURL,
	type AutomergeURL,
	type DocumentURL,
} from ":/core/sync/url.ts"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"
import {useViewRegistry} from "@littlebook/plugin-api/registries/view-registry.ts"

export default function OpenWithContextMenu(props: {
	url: AutomergeURL
	currentEditorID?: string
	openDocument: (url: DocumentURL, opts: OpenDocumentOptions) => void
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<FileEntryDoc>(() => docinfo().url)
	const [file] = useDocument(() => entry()?.url)
	const viewRegistry = useViewRegistry()
	const views = () => [...(viewRegistry.views(file()!) ?? [])]

	return (
		<Show when={views().length > 1}>
			<ContextMenu.Sub overlap gutter={-10}>
				<ContextMenu.SubTrigger class="popmenu__sub-trigger">
					open with
					<div class="popmenu__item-right-slot">
						<Icon name="alt-arrow-right-linear" />
					</div>
				</ContextMenu.SubTrigger>

				<ContextMenu.Portal>
					<ContextMenu.SubContent class="popmenu__content popmenu__sub-content">
						<For each={views()}>
							{choice => (
								<ContextMenu.Item
									onSelect={() => {
										const url = renderDocumentURL({
											url: entryHandle()!.url,
											editor: choice.id,
										})
										props.openDocument(url, {
											side: "right",
										})
									}}
									disabled={choice.id == props.currentEditorID}
									class="popmenu__item">
									<Show when={choice.id == props.currentEditorID}>
										<div class="popmenu__item-indicator">
											<Icon name="check-square-bold" />
										</div>
									</Show>
									{choice.displayName ?? choice.id}
								</ContextMenu.Item>
							)}
						</For>
					</ContextMenu.SubContent>
				</ContextMenu.Portal>
			</ContextMenu.Sub>
		</Show>
	)
}
