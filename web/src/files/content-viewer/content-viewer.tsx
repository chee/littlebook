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
import type {UniformTypeIdentifier} from "../contents/uniform-type.ts"

if (!customElements.get("unknown-content")) {
	customElements.define("unknown-content", UnknownContent)
}

export default function ContentViewer(props: {
	fileId: lb.FileId
	view: string | SolidContentView<any> | undefined
}) {
	let [file] = useDocument<lb.File>(() => props.fileId)

	let [content, _change, handle] = useContent<any>(() => file()?.content)

	let contentViews = () =>
		file.latest && contentViewRegistry.get(file.latest!.contentType)

	// todo this needs to be selectable in the UI
	let view = () =>
		props.view || contentViews()?.next().value || "unknown-content"
	createEffect(() => {
		let detail = view()
		if (typeof detail == "string") {
			contentViewRegistry.request(detail as UniformTypeIdentifier)
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
					<Show when={content.latest && file.latest}>
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
