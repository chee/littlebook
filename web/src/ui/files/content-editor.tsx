import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {Dynamic} from "solid-js/web"
import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
import useContentValue from "./use-content-value.ts"
import "./content-editor.scss"
import useDocument from "../documents/use-document.ts"
import {
	createSolidTextView,
	createPlainTextView,
} from "../../plugins/content/text/text.tsx"
import {createReactTextView} from "@littlebook/excalidraw"

customElements.define("unknown-view", UnknownContent)

export default function ContentEditor() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent, helpers] = useContentValue<lb.Content<any>>(
		() => file()?.content,
	)

	const el = document.createElement("div")

	const view = () => createReactTextView(el, changeContent, helpers)

	// const contentViews = () =>
	// 	file.latest && lb()?.views.editor.get(file.latest!.contentType)

	// const component = () => contentViews()?.next().value || "unknown-view"

	// const ContentView = () => (
	// 	<Dynamic
	// 		component={component()}
	// 		prop:content={content()}
	// 		prop:changeContent={changeContent}
	// 		prop:helpers={helpers()}
	// 	/>
	// )

	createEffect(() => {
		const [update, dispose] = view()
		update(content())
	})

	return (
		<Show when={content() && helpers()}>
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
					<Suspense
						fallback={
							<div class="box content-editor content-editor--loading content-editor--file-loading" />
						}>
						{el}
					</Suspense>
				</ErrorBoundary>
			</div>
		</Show>
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
