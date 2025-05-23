import Icon from "../../components/icons/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import {Button} from "@kobalte/core/button"
import {createEffect, Suspense} from "solid-js"
import {useDockAPI} from "../dock.tsx"
import {Tooltip} from "@kobalte/core/tooltip"
import {useViewRegistry} from "@littlebook/plugin-api/registries/view-registry.ts"
import type {
	StandaloneView,
	StandaloneViewID,
} from "@littlebook/plugin-api/types/view.ts"

// todo StandaloneViewID type
export default function StandaloneViewTab(props: {id: StandaloneViewID}) {
	const dockAPI = useDockAPI()
	const view = () =>
		useViewRegistry().get(props.id) as StandaloneView | undefined
	let tabElement!: HTMLDivElement

	createEffect(() => {
		if (!dockAPI) return
		if (dockAPI.activePanelID == props.id) tabElement.scrollIntoView()
	})

	// todo extract shared stuff with dock-tab

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={tabElement}>
						<div class="dock-tab__icon">
							<Tooltip openDelay={0} closeDelay={0}>
								<Tooltip.Trigger class="dock-tab__editor-icon">
									<Icon name="gallery-linear" inline />
								</Tooltip.Trigger>

								<Tooltip.Portal>
									<Tooltip.Content class="dock-tab__editor-tooltip">
										<Tooltip.Arrow />
										{view()?.displayName}
									</Tooltip.Content>
								</Tooltip.Portal>
							</Tooltip>
						</div>

						<div class="dock-tab__name">{view()?.displayName}</div>

						<Button
							class="dock-tab__close"
							aria-label={`close panel ${view()?.displayName}`}
							onmousedown={(event: MouseEvent) => {
								event.stopImmediatePropagation()
								event.stopPropagation()
								event.preventDefault()
							}}
							onclick={() => dockAPI.closePanel(props.id)}></Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="popmenu__content">
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() => dockAPI.closePanel(props.id)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs)
									if (id != props.id) dockAPI.closePanel(id)
							}}>
							close other tabs
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}
