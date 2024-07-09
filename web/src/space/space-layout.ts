import {createSingletonRoot} from "@solid-primitives/rootless"
import {makePersisted} from "@solid-primitives/storage"
import {createStore} from "solid-js/store"

type SpaceLayout = {
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
const store = createSingletonRoot(() =>
	makePersisted(
		createStore({
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
		} satisfies SpaceLayout as SpaceLayout),
		{name: "space-layout"},
	),
)
export default store

type UpdateSpaceLayout = ReturnType<typeof store>["1"]

export function updateSidebar(
	which: "primary" | "secondary",
	size: number,
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	const s = Math.floor(size)
	if (s) {
		update(which, "size", s)
		update(which, "open", true)
	} else {
		update(which, "open", false)
	}
	stabilizeSidebars(layout, update)
}

export function updateSidebarsFromSplitSizes(
	sizes: number[],
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	const [left, main, right] = sizes
	update("main", "size", main)
	updateSidebar("primary", left, layout, update)
	updateSidebar("secondary", right, layout, update)
}

export function stabilizeSidebars(
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	const left = layout.primary.open ? layout.primary.size : 0
	const right = layout.secondary.open ? layout.secondary.size : 0
	const total = left + layout.main.size + right
	if (total != 100) {
		update("main", "size", 100 - left - right)
	}
}

export function openSidebar(
	which: "primary" | "secondary",
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	update(which, "open", true)
	stabilizeSidebars(layout, update)
}

export function closeSidebar(
	which: "primary" | "secondary",
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	update(which, "open", false)
	stabilizeSidebars(layout, update)
}

export function toggleSidebar(
	which: "primary" | "secondary",
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	update(which, "open", val => !val)
	stabilizeSidebars(layout, update)
}

export function getSplitSizes(layout: SpaceLayout) {
	return [
		layout.primary.open ? layout.primary.size : 0,
		layout.main.size,
		layout.secondary.open ? layout.secondary.size : 0,
	]
}
