import type {OCIFCore04, Node} from "../../types/v0.4.ts"
import type {} from "@excalidraw/excalidraw"

// export function excalidrawElement(editor: Editor): OCIFCore04 {
// 	const store = editor.store
// 	const nodes: Node[] = []
// 	for (const shape of store.allRecords()) {
// 		if (shape.typeName == "shape") {
// 			const geometry = editor.getShapeGeometry(shape)
// 			nodes.push({
// 				id: shape.id,
// 				type: shape.typeName,
// 				x: shape.x,
// 				y: shape.y,
// 				width: geometry.center.x * 2,
// 				height: geometry.center.y * 2,
// 				rotation: shape.rotation,
// 			})
// 		}
// 	}
// 	return {
// 		ocif: "",
// 		nodes,
// 	}
// }
