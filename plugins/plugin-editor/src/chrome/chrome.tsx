import "./chrome.css"
import type {FileEditorAPI} from "@littlebook/plugin-api/types/view.ts"
import type {LittlebookPluginShape} from "../shapes/shapes.ts"
import {makeDocumentProjection} from "solid-automerge"
import {createSignal, For, Show} from "solid-js"
import type {Prop} from "@automerge/vanillajs"
import createTypescriptEditor from "../editors/ts/ts-editor.tsx"
import createJSONEditor from "../editors/json/json-editor.tsx"
import createStyleEditor from "../editors/css/css-editor.tsx"
import {createBaseEditor} from "../editors/base/base-editor.tsx"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import bemby from "@chee/bemby"
import type {PluginEditorWorker} from "../worker/worker.ts"
import Resizable from "@corvu/resizable"
import type {LBPSrcFilePath} from "../util/path.ts"
import {makePersisted} from "@solid-primitives/storage"

function getTypescriptPath(path: Prop[]): LBPSrcFilePath {
	return ["src", ...path] as LBPSrcFilePath
}

export default function Chrome(
	props: FileEditorAPI<LittlebookPluginShape> & {
		path: Prop[]
		setPath(path: Prop[]): void
		worker: PluginEditorWorker
		tsWorker: WorkerShape
		compile(): void
	}
) {
	const parent = (<div />) as HTMLElement
	const doc = makeDocumentProjection(props.handle)

	const getEditorProps = () => ({
		...props,
		path: getTypescriptPath(props.path),
		parent,
	})

	const getCorrectEditor = () => {
		const last = props.path[props.path.length - 1]
		const editorProps = getEditorProps()
		if (typeof last == "number") {
			return createBaseEditor(editorProps)
		}
		if (last.match(/\.[tj]sx?$/)) {
			return createTypescriptEditor(editorProps)
		}
		// todo other json files
		if (last.match(/\.json$/)) {
			return createJSONEditor(editorProps)
		}
		if (last.match(/\.css$/)) {
			return createStyleEditor(editorProps)
		}
		return createBaseEditor(editorProps)
	}

	const [sizes, setSizes] = makePersisted(createSignal([0.2, 0.8]), {
		name: `plugin-editor:sizes:${props.handle.url}`,
	})

	return (
		<Resizable
			class="plugin-editor-chrome"
			sizes={sizes()}
			onSizesChange={setSizes}>
			<Resizable.Panel as="aside" class="plugin-editor-sidebar ui">
				<nav class="plugin-editor-sidebar__files">
					<For each={Object.entries(doc.src)}>
						{([key, value]) => {
							const isFile = typeof value == "string"
							// todo make the below not insane
							return (
								<>
									<div
										class={bemby("plugin-editor-sidebar__item", {
											file: isFile,
											folder: !isFile,
										})}>
										<span
											class="plugin-editor-sidebar__file-name"
											onClick={() => {
												if (isFile) {
													props.setPath([key])
												}
											}}
											onDblClick={() => {
												const name = prompt("name", key)?.trim()
												if (name) {
													props.handle.change(doc => {
														doc.src[name] = doc.src[key]
														delete doc.src[key]
													})
												}
											}}
											onContextMenu={() => {
												const yes = confirm("delete?")
												if (yes) {
													props.handle.change(doc => {
														delete doc.src[key]
													})
												}
											}}>
											{key}
										</span>
									</div>
									{/* todo: obviously */}
									<Show when={!isFile}>
										<div class="plugin-editor-sidebar__indent">
											<For each={Object.keys(value)}>
												{(subKey: string) => (
													<div class="plugin-editor-sidebar__file">
														<span
															class="plugin-editor-sidebar__file-name"
															onClick={() => {
																props.setPath([key, subKey])
															}}
															onDblClick={() => {
																const name = prompt(
																	"name",
																	subKey
																)?.trim()
																if (name) {
																	props.handle.change(doc => {
																		doc.src[key][name] =
																			doc.src[key][subKey]
																		delete doc.src[key][
																			subKey
																		]
																	})
																}
															}}
															onContextMenu={() => {
																const yes = confirm("delete?")
																if (yes) {
																	props.handle.change(doc => {
																		delete doc.src[key][
																			subKey
																		]
																	})
																}
															}}>
															{subKey}
														</span>
													</div>
												)}
											</For>
										</div>
									</Show>
								</>
							)
						}}
					</For>
				</nav>
				<footer class="plugin-editor-sidebar__footer">
					<button onClick={props.setMeta}>Set Meta</button>
					<button onClick={props.compile}>Compile</button>
				</footer>
			</Resizable.Panel>
			<Resizable.Handle class="plugin-editor__handle" />
			<Resizable.Panel as="article" class="plugin-editor__main ui">
				<header class="plugin-editor__header">
					{props.path.join("/")}
				</header>
				<section class="plugin-editor__content">
					{getCorrectEditor().dom}
				</section>
			</Resizable.Panel>
		</Resizable>
	)
}
