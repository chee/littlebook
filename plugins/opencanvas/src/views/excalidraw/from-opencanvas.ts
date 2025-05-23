import type {OCIFCore04} from "../../types/v0.4.ts"
import type * as OCIF from "../../types/v0.4.ts"
import {patch} from "../../utils/patch.ts"

export function openCanvasToExcalidrawElements(
	oc: OCIFCore04,
	current?: any[]
) {
	const elements = current ?? []

	if (oc.nodes) {
		for (const [index, node] of Object.entries(oc.nodes)) {
			const [x, y] = node.position ?? [0, 0]
			const [width, height] = node.size ?? [0, 0]
			const rotation = node.rotation ?? 0
			// todo naïve
			const [data] = node.data ?? []
			if (pojo(data) && "type" in data) {
				if (data.type == "@ocif/node/rect") {
					const rect: OCIF.OcifNodeRect = data

					const element = {
						id: node.id,
						type: "rectangle",
						index: `a${index}`,
						x,
						y,
						width,
						height,
						angle: rotation,
						strokeColor: rect.strokeColor,
						backgroundColor: rect.fillColor ?? "transparent",
						fillStyle: rect.fillColor ? "solid" : "none",
						strokeWidth: rect.strokeWidth,
						strokeStyle: "solid",
						roughness: 1,
						opacity: 100,
						groupIds: [],
						frameId: null,
						roundness: {type: 3},

						locked: false,
					}
					update(elements, element)
				}
			}
		}
	}
	return elements
}

function pojo(obj: unknown): obj is object {
	return obj != null && typeof obj == "object"
}

function update(els: any[], el: any) {
	const index = els.findIndex(n => n.id == el.id)
	if (index > -1) {
		patch(els[index], el)
	} else {
		els.push(el)
	}
}
