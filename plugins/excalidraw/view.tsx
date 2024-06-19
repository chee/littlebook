// things i'll need to make available in @littlebook/plugin
import "../../web/src/types.ts"
import type {AutomergeList} from "../../web/src/types.ts"
import type {
	// ContentView,
	ContentViewComponent,
} from "../../web/src/contents/views/content-view.ts"

// should i provide this from @littlebook/plugin? probably, right! like, plus
// any other types i create with crdx? yeah, right now this is the only reason
// we need to have wasm plugin, and as such why we need an esbuild script file
import {Counter} from "@automerge/automerge"

// internal to the plugin
import type {ExcalidrawImperativeAPI} from "@excalidraw/excalidraw/types/types.d.ts"
import type {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types.d.ts"
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	Suspense,
	lazy,
	type FunctionComponent,
} from "react"
// import styles from "./styles.css"

import {throttle} from "throttle-debounce"
import type {ExcalidrawJSON, MergeableExcalidrawElement} from "./shared.ts"

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

const Excalidraw = lazy(async () => {
	const module = await import("@excalidraw/excalidraw")
	return {default: module.default.Excalidraw}
})

// todo work with `contentchange` event
const ExcalidrawView: ContentViewComponent<
	ExcalidrawJSON,
	FunctionComponent<lb.ContentEditorViewProps<ExcalidrawJSON>>
> = ({content, changeContent, ...props}) => {
	if (!content) {
		return <div>waiting for content</div>
	}
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
		throttle(500, (elements, appState, files) => {
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
		<Suspense fallback={<div style={placeholderStyle} />}>
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

export default ExcalidrawView

/** @type {React.CSSProperties} */
const placeholderStyle = {
	backgroundColor: "var(--paper)",
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}
