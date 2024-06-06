import {updateText} from "@automerge/automerge-repo"
import type {ContentCreator, ContentView} from "./content-type-registry.ts"
import {Excalidraw, serializeAsJSON} from "@excalidraw/excalidraw"
import type {
	ExcalidrawInitialDataState,
	ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types.d.ts"
import type {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types.d.ts"
import {useEffect, useMemo, useState} from "preact/hooks"
type DeepWriteable<T> = {-readonly [P in keyof T]: DeepWriteable<T[P]>}
type WriteableExcalidrawElement = DeepWriteable<ExcalidrawElement>

export const excalidrawCreator: ContentCreator<WriteableExcalidrawElement[]> = {
	extensions: ["excalidraw"],
	create(repo) {
		const contentHandle = repo.create<lb.Content<WriteableExcalidrawElement[]>>(
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

export const ExcalidrawView: ContentView<WriteableExcalidrawElement[]> = ({
	content,
	changeContent,
}) => {
	console.log(content, content.body)

	if (!content) {
		return <div />
	}

	if (content.body.elements) {
		changeContent(content => {
			content.body = [...content.body.elements]
		})
	}
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
	// biome-ignore lint/correctness/useExhaustiveDependencies: i know what i'm doing
	const initialElements = useMemo(() => content.body, [])

	const [storedVersion, setStoredVersion] = useState(0)
	useEffect(() => {
		const v = content.body.reduce((v, e) => {
			if (!e.customData) {
				// @ts-expect-error
				e.customData = null
			}
			return v + e.version
		}, 0)
		setStoredVersion(v)
	}, [content.body])
	return (
		<Excalidraw
			excalidrawAPI={api => setExcalidrawAPI(api)}
			initialData={{elements: initialElements as ExcalidrawElement[]}}
			onChange={(elements, state, files) => {
				const newVersion = elements.reduce((v, e) => {
					return v + e.version
				}, 0)

				if (newVersion !== storedVersion) {
					console.log({version: newVersion, sceneVersion: storedVersion})
					setStoredVersion(newVersion)

					changeContent(content => {
						const json = JSON.parse(
							serializeAsJSON(elements, state, files, "database"),
						)
						console.log("i would do it!", json.elements)
						content.body = json.elements
					})
				}
			}}
		/>
	)
}
