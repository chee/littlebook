import {
	type AutomergeUrl,
	type Doc,
	type DocHandle,
	type DocHandleChangePayload,
	type HandleState,
} from "@automerge/automerge-repo"
import repo from "../../repo/create.ts"
import "./editor.css"

import {
	createComputed,
	createEffect,
	createResource,
	ErrorBoundary,
	onCleanup,
	Show,
	Suspense,
	type Accessor,
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
import {
	createDocumentProjection,
	useDocumentStore,
	useHandle,
} from "automerge-repo-solid-primitives"

export default function FileViewer(props: {url: AutomergeUrl}) {
	const [home] = useHome()

	const [entry, changeEntry] = useDocumentStore<Entry>(() => props.url, {repo})

	const registry = useEditorRegistry()

	const editors = () => entry && registry.editors(entry)

	const editor = (): Result<Editor, Error> => {
		const url = props.url
		const associations = home?.associations
		const firstEditor = editors()?.next().value

		if (associations?.[url]) {
			const editor = registry.get(associations[url])
			return editor
		} else if (firstEditor) {
			return ok(firstEditor)
		} else {
			return err(new Error("no editor found"))
		}
	}

	const fileHandle = useHandle<{text: string; language?: string}>(
		() => entry.url,

		{repo}
	)

	/// todo this doesn't belong here
	if (entry?.contentType == "text") {
		createShortcut(
			["Meta", "S"],
			() => {
				console.log("binband")
				compileToEditor(fileHandle() as DocHandle<{text: string}>)
			},
			{preventDefault: true}
		)
		createShortcut(
			["Control", "S"],
			() => {
				console.log("ctrl")
				compileToEditor(fileHandle() as DocHandle<{text: string}>)
			},
			{preventDefault: true}
		)
	}

	const save = throttle(
		() => compileToEditor(fileHandle() as DocHandle<{text: string}>),
		100
	)

	const file = createDocumentProjection<{text: string; language?: string}>(
		fileHandle
	)

	createEffect(() => {
		// console.log({file}, file.text)
	})

	createEffect(last => {
		if (
			file &&
			file.text &&
			file.text != last &&
			file.language == "javascript"
		) {
			save()
		}
		return file?.text
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
				when={entry && file && editor() && editor().isOk && fileHandle()}
				fallback={
					<EditorFallback
						entry={entry!}
						editor={editor()}
						fileHandle={fileHandle()}
					/>
				}>
				<ErrorBoundary
					fallback={error => <pre>{JSON.stringify(error)}</pre>}>
					<article
						style={{height: "100%", width: "100%", overflow: "scroll"}}>
						<Dynamic
							component={Editor()}
							handle={fileHandle()}
							setName={(name: string) => {
								changeEntry(entry => (entry.name = name))
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
