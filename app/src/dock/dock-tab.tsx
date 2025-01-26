import Icon from "../components/icon/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import repo from "../repo/create.ts"
import type {AutomergeUrl} from "@automerge/automerge-repo"
import {createDocumentStore, useHandle} from "automerge-repo-solid-primitives"
import {Button} from "@kobalte/core/button"
import {createEffect, Suspense} from "solid-js"
import homeURL, {Home} from "../repo/home.ts"
import {useDockAPI} from "./dock.tsx"

export default function DockTab(props: {id: AutomergeUrl}) {
	const dockAPI = useDockAPI()
	const handle = useHandle<DocumentBase>(() => props.id, {repo})
	const doc = createDocumentStore(handle)
	let element: HTMLDivElement
	createEffect(() => {
		if (!dockAPI) return
		if (dockAPI.activePanelID == props.id) element.scrollIntoView()
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
							onclick={() => {
								dockAPI.closePanel(props.id)
							}}>
							<Icon icon="solar:close-square-linear" inline />
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="pop-menu__content">
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => dockAPI.closePanel(props.id)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs) {
									if (id != props.id) dockAPI.closePanel(id)
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
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								repo.find<Home>(homeURL()).change(home => {
									if (!home.files.includes(props.id)) {
										home.files.push(props.id)
									}
								})
							}}>
							add to sidebar
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}
