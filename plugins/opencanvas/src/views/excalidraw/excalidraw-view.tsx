/** @jsxRuntime automatic */
/** @jsxImportSource react */

import * as OCIF from "../../types/v0.4.ts"
import type {
	FileEditor,
	FileEditorAPI,
	ViewID,
} from "@littlebook/plugin-api/types/view.ts"
import {oCIFCore04Schema} from "../../shapes/v0.4.ts"
import {OCIFCore04} from "../../types/v0.4.ts"
import {createRoot} from "react-dom/client"
import {Excalidraw} from "@excalidraw/excalidraw"
import {Suspense, useEffect, useState} from "react"
import {ExcalidrawImperativeAPI} from "@excalidraw/excalidraw/dist/types/excalidraw/types"
import {DefaultErrorFallback, ErrorBoundary} from "@tldraw/tldraw"
import {openCanvasToExcalidrawElements} from "./from-opencanvas.ts"
import {patch} from "../../utils/patch.ts"

export default {
	id: "@opencanvas/excalidraw" as ViewID,
	displayName: "OpenCanvas Excalidraw",
	category: "editor",
	styles: [import("./index.css?inline"), ":host > div {height: 100%}"],
	render(api) {
		const div = document.createElement("div")
		const root = createRoot(div)
		api.onCleanup(() => root.unmount())
		root.render(<ExcalidrawView api={api} />)
		return div
	},
	schema: oCIFCore04Schema,
} satisfies FileEditor<OCIFCore04>

export function ExcalidrawView(props: {api: FileEditorAPI<OCIFCore04>}) {
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
	useEffect(() => {
		if (!excalidrawAPI) {
			return
		}

		return excalidrawAPI.onChange(function onchange(elements) {
			me = true
			for (const element of elements) {
				if (element.type == "rectangle") {
					props.api.handle.change((doc: OCIF.OCIFCore04) => {
						const node: OCIF.Node & {
							data: [OCIF.OcifNodeRect & {type: "@ocif/node/rect"}]
						} = {
							id: element.id,
							rotation: element.angle,
							position: [element.x, element.y],
							size: [element.width, element.height],
							scale: [1, 1],
							data: [
								{
									type: "@ocif/node/rect",
									strokeColor: element.strokeColor,
									fillColor:
										element.fillStyle == "solid"
											? element.backgroundColor
											: "transparent",
									strokeWidth: 2,
								},
							],
						}
						update(doc, node)
					})
				}
			}
			me = false
		})
	}, [excalidrawAPI])

	let me = false
	props.api.handle.on("change", payload => {
		if (me) return
		excalidrawAPI?.updateScene({
			elements: openCanvasToExcalidrawElements(
				payload.doc,
				excalidrawAPI.getSceneElementsIncludingDeleted()
			),
		})
	})

	return (
		<Suspense>
			<ErrorBoundary fallback={DefaultErrorFallback}>
				<Excalidraw
					excalidrawAPI={setExcalidrawAPI}
					initialData={{
						elements: openCanvasToExcalidrawElements(
							props.api.handle.doc()
						),
					}}
				/>
			</ErrorBoundary>
		</Suspense>
	)
}

function kill(doc: OCIFCore04, node: OCIF.Node) {
	if (!doc.nodes) doc.nodes = []
	const index = doc.nodes.findIndex(n => n.id == node.id)
	if (index > -1) {
		delete doc.nodes[index]
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
