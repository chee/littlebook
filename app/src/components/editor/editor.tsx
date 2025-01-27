import type {AutomergeUrl} from "@automerge/automerge-repo"
import repo from "../../repo/create.ts"
import "./editor.css"
import {useHandle} from "automerge-repo-solid-primitives"
// import text from "@littlebook/text"
import tldraw from "@littlebook/tldraw"

/*
    so i think that the editor registry should include a function that
    "converts" a BaseDocument to the correct kind of typechecked document. it
    could, theoretically, in the future actually check a schema. but for now
    it'll naïvely `is` it into conformance.

    what else......

    yeah so this component loads a document, and then it checks the registry to
    find out if there are any editors registered for the type listed in the
    document.

    the user's home (which is currently just a plain FolderDocument, but that
    will change now) will have a `.tools.editors` field that will include refs
    to automerge docs for all their known editors. this field will be watched,
    and when editors are added to it they will be imported into the registry

    TODO think about different kinds of reactivity

    maybe an editor also provides a .createDeepSignal function that i can hook
    up to an automerge handle?


*/

import {onCleanup, Show, Suspense, useContext} from "solid-js"
import ShadowBox from "../shadow-box/shadow-box.tsx"
import {useEntry} from "../../documents/entry.ts"
import {
	EditorRegistryContext,
	useEditorRegistry,
} from "../../registries/editor/editor-registry.ts"
import type {Editor} from "../../registries/editor/editor-schema.ts"
import {useHome} from "../../repo/home.ts"
import EditorFallback from "./fallback.tsx"
import {err, ok, type Result} from "true-myth/result"

/*
 * a way to add these:
 * 1. cli: build the bundle
 * 2. cli: cat bundle.js|base64 -w0|pbcopy
 * 3. browser: repo.find(url).change(doc => doc.bytes = Uint8Array.fromBas64(`⌘+v`))<RET>
 */
export default function FileViewer(props: {url: AutomergeUrl}) {
	const [home] = useHome()
	const [entry, entryHandle] = useEntry(() => props.url, {repo})
	const registry = useEditorRegistry()

	const editors = () => entry() && registry.editors(entry()!)

	const editor = (): Result<Editor, Error> => {
		const url = props.url
		const associations = home()?.associations
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

	const fileHandle = useHandle<unknown>(() => entry()?.url, {repo})

	return (
		<Suspense>
			<Show
				when={entry() && editor() && editor().isOk && fileHandle()}
				fallback={
					<EditorFallback
						entry={entry()!}
						editor={editor()}
						fileHandle={fileHandle()}
					/>
				}>
				<ShadowBox>
					{shadow => {
						editor()
							.unwrapOr({
								render() {},
								id: "",
								contentTypes: [],
								displayName: "",
							})
							.render({
								handle: fileHandle(),
								setName(name: string) {
									entryHandle()?.change(entry => (entry.name = name))
								},
								cleanup(fn) {
									onCleanup(fn)
								},
								shadow,
							})
					}}
				</ShadowBox>
			</Show>
		</Suspense>
	)
}
