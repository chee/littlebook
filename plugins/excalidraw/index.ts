import coder from "./coder.ts"
import {ExcalidrawEditorElement} from "./view.tsx"

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
			editor: ExcalidrawEditorElement,
		},
	})
}
