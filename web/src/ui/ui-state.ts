import {makePersisted} from "@solid-primitives/storage"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {createId} from "@paralleldrive/cuid2"

type PaneId = string & {"__item-pane-id": true}

type ItemPane = {
	id: PaneId
	itemId: lb.ItemId
}

export type UI = {
	id: lb.SpaceId
	sidebars: {
		primary: boolean
		secondary: boolean
		sizes: number[]
	}
	panes: ItemPane[]
	activePaneId?: PaneId
}

export function createUI(id: lb.SpaceId): [get: UI, set: SetStoreFunction<UI>] {
	return makePersisted(
		createStore<UI>({
			id,
			sidebars: {
				primary: false,
				secondary: false,
				sizes: [],
			},
			panes: [],
			activePaneId: undefined,
		}),
		{
			name: "ui",
		},
	)
}

type UpdateUI = SetStoreFunction<UI>

export function toggleSidebar(which: "primary" | "secondary", set: UpdateUI) {
	return set("sidebars", which, val => !val)
}

export function getItemId(ui: UI, paneId: PaneId) {
	return ui.panes.find(pane => pane.id == paneId)?.itemId
}

export function getActiveItemId(ui: UI) {
	return ui.activePaneId && getItemId(ui, ui.activePaneId)
}

export function selectItem(itemId: lb.ItemId, ui: UI, set: UpdateUI) {
	const pane = ui.panes.find(pane => pane.itemId == itemId)
	let paneId = pane?.id
	if (!paneId) {
		paneId = createId() as PaneId
		set("panes", ui.panes.length, {
			id: paneId,
			itemId,
		})
	}
	set("activePaneId", paneId)
}
