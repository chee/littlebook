import {UniformType} from "../../web/src/plugins/plugin-api.ts"
import coder from "./coder.ts"
import {TldrawEditorElement} from "./view.tsx"
import {TLDRAW_FILE_EXTENSION} from "tldraw"

export default function tldraw(lb: lb.plugins.API) {
	const tldraw = lb.UniformType.create(
		"com.tldraw.file",
		"tldraw",
		[UniformType.json],
		[TLDRAW_FILE_EXTENSION.slice(1)],
		["application/vnd.tldraw+json", "application/json"],
	)

	lb.registerCoder(tldraw, coder)
	lb.registerEditorView(tldraw, TldrawEditorElement)
}
