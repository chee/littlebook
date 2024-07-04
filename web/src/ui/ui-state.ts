import {makePersisted} from "@solid-primitives/storage"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {createId} from "@paralleldrive/cuid2"

type PaneId = string & {"__item-pane-id": true}

type ItemPane = {
	id: PaneId
	itemId: lb.ItemId
}

export type UI = {
	sidebars: {
		primary: boolean
		secondary: boolean
		sizes: number[]
	}
	panes: ItemPane[]
	activePaneId?: PaneId
}

export function createUI(): [get: UI, set: SetStoreFunction<UI>] {
	return makePersisted(
		createStore<UI>({
			sidebars: {
				primary: false,
				secondary: false,
				sizes: [20, 60, 20],
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
