import "./file-viewer.css"
import "./error.css"

import {
	createEffect,
	createMemo,
	ErrorBoundary,
	For,
	onCleanup,
	onMount,
	Show,
	Suspense,
	Switch,
	Match,
} from "solid-js"
import FallbackFileViewer from "./fallback.tsx"
import {Dynamic} from "solid-js/web"
import {useDocument} from "solid-automerge"
import {usePerfectView} from "./usePerfectView.tsx"
import clsx from "clsx"
import {useContentTypeRegistry} from "../../registries/content-type-registry.ts"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
	type Editor,
	type Entry,
	type ReadOnlyView,
} from "@pointplace/types"
import repo from "../../repo/create.ts"
import {updateText, type DocHandle} from "@automerge/automerge-repo"
import {createKeybinding} from "solid-hotkeys"
import {file} from "valibot"

const log = window.log.extend("file-viewer")

export default function FileViewer(props: {
	url: AutomergeURLOrDocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url, {repo})
	const view = usePerfectView(() => props.url)

	const [file, fileHandle] = useDocument(() => entry()?.url, {repo})

	const [statusItems, updateStatusItems] = createStore([] as string[])

	const contentTypeName = () => {
		const name = entry()?.contentType
		return name && useContentTypeRegistry().get(name)?.displayName
	}

	return (
		<Suspense>
			<Show
				when={entry() && file() && view() && fileHandle()}
				fallback={
					<FallbackFileViewer
						entry={entry()!}
						view={view()}
						fileHandle={fileHandle()}
					/>
				}>
				{/* todo extract */}
				<ErrorBoundary
					fallback={(error, reset) => {
						createEffect(again => {
							console.error(error)
							if (view() && again) {
								reset()
							}
							return true
						})
						if (!(error instanceof Error)) {
							return <div>{error.message ?? error}</div>
						}

						return (
							<article class="error error--file-viewer">
								<h1>
									<code>{error.toString()}</code>
								</h1>

								<div>
									<code>
										<pre>{error.stack}</pre>
									</code>
								</div>
							</article>
						)
					}}>
					<Switch>
						<Match when={view()?.category === "editor"}>
							<article class="file-viewer__content file-viewer__content--editor">
								<EditorViewWrapper
									editor={view()! as Editor<unknown>}
									fileHandle={fileHandle()!}
									entryHandle={entryHandle()!}
									updateStatusItems={updateStatusItems}
									isActive={!!props.isActive}
								/>
							</article>
						</Match>
						<Match when={view()?.category === "readonly"}>
							<article class="file-viewer__content file-viewer__content--readonly">
								<ReadOnlyViewWrapper
									view={view() as ReadOnlyView<unknown>}
									fileHandle={fileHandle()!}
									isActive={!!props.isActive}
									updateStatusItems={updateStatusItems}
								/>
							</article>
						</Match>
					</Switch>

					<footer
						class={clsx(
							"file-viewer-status-bar",
							props.isActive && "file-viewer-status-bar--active"
						)}>
						<span class="file-viewer-status-bar__editor-name">
							{view()?.displayName}
						</span>
						<span class="file-viewer-status-bar__content-type">
							{contentTypeName()}
						</span>

						<For each={statusItems}>{item => <span>{item}</span>}</For>
					</footer>
				</ErrorBoundary>
			</Show>
		</Suspense>
	)
}

function EditorViewWrapper<T>(props: {
	editor: Editor<T>
	fileHandle: DocHandle<T>
	entryHandle: DocHandle<Entry>
	updateStatusItems: SetStoreFunction<string[]>
	isActive: boolean
}) {
	createEffect(() => {
		console.log(props.editor.render)
	})
	return (
		<Dynamic
			component={props.editor.render}
			handle={props.fileHandle}
			updateName={(name: string) =>
				props.entryHandle.change(entry => updateText(entry, ["name"], name))
			}
			updateStatusItems={props.updateStatusItems}
			onMount={(fn: () => void) => {
				onMount(fn)
			}}
			onCleanup={(fn: () => void) => {
				onCleanup(fn)
			}}
			registerKeybinding={(key: string, action: () => void) => {
				// it's neat, but unclean, to pass the disposer directly to onCleanup
				onCleanup(createKeybinding(key, action))
			}}
			isActive={() => !!props.isActive}
		/>
	)
}

function ReadOnlyViewWrapper<T>(props: {
	view: ReadOnlyView<T>
	fileHandle: DocHandle<T>
	isActive: boolean
	updateStatusItems: SetStoreFunction<string[]>
}) {
	const subs = new Set<() => void>()
	function change() {
		for (const sub of subs) {
			sub()
		}
	}

	createEffect(() => {
		props.fileHandle.on("change", change)
		onCleanup(() => {
			subs.clear()
			props.fileHandle.off("change", change)
		})
	})

	return (
		<Dynamic
			component={props.view.render}
			doc={() => props.fileHandle.doc()}
			isActive={() => !!props.isActive}
			registerKeybinding={(key: string, action: () => void) => {
				// it's neat, but unclean, to pass the disposer directly to onCleanup
				onCleanup(createKeybinding(key, action))
			}}
			updateStatusItems={props.updateStatusItems}
			onChange={fn => {
				subs.add(fn)
			}}
			onMount={onMount}
			onCleanup={onCleanup}
		/>
	)
}
