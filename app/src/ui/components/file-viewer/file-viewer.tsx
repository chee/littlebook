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
import {useDocHandle, useDocument} from "solid-automerge"
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
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"
import defaultRepo from ":/core/sync/automerge.ts"

import debug from ":/core/debug.ts"
import type {FileEditor, FileViewer} from "@littlebook/plugin-api/types/view.ts"
import {toast} from ":/ui/components/toast/toast.tsx"
const log = debug.extend("file-viewer")

export default function FileViewer(props: {
	url: AutomergeURLOrDocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<FileEntryDoc>(() => docinfo().url, {
		repo: defaultRepo,
	})
	const view = usePerfectView(() => props.url)

	const fileContentHandle = useDocHandle(() => entry()?.url, {
		repo: defaultRepo,
	})

	const [statusItems, updateStatusItems] = createStore([] as string[])

	return (
		<div class="file-viewer">
			<Show when={entry() && view() && fileContentHandle()}>
				{/* todo extract */}
				<ErrorBoundary
					fallback={(error, reset) => {
						createEffect(again => {
							if (view() && again) {
								reset()
							}
							return true
						})
						console.error(error, entry(), view(), fileContentHandle())
						return null
					}}>
					<Switch>
						<Match when={view()?.category === "editor"}>
							<article class="file-viewer__content file-viewer__content--editor">
								<EditorViewWrapper
									editor={view()! as FileEditor<unknown>}
									fileHandle={fileContentHandle()!}
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
									fileHandle={fileContentHandle()!}
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
							{view()?.displayName ?? view()?.id}
						</span>
						<For each={statusItems}>{item => <span>{item}</span>}</For>
					</footer>
				</ErrorBoundary>
			</Show>
		</div>
	)
}

function EditorViewWrapper<T>(props: {
	editor: FileEditor<T>
	fileHandle: DocHandle<T>
	entryHandle: DocHandle<FileEntryDoc>
	updateStatusItems: SetStoreFunction<string[]>
	isActive: boolean
}) {
	const owner = getOwner()
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
			onCleanup={fn => runWithOwner(owner, () => onCleanup(fn))}
			registerKeybinding={(
				key: string,
				action: (event: KeyboardEvent) => void,
			) => {
				// it's neat, but unclean, to pass the disposer directly to onCleanup
				onCleanup(useHotkeys(key, action))
			}}
			toast={toast}
			isActive={() => !!props.isActive}
		/>
	)

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

	const owner = getOwner()

	return (
		<Dynamic
			component={props.view.render}
			doc={() => props.fileHandle.doc()}
			isActive={() => !!props.isActive}
			registerKeybinding={(key, action) =>
				onCleanup(useHotkeys(key, action))
			}
			updateStatusItems={props.updateStatusItems}
			onChange={fn => {
				subs.add(fn)
			}}
			onMount={onMount}
			onCleanup={fn => runWithOwner(owner, () => onCleanup(fn))}
			toast={toast}
		/>
	)
}
