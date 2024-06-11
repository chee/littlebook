import type {ContentView} from "../type-registries.ts"
import type {ExcalidrawImperativeAPI} from "@excalidraw/excalidraw/types/types.d.ts"
import type {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types.d.ts"
import {useCallback, useEffect, useMemo, useState} from "preact/hooks"
import {Counter} from "@automerge/automerge"
import * as coders from "../coders.ts"
import type {AutomergeList} from "../../../types.ts"
import {Suspense, lazy} from "preact/compat"
type DeepWriteable<T> = {-readonly [P in keyof T]: DeepWriteable<T[P]>}
type WriteableExcalidrawElement = DeepWriteable<ExcalidrawElement>
type MergeableExcalidrawElement = WriteableExcalidrawElement
import "./excalidraw.css"
import type {UniformTypeIdentifier} from "../../../global.js"
import {throttle} from "throttle-debounce"

const type = "com.excalidraw.json" as lb.UniformTypeIdentifier

export type ExcalidrawJSON = {
	type: "excalidraw"
	version: number
	source: string
	elements: AutomergeList<MergeableExcalidrawElement>
	appState: Record<string, any>
	files: Record<string, any>
}

function toAutomergeList<T>(array: T[]): AutomergeList<T> {
	return array as AutomergeList<T>
}

const base = {
	type: "excalidraw",
	version: 2,
	source: "https://littlebook.app",
	elements: toAutomergeList([]),
	appState: {},
	files: {},
} satisfies ExcalidrawJSON

const jsonCoder = coders.json<ExcalidrawJSON>()

const coder: coders.ContentCoder<ExcalidrawJSON> = {
	encode(string) {
		return jsonCoder.encode(string)
	},
	decode(bytes) {
		if (bytes.length == 0) {
			return base
		}
		return jsonCoder.decode(bytes)
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

// todo lazy load excalidraw here using suspense
export const ExcalidrawView: ContentView<ExcalidrawJSON> = ({
	content,
	changeContent,
}) => {
	const Excalidraw = useMemo(
		() =>
			lazy(() => import("@excalidraw/excalidraw").then(mod => mod.Excalidraw)),
		[],
	)
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()

	const initialElements = useMemo(
		() => content.value.elements.map(automergeToExcalidraw),
		[],
	)

	useEffect(() => {
		const elements = excalidrawAPI?.getSceneElements()
		const contentVersion = content.value.elements.reduce(sumVersion, 0) || 0
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
				elements: content.value.elements.map(automergeToExcalidraw),
			})
		}
	}, [content.value])

	const onchange = useCallback(
		throttle(50, (elements, appState, files) => {
			// todo snapshot!
			changeContent(content => {
				const contentVersion = content.value.elements.reduce(sumVersion, 0) || 0
				const excaliVersion = elements.reduce(sumVersion, 0) || 0
				if (excaliVersion > contentVersion) {
					// content.value.appState = appState
					// content.value.files = files
					content.value.elements = elements.map(
						excalidrawToAutomerge,
					) as AutomergeList<MergeableExcalidrawElement>
				}
			})
		}),
		[],
	)

	return (
		<Suspense fallback={<LoadingScene />}>
			<Excalidraw
				excalidrawAPI={api => setExcalidrawAPI(api)}
				initialData={{
					...content.value,
					elements: initialElements,
				}}
				handleKeyboardGlobally={false}
				onChange={onchange}
			/>
		</Suspense>
	)
}

export function activate(lb: lb.API) {
	lb.coders.register(type, coder)
	lb.views.content.register([type], ExcalidrawView)
	lb.contentTypes.register({
		name: type,
		conformsTo: [
			"public.json" as UniformTypeIdentifier,
			"public.text" as UniformTypeIdentifier,
		],
		fileNameExtension: ".excalidraw",
		mimeType: "application/json",
	})
	lb.contentTypes.associate(type, [".excalidraw"])
	lb.contentTypes.setDisplayName(type, "Excalidraw drawing")
}

export function deactivate(lb: lb.API) {
	lb.coders.remove(type, coder)
	lb.views.content.remove(ExcalidrawView)
	// todo disassociate
	// lb.contentTypes.associate(type, [".excalidraw"])
}

function LoadingScene() {
	return <div class="excalidraw-loading">loading scene</div>
}
