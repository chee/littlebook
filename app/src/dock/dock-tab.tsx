import Icon from "../components/icon/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import repo from "../repo/create.ts"
import {DockviewApi, DockviewPanelApi} from "dockview-core"
import type {AutomergeUrl} from "@automerge/automerge-repo"
import {createDocumentStore, useHandle} from "automerge-repo-solid-primitives"
import type {DocumentBase} from "../repo/home.ts"
import {Button} from "@kobalte/core/button"
import {createEffect, onCleanup, Suspense} from "solid-js"

export default function DockTab(props: {
	dockviewAPI: DockviewApi
	panelAPI: DockviewPanelApi
	id: AutomergeUrl
}) {
	const handle = useHandle<DocumentBase>(() => props.id, {repo})
	const doc = createDocumentStore(handle)
	let element
	createEffect(() => {
		if (!props.dockviewAPI) return
		const disposer = props.dockviewAPI?.onDidActivePanelChange(
			activePanel => {
				if (activePanel.id == props.id) {
					element.scrollIntoView()
				}
			}
		)
		onCleanup(() => disposer.dispose())
	})

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={element}>
						<div class="dock-tab__icon">
							{
								<Icon
									icon={doc()?.icon ?? "solar:document-text-bold"}
									inline
								/>
							}
						</div>
						<div class="dock-tab__name">{doc()?.name}</div>
						<Button
							class="dock-tab__close"
							aria-label={`close panel ${doc()?.name}`}
							onmousedown={event => {
								event.stopImmediatePropagation()
								event.stopPropagation()
								event.preventDefault()
							}}
							onclick={event => {
								props.dockviewAPI.getPanel(props.id).api.close()
							}}>
							<Icon icon="solar:close-square-linear" inline />
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="pop-menu__content">
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() =>
								props.dockviewAPI.getPanel(props.id)?.api.close()
							}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								for (const panel of props.dockviewAPI.panels) {
									if (panel.id != props.id) panel.api.close()
								}
							}}>
							close other tabs
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => navigator.clipboard.writeText(props.id)}>
							copy url
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}
