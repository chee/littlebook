// things i'll need to make available in @littlebook/plugin
import "../../web/src/types.ts"
import type {AutomergeList} from "../../web/src/types.ts"
import {
	EditorViewElement,
	// ContentView,
	type EditorViewComponent,
} from "../../web/src/files/content-view.ts"

import {Counter} from "@automerge/automerge/slim/next"
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
		<>
			<style>
				{
					/*css*/ `
					.excalidraw-loading {
						text-align: center;
						color: #c7c7cc;
						font-size: 0.8rem;
						padding-top: 1em;
						background: white;
						height: 100%;
					}
					`
				}
			</style>

			<Suspense
				fallback={<div className="excalidraw-loading">loading scene</div>}>
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
		</>
	)
}

export default ExcalidrawView

export class ExcalidrawEditorElement extends EditorViewElement<ExcalidrawJSON> {
	root = createRoot(this)
	props = () => ({
		value: this.value,
		change: this.change,
		handle: this.handle,
		doc: this.doc,
		file: this.file,
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
	}
}
