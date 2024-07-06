import {makePersisted} from "@solid-primitives/storage"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {createId} from "@paralleldrive/cuid2"

type PaneId = string & {"__item-pane-id": true}

type ItemPane = {
	id: PaneId
	itemId: lb.ItemId
}

type UI0 = {
	sidebars: {
		primary: boolean
		secondary: boolean
		sizes: number[]
	}
	panes: ItemPane[]
	activePaneId?: PaneId
}

type UI1 = {
	version: number
	layout: {
		primary: {
			size: number
			open: boolean
		}
		main: {
			size: number
		}
		secondary: {
			size: number
			open: boolean
		}
	}
	panes: ItemPane[]
	activePaneId?: PaneId
}

export type UI = UI1

type AnyUI = UI0 | UI1

const migrations = [
	(previous: AnyUI): UI1 => {
		if ("version" in previous) {
			return previous as UI1
		}
		return {
			version: 1,
			layout: {
				primary: {
					size: previous.sidebars.sizes[0] || 20,
					open: previous.sidebars.primary || true,
				},
				main: {
					size: previous.sidebars.sizes[1] || 60,
				},
				secondary: {
					size: previous.sidebars.sizes[2] || 20,
					open: previous.sidebars.secondary || false,
				},
			},
			panes: previous.panes || [],
			activePaneId: previous.activePaneId,
		}
	},
]

export function createUI(): [get: UI, set: SetStoreFunction<UI>] {
	const [store, update] = makePersisted(
		createStore<AnyUI>({
			version: 1,
			layout: {
				primary: {
					size: 20,
					open: true,
				},
				main: {
					size: 60,
				},
				secondary: {
					size: 20,
					open: false,
				},
			},
			panes: [],
			activePaneId: undefined,
		}),
		{
			name: "ui",
		},
	)
	const latestVersion = 1
	const from = "version" in store ? store.version : 0
	const ms = migrations.slice(from, latestVersion)
	let ui = JSON.parse(JSON.stringify(store)) as AnyUI
	for (const m of ms) {
		ui = m(ui)
	}
	update(() => ui)
	return [store as UI, update as SetStoreFunction<UI>]
}

export type UpdateUI = SetStoreFunction<UI>

export function updateSidebar(
	which: "primary" | "secondary",
	size: number,
	ui: UI,
	set: UpdateUI,
) {
	const s = Math.floor(size)
	if (s) {
		set("layout", which, "size", s)
		set("layout", which, "open", true)
	} else {
		set("layout", which, "open", false)
	}
	stabilizeSidebars(ui, set)
}

export function updateSidebarsFromSplitSizes(
	sizes: number[],
	ui: UI,
	set: UpdateUI,
) {
	const [left, main, right] = sizes
	set("layout", "main", "size", main)
	updateSidebar("primary", left, ui, set)
	updateSidebar("secondary", right, ui, set)
}

export function stabilizeSidebars(ui: UI, update: UpdateUI) {
	const left = ui.layout.primary.open ? ui.layout.primary.size : 0
	const right = ui.layout.secondary.open ? ui.layout.secondary.size : 0
	const total = left + ui.layout.main.size + right
	if (total != 100) {
		update("layout", "main", "size", 100 - left - right)
	}
}

export function openSidebar(
	which: "primary" | "secondary",
	ui: UI,
	set: UpdateUI,
) {
	set("layout", which, "open", true)
	stabilizeSidebars(ui, set)
}

export function closeSidebar(
	which: "primary" | "secondary",
	ui: UI,
	set: UpdateUI,
) {
	set("layout", which, "open", false)
	stabilizeSidebars(ui, set)
}

export function toggleSidebar(
	which: "primary" | "secondary",
	ui: UI,
	set: UpdateUI,
) {
	set("layout", which, "open", val => !val)
	stabilizeSidebars(ui, set)
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

export function getSplitSizes(ui: UI) {
	return [
		ui.layout.primary.open ? ui.layout.primary.size : 0,
		ui.layout.main.size,
		ui.layout.secondary.open ? ui.layout.secondary.size : 0,
	]
}
