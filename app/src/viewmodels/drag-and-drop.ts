import type {
	BaseEventPayload,
	ElementDragType,
	DropTargetRecord,
	Input,
} from "@atlaskit/pragmatic-drag-and-drop/types"
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import type {AutomergeURL} from ":/core/sync/url.ts"
import {getOwner, onCleanup, runWithOwner} from "solid-js"

export type DragAndDropItem = {
	type: string
	url: AutomergeURL
}
export type DraggableContract = {
	items: DragAndDropItem[]
}

export type DropTargetContract = {
	accepts(source?: DraggableContract): boolean
	drop(payload: DraggableContract, input: Input): void
}

export function getDraggedPayload(payload: {
	source: BaseEventPayload<ElementDragType>["source"]
}): DraggableContract | undefined {
	return payload.source.data as DraggableContract
}

export function getDropTarget(
	payload: BaseEventPayload<ElementDragType>,
): DropTargetRecord | undefined {
	return payload.location.current.dropTargets[0]
}

export function getDropTargetPayload(
	payload: BaseEventPayload<ElementDragType>,
): DropTargetContract | undefined {
	return getDropTarget(payload)?.data as DropTargetContract
}

export function getInput(payload: BaseEventPayload<ElementDragType>) {
	return payload.location.current.input
}

export function manageDrop(
	payload: BaseEventPayload<ElementDragType>,
	contract: DropTargetContract,
) {
	const dragged = getDraggedPayload(payload)
	const input = getInput(payload)
	if (!dragged) return
	contract.drop(dragged, input)
}

export function updateData(
	payload: BaseEventPayload<ElementDragType>,
	data: Record<string, unknown>,
) {
	Object.assign(payload.source.data, data)
}

export function updateDraggedItems(
	payload: BaseEventPayload<ElementDragType>,
	items: DragAndDropItem[],
) {
	Object.assign(payload.source.data, {items} as DraggableContract)
}

export function calculateAboveBelow(element: Element, clientY: number) {
	const rect = element.getBoundingClientRect()
	const offset = clientY - rect.top
	const abovebelow = offset < rect.height / 2 ? "above" : "below"
	return abovebelow
}

export function createDropTarget(
	element: HTMLElement,
	contract: DropTargetContract,
) {
	const owner = getOwner()
	return onCleanup(
		dropTargetForElements({
			canDrop(payload) {
				const dragged = getDraggedPayload(payload)
				return !!dragged && contract.accepts(dragged)
			},
			element,
			onDragEnter(payload) {
				if (contract?.accepts(getDraggedPayload(payload))) {
					;(payload.self.element as HTMLElement).dataset.droptarget =
						"true"
				}
			},
			onDragLeave(payload) {
				delete (payload.self.element as HTMLElement).dataset.droptarget
			},
			onDrop(payload) {
				delete (payload.self.element as HTMLElement).dataset.droptarget
				delete payload.source.element.dataset.droptarget
				if (!contract) return
				runWithOwner(owner, () => manageDrop(payload, contract))
			},
		}),
	)
}

// todo add the concept of a DropHandler that can be registered for a file type?
