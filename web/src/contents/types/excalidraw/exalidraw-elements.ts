import type {ContentCreator, ContentView} from "./content-type-registry.ts"
import {Excalidraw} from "@excalidraw/excalidraw"
import type {ExcalidrawImperativeAPI} from "@excalidraw/excalidraw/types/types.d.ts"
import type {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types.d.ts"
import {useEffect, useState} from "preact/hooks"
import {Counter} from "@automerge/automerge"
type DeepWriteable<T> = {-readonly [P in keyof T]: DeepWriteable<T[P]>}
type WriteableExcalidrawElement = DeepWriteable<ExcalidrawElement>
type MergeableExcalidrawElement = WriteableExcalidrawElement

// todo the type here should be the the full json output so it can be toBytes'd
export const excalidrawCreator: ContentCreator<MergeableExcalidrawElement[]> = {
	extensions: ["excalidraw"],
	create(repo) {
		const contentHandle = repo.create<lb.Content<MergeableExcalidrawElement[]>>(
			{
				id: "" as lb.ContentId,
				body: [],
			},
		)
		contentHandle.change(content => {
			// @ts-expect-error it's read-only but only after now
			content.id = contentHandle.documentId as lb.ContentId
		})
		return contentHandle
	},
}

const sumVersion = (
	v: number,
	e: ExcalidrawElement | MergeableExcalidrawElement,
) => v + e.version.valueOf()

function excalidrawToAutomerge(element: ExcalidrawElement) {
	return {
		...structuredClone(element),
		customData: element.customData || null,
		version: new Counter(element.version),
	} as unknown as MergeableExcalidrawElement
}

function automergeToExcalidraw(element: MergeableExcalidrawElement) {
	return {
		...element,
		customData: element.customData || null,
		version: element.version.valueOf(),
	} as unknown as ExcalidrawElement
}

export const ExcalidrawView: ContentView<MergeableExcalidrawElement[]> = ({
	content,
	changeContent,
}) => {
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()

	useEffect(() => {
		const elements = excalidrawAPI?.getSceneElements()
		const contentVersion = content.body.reduce(sumVersion, 0) || 0
		const excaliVersion = elements?.reduce(sumVersion, 0) || 0
		if (contentVersion > excaliVersion) {
			const state = excalidrawAPI?.getAppState()
			if (
				state?.editingElement ||
				state?.draggingElement ||
				state?.isResizing ||
				state?.isRotating
			) {
				return
			}
			excalidrawAPI?.updateScene({
				elements: content.body.map(automergeToExcalidraw),
			})
		}
	})

	return (
		<Excalidraw
			excalidrawAPI={api => setExcalidrawAPI(api)}
			initialData={{
				elements: content.body.map(automergeToExcalidraw),
			}}
			handleKeyboardGlobally={false}
			onChange={elements => {
				changeContent(content => {
					const contentVersion = content.body.reduce(sumVersion, 0) || 0
					const excaliVersion = elements.reduce(sumVersion, 0) || 0
					if (excaliVersion > contentVersion) {
						content.body = elements.map(excalidrawToAutomerge)
					}
				})
			}}
		/>
	)
}
