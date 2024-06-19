import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {Dynamic} from "solid-js/web"
import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
import useDocument from "../documents/use-document.ts"
import "./content-editor.scss"
import {updateText} from "@automerge/automerge-repo"

customElements.define("unknown-view", UnknownContent)

export default function ContentEditor() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent] = useDocument<lb.Content<any>>(
		() => file()?.content,
	)

	const contentViews = () =>
		content.latest && lb()?.views.editor.get(content.latest!.contentType)

	const component = () => contentViews()?.next().value || "unknown-view"

	const ContentView = () => (
		<Dynamic
			component={component()}
			content={content.latest?.value}
			prop:changeContent={changeContent}
		/>
	)

	return (
		<Show when={content.latest}>
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
