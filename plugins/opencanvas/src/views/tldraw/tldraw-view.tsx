/** @jsxRuntime automatic */
/** @jsxImportSource react */
import type {
	FileEditor,
	FileEditorRenderFunction,
	ViewID,
} from "@littlebook/plugin-api/types/view.ts"
import {oCIFCore04Schema} from "../../shapes/v0.4.ts"
import {OCIFCore04} from "../../types/v0.4.ts"
import {createRoot} from "react-dom/client"
import {Tldraw} from "@tldraw/tldraw"
import {TldrawInner} from "./tldraw-inner.tsx"
import "tldraw/tldraw.css"

const render = function render(api) {
	console.log("rendering tldraw", api)
	const div = document.createElement("div")
	const root = createRoot(div)

	root.render(
		<Tldraw inferDarkMode options={{maxPages: 1}} autoFocus={true}>
			<TldrawInner api={api} />
		</Tldraw>
	)
	api.onCleanup(() => root.unmount())
	return div
} satisfies FileEditorRenderFunction<OCIFCore04>

export const TldrawView = {
	id: "@opencanvas/tldraw" as ViewID,
	displayName: "OpenCanvas TLDraw",
	category: "editor",
	render,
	schema: oCIFCore04Schema,
} satisfies FileEditor<OCIFCore04>
