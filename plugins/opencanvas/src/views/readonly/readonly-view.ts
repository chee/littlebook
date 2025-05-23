import type {FileViewer, ViewID} from "@littlebook/plugin-api/types/view.ts"
import {oCIFCore04Schema} from "../../shapes/v0.4.ts"
import {OCIFCore04} from "../../types/v0.4.ts"
import {createRoot} from "react-dom/client"

export default {
	id: "@opencanvas/view" as ViewID,
	displayName: "OpenCanvas Viewer",
	category: "readonly",
	render(props) {
		const div = document.createElement("div")
		const root = createRoot(div)
		props.onCleanup(() => root.unmount())
		return div
	},
	schema: oCIFCore04Schema,
} satisfies FileViewer<OCIFCore04>
