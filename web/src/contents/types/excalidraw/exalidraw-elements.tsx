import type {ContentView} from "../content-type-registry.ts"
import * as coders from "../coders.ts"
import {ExcalidrawView, type ExcalidrawJSON} from "./excalidraw.tsx"

const type = "com.excalidraw.elements" as lb.UniformTypeIdentifier
type Model = ExcalidrawJSON["elements"]

const jsonCoder = coders.json<ExcalidrawJSON>()

const coder: coders.ContentCoder<Model> = {
	decode(bytes) {
		const json = jsonCoder.decode(bytes)
		return json instanceof Error ? json : json.elements
	},
	encode(elements) {
		return jsonCoder.encode({
			type: "excalidraw",
			version: 2,
			source: "https://littlebook.app",
			elements,
			appState: {},
			files: {},
		})
	},
}

export const ExcalidrawElementsView: ContentView<Model> = ({
	content,
	changeContent,
	file,
	changeFile,
}) => {
	const obj = {
		elements: content.value,
		version: 2,
		appState: {},
		files: {},
		source: "https://littlebook.app",
		type: "excalidraw",
	} as ExcalidrawJSON
	return (
		<ExcalidrawView
			file={file}
			changeFile={changeFile}
			content={{
				...content,
				value: obj,
			}}
			changeContent={fn => {
				changeContent(content => {
					fn({...content, value: {...obj, elements: content.value}})
				})
			}}
		/>
	)
}

export function activate(lb: lb.API) {
	lb.coders.register(type, coder)
	lb.views.content.register([type], ExcalidrawElementsView)
	lb.contentTypes.associate(type, [".excalidraw"])
}

export function deactivate(lb: lb.API) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(ExcalidrawElementsView)
	// todo disassociate
	// lb.contentTypes.associate(type, [".excalidraw"])
}
