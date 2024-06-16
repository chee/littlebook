import type {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types.js"
import type {AutomergeList} from "../../web/src/types.ts"

export type DeepWriteable<T> = {-readonly [P in keyof T]: DeepWriteable<T[P]>}
export type WriteableExcalidrawElement = DeepWriteable<ExcalidrawElement>
export type MergeableExcalidrawElement = WriteableExcalidrawElement

export type ExcalidrawJSON = {
	type: "excalidraw"
	version: number
	source: string
	elements: AutomergeList<MergeableExcalidrawElement>
	appState: Record<string, any>
	files: Record<string, any>
}
