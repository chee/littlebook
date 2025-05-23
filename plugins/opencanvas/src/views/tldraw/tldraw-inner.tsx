/** @jsxRuntime automatic */
/** @jsxImportSource react */
import type {OCIFCore04} from "../../types/v0.4.ts"
import type * as OCIF from "../../types/v0.4.ts"
import type {FileEditorAPI} from "@littlebook/plugin-api/types/view.ts"
import {useEditor, Box, TLRecord} from "@tldraw/tldraw"
import {useLayoutEffect} from "react"
import {openCanvasToTldrawSnapshot} from "./from-opencanvas.ts"
import type {TLGeoShapeProps} from "tldraw"
import {patch} from "../../utils/patch.ts"

export function TldrawInner(props: {api: FileEditorAPI<OCIFCore04>}) {
	const {api} = props
	const editor = useEditor()
	editor.store.loadStoreSnapshot({
		schema: editor.store.schema.serialize(),
		store: openCanvasToTldrawSnapshot(api.handle.doc()),
	})
	let me = false
	api.handle.on("change", payload => {
		if (me) return
		editor.store.loadStoreSnapshot({
			schema: editor.store.schema.serialize(),
			store: openCanvasToTldrawSnapshot(payload.doc),
		})
	})
	const clean = editor.store.listen(
		function (entry) {
			me = true
			for (const shape of [...Object.values(entry.changes.added)]) {
				const node = shapeToNode(shape)
				if (node) {
					api.handle.change((doc: OCIFCore04) => {
						update(doc, node)
					})
				}
			}
			for (const [from, to] of Object.values(entry.changes.updated)) {
				const node = shapeToNode(to)
				if (node) {
					api.handle.change((doc: OCIFCore04) => {
						update(doc, node)
					})
				}
			}
			me = false
		},
		{
			scope: "document",
			source: "user",
		}
	)
	api.onCleanup(clean)

	useLayoutEffect(() => {
		const container = editor.getContainer()
		if (!container) return
		const rect = container.getBoundingClientRect()
		const next = new Box(
			rect.left || rect.x,
			rect.top || rect.y,
			Math.max(rect.width, 1),
			Math.max(rect.height, 1)
		)
		editor.updateViewportScreenBounds(next)
		editor.getContainer().addEventListener("resize", () => {
			const container = editor.getContainer()
			if (!container) return
			const rect = container.getBoundingClientRect()
			const next = new Box(
				rect.left || rect.x,
				rect.top || rect.y,
				Math.max(rect.width, 1),
				Math.max(rect.height, 1)
			)
			editor.updateViewportScreenBounds(next)
		})
	})

	return null
}

const colormap = {
	black: "#000",
	grey: "#666",
	blue: "#0000ff",
	green: "#00ff66",
	"light-blue": "#33ccff",
	"light-green": "#66ffaa",
	"light-red": "#ff3333",
	"light-violet": "#ff99ff",
	orange: "#ff9900",
	red: "#ff070a",
	violet: "#9900ff",
	white: "#ffffff",
	yellow: "#ccaa00",
} as const

function shapeToNode(shape: TLRecord) {
	if (shape.typeName == "shape") {
		const node: OCIF.Node & {data: unknown[]} = {
			id: shape.id,
			position: [shape.x, shape.y],
			rotation: shape.rotation,
			data: [],
		}
		if (shape.type == "geo") {
			const props = shape.props as TLGeoShapeProps
			if (props.geo == "rectangle") {
				node.size = [props.w, props.h]
				node.scale = [props.scale, props.scale]
				const fill = props.fill != "none"
				const color = colormap[props.color]
				node.data.push({
					type: "@ocif/node/rect",
					fillColor: fill && color,
					strokeColor: color,
					strokeWidth: 2,
				} as OCIF.OcifNodeRect)
			}
		}
		return node
	}
}

function update(doc: OCIFCore04, node: OCIF.Node) {
	if (!doc.nodes) doc.nodes = []
	const index = doc.nodes.findIndex(n => n.id == node.id)
	if (index > -1) {
		patch(doc.nodes[index], node)
	} else {
		doc.nodes.push(node)
	}
}
