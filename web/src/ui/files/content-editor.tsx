import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
import useDocument from "../documents/use-document.ts"
import "./content-editor.scss"
import useContent from "./use-content.ts"
import {slugify} from "../../lib/slugify.ts"
import {Dynamic} from "solid-js/web"

customElements.define("unknown-view", UnknownContent)

function makeCustomElementName(contentType?: string, constructorName?: string) {
	return slugify(
		`${contentType?.replaceAll(".", "-")}-${constructorName}`.toLowerCase(),
	)
}

export default function ContentEditor() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent, contentHandle] = useContent<any>(
		() => file()?.content,
	)

	const contentViews = () =>
		file.latest && lb()?.views.editor.get(file.latest!.contentType)

	const editorConstructor = () => contentViews()?.next().value
	createEffect(() => {
		console.log(editorConstructor()?.name)
	})
	const customElementName = () =>
		editorConstructor()
			? makeCustomElementName(
					file.latest?.contentType,
					editorConstructor()!.name,
				)
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

function SomethingWentWrong({error}: {error: Error}) {
	return (
		<details class="flex column h-100">
			<summary>something went bad :( </summary>
			<div
				style={{
					background: "black",
					color: "lime",
					padding: "1em",
					// display: "flex",
					// "flex-direction": "column",
					height: "100%",
				}}>
				<code>{error.message}</code>
				<code>{JSON.stringify(error)}</code>
				<code>{error.stack}</code>
			</div>
		</details>
	)
}
