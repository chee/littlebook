import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {UnknownContent} from "../plugins/content/unknown/unknown-view.tsx"

import useDocument from "../documents/use-document.ts"
import "./content-editor.scss"
import useContent from "./use-content.ts"
import {slugify} from "../lib/slugify.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {
	editorViewRegistry,
	type EditorViewConstructor,
	type EditorViewWebComponent,
} from "./content-view.ts"

customElements.define("unknown-view", UnknownContent)

function makeCustomElementName(constructorName?: string) {
	return slugify(`editor-${constructorName}`.toLowerCase())
}

function isWebComponent(
	cons?: EditorViewConstructor<any>,
): cons is EditorViewWebComponent<any> {
	return Boolean(cons && cons.prototype instanceof HTMLElement)
}

export default function ContentEditor(props: {fileId: lb.FileId}) {
	const [file] = useDocument<lb.File>(() => props.fileId)

	const [content, change, handle] = useContent<any>(() => file()?.content)

	const contentViews = () =>
		file.latest && editorViewRegistry.get(file.latest!.contentType)

	const EditorConstructor = () => contentViews()?.next().value

	const customElementName = () =>
		EditorConstructor()
			? makeCustomElementName(EditorConstructor()!.name)
			: "unknown-view"

	createEffect(() => {
		const E = EditorConstructor()
		if (E && isWebComponent(E) && !customElements.get(customElementName())) {
			customElements.define(customElementName(), E)
		}
	})

	const Editor = () => {
		const E = EditorConstructor()
		return (
			<Dynamic
				component={!E || isWebComponent(E) ? customElementName() : E}
				prop:doc={content.latest}
				prop:change={change}
				prop:handle={handle()}
				prop:value={content.latest?.value}
				prop:file={file.latest}
			/>
		)
	}

	return (
		<div class="content-editor">
			<ErrorBoundary
				fallback={(error, reset) => {
					createEffect(
						on([() => props.fileId], () => {
							reset()
						}),
					)
					return <SomethingWentWrong error={error} />
				}}>
				<Suspense
					fallback={
						<div class="box content-editor content-editor--loading content-editor--file-loading" />
					}>
					<Show when={content.latest && "value" in content.latest && handle()}>
						<Editor />
					</Show>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
