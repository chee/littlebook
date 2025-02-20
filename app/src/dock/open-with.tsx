import {Show, For, createMemo} from "solid-js"
import {ContextMenu} from "@kobalte/core"
import Icon from "../components/icons/icon.tsx"
import type {OpenDocumentOptions} from "./dock-api.ts"
import {useViewRegistry} from "../registries/view-registry.ts"
import {useDocument} from "solid-automerge"
import {
	parseDocumentURL,
	renderDocumentURL,
	type AutomergeURL,
	type DocumentURL,
	type Entry,
} from "@pointplace/types"

export default function OpenWithContextMenu(props: {
	url: AutomergeURL
	currentEditorID?: string
	openDocument: (url: DocumentURL, opts: OpenDocumentOptions) => void
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url)
	const [file] = useDocument(() => entry()?.url)
	const viewRegistry = useViewRegistry()
	const views = () => [...(viewRegistry.views(file()!) ?? [])]

	return (
		<Show when={views().length > 1}>
			<ContextMenu.Sub overlap gutter={-10}>
				<ContextMenu.SubTrigger class="pop-menu__sub-trigger">
					open with
					<div class="pop-menu__item-right-slot">
						<Icon name="alt-arrow-right-linear" />
					</div>
				</ContextMenu.SubTrigger>

				<ContextMenu.Portal>
					<ContextMenu.SubContent class="pop-menu__content pop-menu__sub-content">
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
									class="pop-menu__item">
									<Show when={choice.id == props.currentEditorID}>
										<div class="pop-menu__item-indicator">
											<Icon name="check-square-bold" />
										</div>
									</Show>
									{choice.displayName}
								</ContextMenu.Item>
							)}
						</For>
					</ContextMenu.SubContent>
				</ContextMenu.Portal>
			</ContextMenu.Sub>
		</Show>
	)
}
