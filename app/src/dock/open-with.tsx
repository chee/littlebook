import {Show, For, createMemo, getOwner, runWithOwner} from "solid-js"
import {ContextMenu} from "@kobalte/core"
import Icon from "../components/icons/icon.tsx"
import type {DocumentURL} from "./dock-api.ts"
import {useEditorRegistry} from "../registries/editor/editor-registry.ts"
import {useDocument} from "solid-automerge"
import type {Entry} from "../documents/entry.ts"
import {parseDocumentURL, useDockAPI} from "./dock.tsx"

export default function OpenWithContextMenu(props: {
	url: DocumentURL
	currentEditorID?: string
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url)
	const editorRegistry = useEditorRegistry()
	const editors = () => [...(editorRegistry.editors(entry()!) ?? [])]
	const owner = getOwner()

	const dockAPI = useDockAPI()

	return (
		<Show when={editors().length}>
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
										runWithOwner(owner, () => {
											dockAPI.openDocument(
												url.toString() as DocumentURL
											)
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
