import {type DocHandle} from "@automerge/automerge-repo"
import "./editor.css"

import {
	createEffect,
	createMemo,
	ErrorBoundary,
	For,
	onCleanup,
	Show,
	Suspense,
} from "solid-js"
import {type Entry} from "../../documents/entry.ts"
import EditorFallback from "./fallback.tsx"
import {Dynamic} from "solid-js/web"
import {compileToEditor} from "../../dock/dock-tab.tsx"
import {createShortcut} from "@solid-primitives/keyboard"
import {throttle} from "@solid-primitives/scheduled"
import {useDocument} from "solid-automerge"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {parseDocumentURL} from "../../dock/dock.tsx"
import {usePerfectEditor} from "./usePerfectEditor.tsx"
import clsx from "clsx"
import {useContentTypeRegistry} from "../../registries/content-type-registry.ts"
import {createStore} from "solid-js/store"

const log = window.log.extend("file-viewer")

export default function FileViewer(props: {
	url: DocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url)
	const editor = usePerfectEditor(() => props.url)

	// todo this is `unknown` IRL
	const [file, fileHandle] = useDocument<{text: string; language?: string}>(
		() => entry()?.url
	)

	/// todo this doesn't belong here
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
	)

	createEffect(last => {
		if (
			file() &&
			file()!.text &&
			file()!.text != last &&
			file()!.language == "javascript"
		) {
			save()
		}
		return file()?.text
	})

	const Editor = () =>
		editor()?.unwrapOr({
			render() {
				return <div />
			},
			id: "",
			contentTypes: [],
			displayName: "",
		})

	const [statusItems, setStatusItems] = createStore([])

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
							// todo add callbacks for adding:
							// - item to status bar
							// - command to tab context menu
							// todo also include isActive
							component={Editor().render}
							handle={fileHandle()}
							setName={(name: string) => {
								log("setting name", name)
								entryHandle()?.change(entry => (entry.name = name))
							}}
							setStatusItems={setStatusItems}
							cleanup={(fn: () => void) => {
								onCleanup(fn)
							}}
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
