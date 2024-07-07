import {createSingletonRoot} from "@solid-primitives/rootless"
import {createMemo} from "solid-js"

export type ParentsMap = Map<lb.ItemId, lb.AnyParentDocument["id"]>

const useParents = createSingletonRoot(() => {
	return createMemo(() => new Map() as ParentsMap)
})

export default useParents
