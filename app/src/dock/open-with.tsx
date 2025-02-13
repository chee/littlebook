import {Show, For, createMemo} from "solid-js"
import {ContextMenu} from "@kobalte/core"
import Icon from "../components/icons/icon.tsx"
import type {DocumentURL, OpenDocumentOptions} from "./dock-api.ts"
import {useEditorRegistry} from "../registries/editor-registry.ts"
import {useDocument} from "solid-automerge"
import {parseDocumentURL} from "./dock.tsx"
import type {Entry} from "@pointplace/types"

export default function OpenWithContextMenu(props: {
	url: DocumentURL
	currentEditorID?: string
	openDocument: (url: DocumentURL, opts: OpenDocumentOptions) => void
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url)
	const editorRegistry = useEditorRegistry()
	const editors = () => [...(editorRegistry.editors(entry()!) ?? [])]

	return (
		<Show when={editors().length > 1}>
			<ContextMenu.Sub overlap gutter={-10}>
				<ContextMenu.SubTrigger class="pop-menu__sub-trigger">
					open with
					<div class="pop-menu__item-right-slot">
						<Icon name="alt-arrow-right-linear" />
					</div>
				</ContextMenu.SubTrigger>

				<ContextMenu.Portal>
					<ContextMenu.SubContent class="pop-menu__content pop-menu__sub-content">
						<For each={editors()}>
							{choice => (
								<ContextMenu.Item
									onSelect={() => {
										const url = new URL(entryHandle()!.url)
										url.searchParams.set("editor", choice.id)
										props.openDocument(
											url.toString() as DocumentURL,
											{
												side: "right",
											}
										)
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
