import {compare, applyPatch} from "fast-json-patch"

export function patch<T extends object | Array<any>>(oldObj: T, newObj: T) {
	const patch = compare(oldObj, newObj)
	applyPatch(oldObj, patch, false, true)
}
