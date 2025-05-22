import {curl} from ":/core/sync/automerge.ts"
import type {AutomergeURL} from ":/core/sync/url.ts"

export type AreaURL = AutomergeURL & {type: "area"}

export interface AreaDoc {
	type: "area"
	name: string
	icon?: string
	files: AutomergeURL[]
}

export function createAreaDoc(area?: Partial<AreaDoc>): AreaDoc {
	return {
		name: "new",
		type: "area",
		icon: "folder",
		files: [],
		...area,
	}
}

export function createArea(area?: Partial<AreaDoc>): AreaURL {
	return curl(createAreaDoc(area))
}
