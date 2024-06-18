import {useLittlebookAPI} from "../../api/use-api.ts"
import {UnknownContent} from "../../../contents/types/unknown/unknown-view.tsx"
// import useFile from "../../automerge/use-file.ts"
// import useContent from "../../../contents/use-content.ts"
import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Suspense, createEffect} from "solid-js"
import useDocument from "../../automerge/use-document.ts"
import {Dynamic} from "solid-js/web"
import {ContentViewElement} from "../../../contents/views/content-view.ts"

customElements.define("unknown-view", UnknownContent)

export default function ContentViewer() {
	// todo use setSearch in project-page :)
	const [search, setSearch] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()

	createEffect(() => {
		console.log(search.file, search.file)
	})

	const [file, changeFile] = useDocument<lb.File>(() => search.file)
	const [content, changeContent] = useDocument<lb.Content<any>>(
		() => file()?.content,
	)

	const contentViews = () =>
		content() && lb()?.views.content.get(content()!.contentType)

	const component = () => contentViews()?.next().value || "unknown-view"

	const ContentView = () => (
		<Dynamic
			component={component()}
			file={file()}
			changeFile={changeFile}
			content={content}
			changeContent={changeContent}
			onfilechange={(event: any) => {
				changeFile(event.detail)
			}}
			oncontentchange={(event: any) => {
				changeContent(event.detail)
			}}
		/>
	)

	createEffect(() => {
		console.log(component(), "comp", ContentView)
	})

	return (
		<div class="content-viewer">
			<ErrorBoundary fallback={SomethingWentWrong}>
				<Suspense
					fallback={
						<div class="box content-viewer content-viewer--loading content-viewer--file-loading" />
					}>
					<ContentView />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}

function SomethingWentWrong(error: TypeError) {
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
