import type {AutomergeUrl, DocHandle} from "@automerge/automerge-repo"
import repo from "../../repo/create.ts"
import type {DocumentBase, TextDocument} from "../../repo/home.ts"
import "./editor.css"
import {createDocumentStore, useHandle} from "automerge-repo-solid-primitives"

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

interface DocumentEditor<T extends DocumentBase> {
	// a function that returns a dom element
	render(props: {handle: DocHandle<T>; cleanup(): void}): HTMLElement
}

/*
a way to add these:
1. cli: build the bundle
2. cli: cat bundle.js|base64 -w0|pbcopy
3. browser: repo.find(url).change(doc => doc.bytes = `⌘+v`)<RET>
*/

const registry = {
	// codemirror thing as .bytes
	// todo bootstrap this in if it isn't there
	text: "automerge:2LQzHKZW8axkP48Ycmhi77zCwM36" as AutomergeUrl,
	tldraw: "" as AutomergeUrl,
} as const

import {
	createEffect,
	createResource,
	on,
	onCleanup,
	Show,
	Suspense,
} from "solid-js"

export default function Editor(props: {url: AutomergeUrl}) {
	const documentHandle = useHandle<DocumentBase>(() => props.url, {repo})
	const document = createDocumentStore(documentHandle)
	const editorURL = () => registry[document()?.type]
	const editorHandle = useHandle<{bytes: Uint8Array}>(editorURL, {repo})
	const editor = createDocumentStore(editorHandle)
	const code = () => editor()?.bytes
	const blob = () => new Blob([code()], {type: "application/javascript"})
	const url = () => URL.createObjectURL(blob())
	const [Editor, control] = createResource(
		async () =>
			await import(/* @vite-ignore */ url()).then(mod => mod?.default)
	)

	createEffect(
		on([url], () => {
			control.refetch()
		})
	)

	return (
		<div class="editor">
			<Suspense>
				<Show when={Editor() && documentHandle()}>
					{Editor()?.render({
						handle: documentHandle(),
						cleanup(fn) {
							onCleanup(fn)
						},
					})}
				</Show>
			</Suspense>
		</div>
	)
}
