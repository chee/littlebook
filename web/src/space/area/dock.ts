import {createSingletonRoot} from "@solid-primitives/rootless"
import {makePersisted} from "@solid-primitives/storage"
import {createStore, produce, type SetStoreFunction} from "solid-js/store"
import {createId} from "@paralleldrive/cuid2"
import getLayout from "../space-layout.ts"

export type PaneId = string & {"__item-pane-id": true}

export type ItemPane = {
	id: PaneId
	itemId: lb.ItemId
}

type DockGrid = (PaneId | PaneId[])[]

export type Dock = {
	active?: PaneId
	panes: {
		[id: PaneId]: ItemPane
	}
	grid: DockGrid
}

const store = createSingletonRoot(() =>
	makePersisted(
		createStore({
			active: undefined,
			panes: {},
			grid: [],
		} satisfies Dock as Dock),
		{name: "space-dock"},
	),
)

export default store

export type UpdateGrid = SetStoreFunction<Dock>

export function getActivePane(dock = store()[0]) {
	return dock.active && dock.panes[dock.active]
}

export function getActiveItemId(dock = store()[0]) {
	const pane = getActivePane(dock)
	return pane?.itemId
}

export function getItemPane(id: lb.ItemId, dock = store()[0]) {
	return Object.values(dock.panes).find(pane => pane.itemId == id)
}

export function rm(paneId: PaneId, dock = store()[0], updateDock = store()[1]) {
	console.log("removing", paneId)
	updateDock(
		produce(dock => {
			const isActive = dock.active == paneId
			delete dock.panes[paneId]
			// todo recurse
			const indexInGrid = dock.grid.indexOf(paneId)
			dock.grid.splice(indexInGrid, 1)
			console.log("spliced", indexInGrid, dock.grid)
			if (isActive) {
				dock.active = Object.values(dock.panes)[0]?.id
			}
		}),
	)
}

export function isTopLeft(id: PaneId) {
	const [dock] = store()
	const [layout] = getLayout()

	return dock.grid.indexOf(id) == 0 && !layout.primary.open
}

export function isTopRight(id: PaneId) {
	const [dock] = store()
	const [layout] = getLayout()
	return dock.grid.indexOf(id) == dock.grid.length - 1 && !layout.secondary.open
}

export function selectItem(itemId: lb.ItemId) {
	const [dock, update] = store()
	if (getActiveItemId(dock) == itemId) {
		return
	}

	const existingPane = getItemPane(itemId)
	if (existingPane) {
		update("active", existingPane.id)
		return
	}

	if (dock.active) {
		update(
			produce(dock => {
				const active = getActivePane(dock)
				active!.itemId = itemId
			}),
		)
		return
	}
	const paneId = createId() as PaneId
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
