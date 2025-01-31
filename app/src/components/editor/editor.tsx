import {type AutomergeUrl, type DocHandle} from "@automerge/automerge-repo"
import "./editor.css"

import {
	createEffect,
	createMemo,
	ErrorBoundary,
	onCleanup,
	Show,
	Suspense,
} from "solid-js"
import {type Entry} from "../../documents/entry.ts"
import {useEditorRegistry} from "../../registries/editor/editor-registry.ts"
import type {Editor} from "../../registries/editor/editor-schema.ts"
import {useHome} from "../../repo/home.ts"
import EditorFallback from "./fallback.tsx"
import {err, ok, type Result} from "true-myth/result"
import {Dynamic} from "solid-js/web"
import {compileToEditor} from "../../dock/dock-tab.tsx"
import {createShortcut} from "@solid-primitives/keyboard"
import {throttle} from "@solid-primitives/scheduled"
import {useDocument} from "automerge-repo-solid-primitives"
import type {DocumentURL} from "../../dock/dock-api.ts"
import {parseDocumentURL} from "../../dock/dock.tsx"

export default function FileViewer(props: {url: DocumentURL}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const [home] = useHome()
	const [entry, entryHandle] = useDocument<Entry>(() => docinfo().url)

	const registry = useEditorRegistry()

	const editors = () => entry() && registry.editors(entry()!)

	const editor = (): Result<Editor, Error> => {
		const url = docinfo().url
		const associations = home()?.associations
		const associated = associations?.[url]
		const firstEditor = editors()?.next().value

		if (docinfo().editor) {
			const editor = registry.get(docinfo().editor!)
			return editor
				? editor
				: err(new Error(`couldn't find editor ${docinfo().editor}`))
		}

		if (associated) {
			const editor = registry.get(associated)
			return editor
		} else if (firstEditor) {
			return ok(firstEditor)
		} else {
			return err(new Error("no editor found"))
		}
	}

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
		})?.render

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
						createEffect(test => {
							if (editor() && test) {
								reset()
							}
							return true
						})
						if (!(error instanceof Error)) {
							return <div>{error.message ?? error}</div>
						}

						window.e = error
						return (
							<article class="error error--editor">
								<h1>
									<code>{error.toString()}</code>
								</h1>

								<div>
									<code>
										<pre
											style={{
												"line-height": "1.4",
												padding: "1rem",
												background: "black",
												color: "lime",
											}}>
											{error.stack}
										</pre>
									</code>
								</div>
							</article>
						)
					}}>
					<article
						style={{height: "100%", width: "100%", overflow: "scroll"}}>
						<Dynamic
							component={Editor()}
							handle={fileHandle()}
							setName={(name: string) => {
								entryHandle()?.change(entry => (entry.name = name))
							}}
							cleanup={(fn: () => void) => {
								onCleanup(fn)
							}}
						/>
					</article>
				</ErrorBoundary>
			</Show>
		</Suspense>
	)
}
