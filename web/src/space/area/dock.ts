import {createSingletonRoot} from "@solid-primitives/rootless"
import {makePersisted} from "@solid-primitives/storage"
import {createStore, produce, type SetStoreFunction} from "solid-js/store"
import {createId} from "@paralleldrive/cuid2"
import getLayout, {stabilizeSidebars} from "../space-layout.ts"

export type PaneId = string & {"__item-pane-id": true}

export type ItemPane = {
	id: PaneId
	itemId: lb.ItemId
}

type DockGrid = (PaneId | PaneId[])[]

export type Dock = {
	active?: PaneId
	focused?: PaneId | "primary" | "secondary"
	panes: {
		[id: PaneId]: ItemPane
	}
	grid: DockGrid
}

let store = createSingletonRoot(() =>
	makePersisted(
		createStore({
			active: undefined,
			focused: undefined,
			panes: {},
			grid: [],
		} satisfies Dock as Dock),
		{name: "space-dock"},
	),
)

export default function getDock() {
	return store()
}

export type UpdateGrid = SetStoreFunction<Dock>

export function getActivePane(dock = store()[0]) {
	return dock.active && dock.panes[dock.active]
}

export function getActiveItemId(dock = store()[0]) {
	let pane = getActivePane(dock)
	return pane?.itemId
}

export function getItemPane(id: lb.ItemId, dock = store()[0]) {
	return Object.values(dock.panes).find(pane => pane.itemId == id)
}

export function rm(paneId: PaneId, dock = store()[0], updateDock = store()[1]) {
	updateDock(
		produce(dock => {
			let isActive = dock.active == paneId
			delete dock.panes[paneId]
			// todo recurse
			let indexInGrid = dock.grid.indexOf(paneId)
			dock.grid.splice(indexInGrid, 1)

			if (isActive) {
				dock.active = Object.values(dock.panes)[0]?.id
			}
		}),
	)
}

export function isTopLeft(id: PaneId) {
	let [dock] = getDock()
	let [layout] = getLayout()

	return dock.grid.indexOf(id) == 0 && !layout.primary.open
}

export function isTopRight(id: PaneId) {
	let [dock] = getDock()
	let [layout] = getLayout()
	return dock.grid.indexOf(id) == dock.grid.length - 1 && !layout.secondary.open
}

export function selectItem(itemId: lb.ItemId) {
	let [dock, update] = getDock()

	if (dock.active) {
		update(
			produce(dock => {
				let active = getActivePane(dock)
				active!.itemId = itemId
			}),
		)
		return
	}

	openToTheSide(itemId)
}

export function openToTheSide(itemId: lb.ItemId) {
	let [, update] = store()
	let paneId = createId() as PaneId
	// todo open next to the active panel
	update(
		produce(dock => {
			dock.panes[paneId] = {
				id: paneId,
				itemId,
			}
			dock.grid.push(paneId)
			dock.active = paneId
		}),
	)
}

// todo open beneath
// this finds the index of the current item in its parent,
// and then it changes that to an array of [current, new]
