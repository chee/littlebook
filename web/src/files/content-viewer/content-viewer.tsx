import {
	ErrorBoundary,
	Show,
	Suspense,
	createEffect,
	createMemo,
	createSignal,
	on,
	untrack,
} from "solid-js"
import {UnknownContent} from "./fallback.tsx"

import useDocument from "../../documents/use-document.ts"
import useContent from "../contents/use-content.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {
	contentViewRegistry,
	type ContentViewName,
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
	let [file] = useDocument<lb.File>(() => props.fileId)

	let [content, _change, handle] = useContent<any>(() => file()?.content)

	let contentViews = () =>
		file.latest?.contentType &&
		contentViewRegistry.get(file.latest!.contentType)

	let defaultView = createMemo(() => contentViews()?.next().value)

	let view = () => props.view || defaultView() || "unknown-content"

	createEffect(() => {
		let detail = props.view || defaultView()

		if (
			typeof detail == "string" &&
			!contentViewRegistry.ready(detail as ContentViewName)
		) {
			contentViewRegistry.request(detail as ContentViewName)
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
					<Show
						when={
							view() &&
							(typeof view() == "string" &&
							contentViewRegistry.ready(view() as ContentViewName) != null
								? contentViewRegistry.ready(view() as ContentViewName)
								: true) &&
							content.latest &&
							file.latest
						}>
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
