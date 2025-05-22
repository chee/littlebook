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
	getOwner,
	runWithOwner,
} from "solid-js"
import FallbackFileViewer from "./fallback.tsx"
import {Dynamic} from "solid-js/web"
import {useDocument} from "solid-automerge"
import {usePerfectView} from "./usePerfectView.tsx"
import clsx from "clsx"
import {createStore, type SetStoreFunction} from "solid-js/store"
import {updateText, type DocHandle} from "@automerge/vanillajs"
// import {useSinkRegistry} from ":/registries/command-registry.tsx"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
} from ":/core/sync/url.ts"
import type {FileEntry} from ":/docs/file-entry-doc.ts"
import defaultRepo from ":/core/sync/automerge.ts"
import type {FileViewer} from ":/domain/view/view.ts"

import debug from ":/core/debug.ts"
const log = debug.extend("file-viewer")

export default function FileViewer(props: {
	url: AutomergeURLOrDocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<FileEntry>(() => docinfo().url, {
		repo: defaultRepo,
	})
	const view = usePerfectView(() => props.url)

	const [file, fileHandle] = useDocument(() => entry()?.url, {repo})

	const [statusItems, updateStatusItems] = createStore([] as string[])

	const owner = getOwner()

	return (
		<div
			class="file-viewer"
			on:run-sink={(event: CustomEvent<string>) => {
				// runWithOwner(owner, () => {
				// 	const sinks = useSinkRegistry()
				// 	const sink = sinks.get(event.detail)
				// 	if (sink) {
				// 		sinks.run(sink, entry()!)
				// 	} else {
				// 		console.log("no sink", event.detail)
				// 	}
				// })
			}}>
			<Suspense>
				<Show
					when={entry() && file() && view() && fileHandle()}
					fallback={
						<FallbackFileViewer
							entry={entry()}
							view={view()}
							fileHandle={fileHandle()}
						/>
					}>
					{/* todo extract */}
					<ErrorBoundary
						fallback={(error, reset) => {
							createEffect(again => {
								if (view() && again) {
									reset()
								}
								return true
							})

							return (
								<FallbackFileViewer
									entry={entry()}
									view={view()}
									fileHandle={fileHandle()}
									error={error}
								/>
							)
						}}>
						<Switch>
							<Match when={view()?.category === "editor"}>
								<article class="file-viewer__content file-viewer__content--editor">
									<EditorViewWrapper
										editor={view()! as FileEditor<unknown>}
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
										view={view() as FileViewer<unknown>}
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
								props.isActive && "file-viewer-status-bar--active",
							)}>
							<span class="file-viewer-status-bar__editor-name">
								{view()?.displayName}
							</span>
							<For each={statusItems}>{item => <span>{item}</span>}</For>
						</footer>
					</ErrorBoundary>
				</Show>
			</Suspense>
		</div>
	)
}

function EditorViewWrapper<T>(props: {
	editor: FileEditor<T>
	fileHandle: DocHandle<T>
	entryHandle: DocHandle<FileEntry>
	updateStatusItems: SetStoreFunction<string[]>
	isActive: boolean
}) {
	const dom = (
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
				onCleanup(useHotkeys(key, action))
			}}
			isActive={() => !!props.isActive}
		/>
	)

	// const sinks = useSinkRegistry()

	// function onsink(event: CustomEvent<string>) {
	// 	const sink = sinks.get(event.detail)
	// 	if (sink) {
	// 		sinks.run(sink, props.entryHandle.doc())
	// 	} else {
	// 		console.log("no such sink", event.detail)
	// 	}
	// }

	// createEffect(() => {
	// 	if (typeof dom == "function") {
	// 		const el = (dom as () => HTMLElement)()
	// 		el.addEventListener("run-sink", onsink)
	// 		onCleanup(() => {
	// 			el.removeEventListener("run-sink", onsink)
	// 		})
	// 	} else if (dom instanceof HTMLElement) {
	// 	}
	// })
	return dom
}

function ReadOnlyViewWrapper<T>(props: {
	view: FileViewer<T>
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
				onCleanup(useHotkeys(key, action))
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
