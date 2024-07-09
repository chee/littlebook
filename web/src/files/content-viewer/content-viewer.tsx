import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
import {UnknownContent} from "./fallback.tsx"

import useDocument from "../../documents/use-document.ts"
import useContent from "../contents/use-content.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {
	contentViewRegistry,
	type SolidContentView,
} from "../contents/content-view.ts"
import "./content-viewer.scss"

if (!customElements.get("unknown-content")) {
	customElements.define("unknown-content", UnknownContent)
}

export default function ContentViewer(props: {
	fileId: lb.FileId
	view: string | SolidContentView<any> | undefined
}) {
	const [file] = useDocument<lb.File>(() => props.fileId)

	const [content, _change, handle] = useContent<any>(() => file()?.content)

	const contentViews = () =>
		file.latest && contentViewRegistry.get(file.latest!.contentType)
	// todo this needs to be selectable in the UI
	const view = () =>
		props.view || contentViews()?.next().value || "unknown-content"
	createEffect(() => {
		const detail = view()
		if (typeof detail == "string") {
			document.dispatchEvent(
				new CustomEvent<string>("contentviewrequest", {detail}),
			)
		}
	})

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
					<Show when={content.latest && handle()}>
						<Dynamic
							component={view()}
							prop:content={content.latest}
							prop:handle={handle()}
							prop:file={file.latest}
						/>
					</Show>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
