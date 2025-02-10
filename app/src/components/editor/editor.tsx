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
import type {Entry} from "@pointplace/schemas"
import repo from "../../repo/create.ts"
import {updateFileMenu} from "./filemenu.tsx"

const log = window.log.extend("file-viewer")

export default function FileViewer(props: {
	url: DocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url, {repo})
	const editor = usePerfectEditor(() => props.url)

	// todo this is `unknown` IRL
	const [file, fileHandle] = useDocument<{text: string; language?: string}>(
		() => entry()?.url,
		{repo}
	)

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

	const Editor = () =>
		// todo no
		editor()?.unwrapOr({
			render() {
				return <div />
			},
			id: "",
			contentTypes: [],
			displayName: "",
		})

	const [statusItems, updateStatusItems] = createStore([])

	createEffect(() => {
		log("editor update", Editor()?.id)
		log("entry url update", entry()?.url)
	})

	const contentTypeName = () => {
		const result = useContentTypeRegistry().get(entry()!.contentType)
		if (result.isOk && result.value.displayName) {
			return result.value.displayName
		} else {
			return entry()!.contentType
		}
	}

	return (
		<Suspense>
			<Show
				when={
					entry() && file() && editor() && editor().isOk && fileHandle()
				}
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
							component={Editor().render}
							handle={fileHandle()}
							updateName={(name: string) => {
								log("setting name", name)
								entryHandle()?.change(entry => (entry.name = name))
							}}
							updateStatusItems={updateStatusItems}
							updateFileMenu={updateFileMenu}
							onMount={(fn: () => void) => {
								onMount(fn)
							}}
							onCleanup={(fn: () => void) => {
								onCleanup(fn)
							}}
							registerKeybinding={(key: string) => {}}
							isActive={() => props.isActive}
							repo={repo}
						/>
					</article>
					<footer
						class={clsx(
							"file-viewer-status-bar",
							props.isActive && "file-viewer-status-bar--active"
						)}>
						<span class="file-viewer-status-bar__editor-name">
							{Editor().displayName}
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
