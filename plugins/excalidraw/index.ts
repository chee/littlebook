import ExcalidrawView from "./view.tsx"
import coder from "./coder.ts"
import r2wc from "react-to-webcomponent"
import react from "react"
import dom from "react-dom"

import type {ExcalidrawJSON} from "./shared.ts"

export default function excalidraw(lb: lb.plugins.API) {
	lb.registerContentType({
		type: {
			name: "com.excalidraw.json" as lb.UniformTypeIdentifier,
			// todo use this
			displayName: "Excalidraw drawing",
			conformsTo: [
				// todo provide these on the api
				"public.json" as lb.UniformTypeIdentifier,
				"public.text" as lb.UniformTypeIdentifier,
			],
			fileNameExtension: ".excalidraw",
			mimeType: "application/json",
		},
		coder,
		views: {
			editor: r2wc(
				ExcalidrawView,
				react,
				// @ts-expect-error
				dom,
				{
					props: {
						content: "func",
						changeContent: "func",
					},
				},
			) as lb.ContentEditorView<ExcalidrawJSON>,
		},
	})
}
