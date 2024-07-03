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
import type {
	AppState,
	BinaryFiles,
	ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types.d.ts"
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
import type {
	ExcalidrawJSON,
	MergeableExcalidrawElement,
	WriteableExcalidrawElement,
} from "./shared.ts"
import {createRoot} from "react-dom/client"

const sumVersion = (
	v: number,
	e: ExcalidrawElement | MergeableExcalidrawElement,
) => v + e.version.valueOf()

function merge(target: any, source: any) {
	for (const [key, value] of Object.entries(source)) {
		if (key == "version" || key == "versionNonce") {
			if (typeof value == "number" && target[key]?.valueOf() != value) {
				target[key] = new Counter(value)
			}
		} else if (["number", "string", "boolean"].includes(typeof value)) {
			if (target[key] != source[key]) {
				target[key] = source[key]
			}
		} else if (value == null) {
			if (target[key] !== null) {
				target[key] = null
			}
		} else if (Array.isArray(value)) {
			if (!target[key]) {
				target[key] = []
			}
			value.forEach((src, i) => {
				if (target[key][i]) {
					merge(target[key][i], src)
				} else {
					target[key][i] = src
				}
			})
		} else {
			if (target[key]) {
				merge(target[key], value)
			} else {
				target[key] = value
			}
		}
	}
}

function automergeToExcalidraw(element: MergeableExcalidrawElement) {
	return {
		...element,
		customData: element.customData || undefined,
		version: element.version.valueOf(),
		versionNonce: element.version.valueOf(),
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
		throttle(
			10,
			(
				elements: readonly ExcalidrawElement[],
				appState: AppState,
				files: BinaryFiles,
			) => {
				// todo snapshot!

				change(doc => {
					if (!doc.value?.elements) return
					const contentVersion = doc.value.elements.reduce(sumVersion, 0) || 0
					const excaliVersion = elements.reduce(sumVersion, 0) || 0
					if (excaliVersion > contentVersion) {
						// todo do i need to make it possible for a content view to
						// create and manage its own entire automerge documents???
						// i can't be keeping massive images as a string!

						//merge(doc.value.files, files)
						for (const element of elements) {
							const target = doc.value.elements.find(el => el.id == element.id)
							if (target) {
								merge(target, element)
							} else {
								const target = {}
								merge(target, element)
								doc.value.elements.push(target as WriteableExcalidrawElement)
							}
						}
						if (doc.value.elements.length > elements.length) {
							for (const [index, target] of doc.value.elements.entries()) {
								if (!elements.find(e => e.id == target.id)) {
									doc.value.elements.deleteAt(index)
								}
							}
						}
					}
				})
			},
		),
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
