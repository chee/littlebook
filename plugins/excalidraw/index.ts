import {UniformType} from "../../web/src/plugins/plugin-api.ts"
import coder from "./coder.ts"
import {ExcalidrawEditorElement} from "./view.tsx"

export default function excalidraw(lb: lb.plugins.API) {
	const excalidraw = lb.UniformType.create(
		"com.excalidraw.json",
		"Excalidrawing",
		[UniformType.json],
		["excalidraw"],
		["application/x-excalidraw", "application/json"],
	)

	lb.registerCoder(excalidraw, coder)
	lb.registerEditorView(excalidraw, ExcalidrawEditorElement)
}
