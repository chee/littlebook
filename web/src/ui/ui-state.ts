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

export function toggleSidebar(
	which: "primary" | "secondary",
	ui: UI,
	set: UpdateUI,
) {
	set("sidebars", which, val => !val)
	if (which == "primary") {
		set("sidebars", "sizes", 0, ui.sidebars.primary ? 20 : 0)
	}
	if (which == "secondary") {
		set("sidebars", "sizes", 2, ui.sidebars.secondary ? 20 : 0)
	}
	const total = ui.sidebars.sizes.reduce((a, b) => a + b)
	if (total != 100) {
		const [left, , right] = ui.sidebars.sizes
		set("sidebars", "sizes", 1, 100 - left - right)
	}
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
