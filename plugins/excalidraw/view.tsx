// things i'll need to make available in @littlebook/plugin
import "../../web/src/types.ts"
import type {AutomergeList} from "../../web/src/types.ts"
import {
	EditorViewElement,
	// ContentView,
	type EditorViewComponent,
} from "../../web/src/contents/views/content-view.ts"

// should i provide this from @littlebook/plugin? probably, right! like, plus
// any other types i create with crdx? yeah, right now this is the only reason
// we need to have wasm plugin, and as such why we need an esbuild script file
import {Counter} from "@automerge/automerge"
import type {DocHandleChangePayload} from "@automerge/automerge-repo"

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
import {createRoot} from "react-dom/client"

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
	return {default: module.Excalidraw}
})

const ExcalidrawView: EditorViewComponent<
	ExcalidrawJSON,
	FunctionComponent<lb.ContentEditorViewProps<ExcalidrawJSON>>
> = ({value, change, ...props}) => {
	if (!value) {
		return <div>waiting for value</div>
	}
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()

	const initialElements = useMemo(
		() => value.elements.map(automergeToExcalidraw),
		[],
	)

	useEffect(() => {
		const elements = excalidrawAPI?.getSceneElements()
		const contentVersion = value.elements.reduce(sumVersion, 0) || 0
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
				elements: value.elements.map(automergeToExcalidraw),
			})
		}
	}, [value])

	const onchange = useCallback(
		throttle(500, (elements, appState, files) => {
			// todo snapshot!

			change(doc => {
				if (!doc.value?.elements) return
				const contentVersion = doc.value.elements.reduce(sumVersion, 0) || 0
				const excaliVersion = elements.reduce(sumVersion, 0) || 0
				if (excaliVersion > contentVersion) {
					// content.value.appState = appState
					// content.value.files = files
					doc.value.elements = elements.map(
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
					...value,
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
	position: "absolute" as const,
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}

export class ExcalidrawEditorElement extends EditorViewElement<ExcalidrawJSON> {
	root = createRoot(this)
	props = () => ({
		value: this.value,
		change: this.change,
		handle: this.handle,
		doc: this.doc,
	})
	connectedCallback() {
		this.root.render(<ExcalidrawView {...this.props()} />)
		this.handle.on("change", this.render)
	}

	render = (payload: DocHandleChangePayload<lb.Content<ExcalidrawJSON>>) => {
		this.root.render(
			<ExcalidrawView {...this.props()} value={payload.doc.value} />,
		)
	}

	disconnectedCallback() {
		this.handle?.removeListener("change", this.render)
		this.root.unmount()
		this.textContent = ""
	}
}
