import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {Dynamic} from "solid-js/web"
import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
import useContentValue from "./use-content-value.ts"
import "./content-editor.scss"
import useDocument from "../documents/use-document.ts"

customElements.define("unknown-view", UnknownContent)

export default function ContentEditor() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent] = useContentValue<lb.Content<any>>(
		() => file()?.content,
	)

	const contentViews = () =>
		file.latest && lb()?.views.editor.get(file.latest!.contentType)

	const component = () => contentViews()?.next().value || "unknown-view"

	const ContentView = () => (
		<Dynamic
			component={component()}
			content={content()}
			prop:changeContent={changeContent}
		/>
	)

	createEffect(() => {
		console.log(content(), changeContent)
	})

	return (
		<Show when={content}>
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
						<ContentView />
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
