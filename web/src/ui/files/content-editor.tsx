import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"

import useDocument from "../documents/use-document.ts"
import "./content-editor.scss"
import useContent from "./use-content.ts"
import {slugify} from "../../lib/slugify.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {editorViewRegistry} from "../../contents/content-view.ts"

customElements.define("unknown-view", UnknownContent)

function makeCustomElementName(constructorName?: string) {
	return slugify(`editor-${constructorName}`.toLowerCase())
}

export default function ContentEditor() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()

	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent, contentHandle] = useContent<any>(
		() => file()?.content,
	)

	const contentViews = () =>
		file.latest && editorViewRegistry.get(file.latest!.contentType)

	const editorConstructor = () => contentViews()?.next().value

	const customElementName = () =>
		editorConstructor()
			? makeCustomElementName(editorConstructor()!.name)
			: "unknown-view"

	createEffect(() => {
		if (editorConstructor() && !customElements.get(customElementName())) {
			customElements.define(customElementName(), editorConstructor()!)
		}
	})

	const Editor = () => (
		<Dynamic
			component={customElementName()}
			prop:doc={content.latest}
			prop:change={changeContent}
			prop:handle={contentHandle()}
			prop:value={content.latest?.value}
			prop:file={file.latest}
		/>
	)

	return (
		<div class="content-editor">
			<ErrorBoundary
				fallback={(error, reset) => {
					createEffect(
						on([() => search.file], () => {
							reset()
						}),
					)
					return <SomethingWentWrong error={error} />
				}}>
				<Show
					when={content.latest && "value" in content.latest && contentHandle()}>
					<Suspense
						fallback={
							<div class="box content-editor content-editor--loading content-editor--file-loading" />
						}>
						<Editor />
					</Suspense>
				</Show>
			</ErrorBoundary>
		</div>
	)
}
