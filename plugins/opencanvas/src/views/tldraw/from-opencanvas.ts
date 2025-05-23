import type {} from "tldraw"
import type {OCIFCore04} from "../../types/v0.4.ts"
import type * as OCIF from "../../types/v0.4.ts"
import type {
	TLStoreSnapshot,
	TLShapeId,
	TLGeoShape,
	TLParentId,
} from "@tldraw/tldraw"

function hexToRGB(hex: string) {
	hex = hex.replace("#", "")
	const r = parseInt(hex.slice(0, 2), 16)
	const g = parseInt(hex.slice(2, 4), 16)
	const b = parseInt(hex.slice(4, 6), 16)
	return [r, g, b]
}

function closestColor<T>(targetColor: string, colorArray: T[]): T {
	let closestDistance = Infinity
	let closestColor = colorArray[0]
	const [r1, g1, b1] = hexToRGB(targetColor)
	colorArray.forEach(color => {
		const [r2, g2, b2] = hexToRGB(color)
		const distance = Math.sqrt(
			(r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
		)
		if (distance < closestDistance) {
			closestDistance = distance
			closestColor = color
		}
	})
	return closestColor
}

closestColor("#ff0000", [])
const colors = [
	"black",
	"blue",
	"green",
	"grey",
	"light-blue",
	"light-green",
	"light-red",
	"light-violet",
	"orange",
	"red",
	"violet",
	"white",
	"yellow",
]

// const colorishMap = {
// 	black: "#000",
// 	blue: "#00f",
// 	green: "#0f0",
// 	grey: "#808080",
// 	"light-blue": "#00ffff",
// 	"light-green": "#00ff00",
// 	"light-red": "#ff0000",
// 	"light-violet": "#ff00ff",
// 	orange: "#ffa500",
// 	red: "#ff0000",
// 	violet: "#ee82ee",
// 	white: "#fff",
// 	yellow: "#ffff00",
// }

const colorishMap = {
	"#000": "black",
	"#00f": "blue",
	"#0f0": "green",
	"#808080": "grey",
	"#00ffff": "light-blue",
	"#00ff00": "light-green",
	"#ff9999": "light-red",
	"#ff00ff": "light-violet",
	"#ffa500": "orange",
	"#ff0000": "red",
	"#ee82ee": "violet",
	"#fff": "white",
	"#ffff00": "yellow",
} as const

export function openCanvasToTldrawSnapshot(
	oc: OCIFCore04
): TLStoreSnapshot["store"] {
	const store: TLStoreSnapshot["store"] = {}
	if (oc.nodes) {
		for (const [index, node] of Object.entries(oc.nodes)) {
			const [x, y] = node.position ?? [0, 0]
			// todo naïve
			const [data] = node.data ?? []
			if (pojo(data) && "type" in data) {
				if (data.type == "@ocif/node/rect") {
					const rect: OCIF.OcifNodeRect = data
					const closestVal = closestColor(
						rect.strokeColor ?? "#000",
						Object.keys(colorishMap) as (keyof typeof colorishMap)[]
					)
					const color = colorishMap[closestVal]
					const fill = rect.fillColor ? "solid" : "none"
					const shape: TLGeoShape = {
						id: shapeidify(node.id),
						// todo
						parentId: "page:page" as TLParentId,
						index: ("a" + index) as TLGeoShape["index"],
						typeName: "shape",
						type: "geo",
						isLocked: false,
						meta: {},
						opacity: 1,
						x,
						y,
						rotation: node.rotation ?? 0,
						props: {
							geo: "rectangle",
							w: node.size?.[0] ?? 0,
							h: node.size?.[1] ?? 0,
							fill,
							scale: node.scale?.[0] ?? 1,
							color,
							labelColor: "black",
							align: "middle",
							verticalAlign: "middle",
							dash: "solid",
							font: "draw",
							growY: 0,
							size: "m",
							text: "",
							url: "",
						},
					}
					store[shape.id] = shape
				}
			}
		}
	}
	return store
}

function pojo(obj: unknown): obj is object {
	return obj != null && typeof obj == "object"
}

function shapeidify(str: string): TLShapeId {
	if (str.startsWith("shape:")) return str as TLShapeId
	else return `shape:${str}` as TLShapeId
}
