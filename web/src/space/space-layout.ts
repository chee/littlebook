import {createSingletonRoot} from "@solid-primitives/rootless"
import {makePersisted} from "@solid-primitives/storage"
import {createStore, produce} from "solid-js/store"

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
let store = createSingletonRoot(() =>
	makePersisted(
		createStore({
			primary: {
				size: 0.2,
				open: true,
			},
			main: {
				size: 0.6,
			},
			secondary: {
				size: 0.2,
				open: false,
			},
		} satisfies SpaceLayout as SpaceLayout),
		{name: "space-layout"},
	),
)
export default function getLayout() {
	return store()
}

type UpdateSpaceLayout = ReturnType<typeof store>["1"]

export function updateSidebarsFromSplitSizes(
	sizes: number[],
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	let [left, main, right] = sizes
	update(
		produce(layout => {
			layout.main.size = main
			if (left) {
				layout.primary.size = Math.abs(left)
				if (!layout.primary.open) {
					layout.primary.open = true
				}
			} else if (layout.primary.open) {
				layout.primary.open = false
			}
			if (right) {
				layout.secondary.size = Math.abs(right)
				if (!layout.secondary.open) {
					layout.secondary.open = true
				}
			} else if (layout.secondary.open) {
				layout.secondary.open = false
			}
		}),
	)
	stabilizeSidebars(layout, update)
}

export function stabilizeSidebars(
	layout: SpaceLayout,
	update: UpdateSpaceLayout,
) {
	let left = layout.primary.open ? layout.primary.size : 0
	let right = layout.secondary.open ? layout.secondary.size : 0
	let total = left + layout.main.size + right
	if (total != 1) {
		update("main", "size", 1 - left - right)
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
