import "./editor.css"
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
} from "solid-js"
import EditorFallback from "./fallback.tsx"
import {Dynamic} from "solid-js/web"
import {useDocument} from "solid-automerge"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {parseDocumentURL} from "../../dock/dock.tsx"
import {usePerfectEditor} from "./usePerfectEditor.tsx"
import clsx from "clsx"
import {useContentTypeRegistry} from "../../registries/content-type-registry.ts"
import {createStore} from "solid-js/store"
import type {Entry} from "@pointplace/types"
import repo from "../../repo/create.ts"
import {updateText} from "@automerge/automerge-repo"

const log = window.log.extend("file-viewer")

export default function FileViewer(props: {
	url: DocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url, {repo})
	const editor = usePerfectEditor(() => props.url)

	const [file, fileHandle] = useDocument(() => entry()?.url, {repo})

	/* 	/// todo this doesn't belong here
	if (entry()?.contentType == "public.text") {
		createShortcut(
			["Meta", "S"],
			() => {
				compileToEditor(fileHandle() as DocHandle<{text: string}>)
			},
			{preventDefault: true}
		)
		createShortcut(
			["Control", "S"],
			() => {
				compileToEditor(fileHandle() as DocHandle<{text: string}>)
			},
			{preventDefault: true}
		)
	}

	const save = throttle(
		() => compileToEditor(fileHandle() as DocHandle<{text: string}>),
		100
	) */

	// createEffect(last => {
	// 	if (
	// 		file() &&
	// 		file()!.text &&
	// 		file()!.text != last &&
	// 		file()!.language == "javascript"
	// 	) {
	// 		save()
	// 	}
	// 	return file()?.text
	// })

	const [statusItems, updateStatusItems] = createStore([] as string[])

	const contentTypeName = () => {
		const name = entry()?.contentType
		return name && useContentTypeRegistry().get(name)?.displayName
	}

	return (
		<Suspense>
			<Show
				when={entry() && file() && editor() && fileHandle()}
				fallback={
					<EditorFallback
						entry={entry()!}
						editor={editor()}
						fileHandle={fileHandle()}
					/>
				}>
				<ErrorBoundary
					fallback={(error, reset) => {
						createEffect(again => {
							console.error(error)
							if (editor() && again) {
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
					<article class="file-viewer__content">
						<Dynamic
							component={editor()!.render}
							handle={fileHandle()!}
							// todo maybe an `updateIndex` for search
							// but maybe that's the content-type's job
							updateName={(name: string) =>
								entryHandle()?.change(entry =>
									updateText(entry, ["name"], name)
								)
							}
							updateStatusItems={updateStatusItems}
							onMount={(fn: () => void) => {
								onMount(fn)
							}}
							onCleanup={(fn: () => void) => {
								onCleanup(fn)
							}}
							registerKeybinding={(_key: string) => {
								return () => {}
							}}
							isActive={() => !!props.isActive}
						/>
					</article>
					<footer
						class={clsx(
							"file-viewer-status-bar",
							props.isActive && "file-viewer-status-bar--active"
						)}>
						<span class="file-viewer-status-bar__editor-name">
							{editor()?.displayName}
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
