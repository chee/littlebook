import {useSearchParams} from "@solidjs/router"
import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
// import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"
import useDocument from "../documents/use-document.ts"
// import "./content-preview.scss"
import useContent from "./use-content.ts"
import {slugify} from "../../lib/slugify.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {previewRegistry} from "../../contents/content-view.ts"

function makeCustomElementName(constructorName?: string) {
	return slugify(`preview-${constructorName}`)
}

export default function ContentPreview() {
	// todo use setSearch in project-page :)
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const lb = useLittlebookAPI()
	const [file] = useDocument<lb.File>(() => search.file)

	const [content, changeContent, contentHandle] = useContent<any>(
		() => file()?.content,
	)

	const contentViews = () =>
		file.latest && previewRegistry.get(file.latest!.contentType)

	const PreviewConstructor = () => contentViews()?.next().value

	const customElementName = () =>
		PreviewConstructor() && makeCustomElementName(PreviewConstructor()!.name)

	createEffect(() => {
		if (
			PreviewConstructor() &&
			customElementName() &&
			!customElements.get(customElementName()!)
		) {
			customElements.define(customElementName()!, PreviewConstructor()!)
		}
	})

	const Preview = () =>
		customElementName() ? (
			<Dynamic
				component={customElementName()!}
				prop:doc={content.latest}
				prop:change={changeContent}
				prop:handle={contentHandle()}
				prop:value={content.latest?.value}
				prop:file={file.latest}
			/>
		) : null

	return (
		<Show
			when={
				Preview() &&
				content.latest &&
				"value" in content.latest &&
				contentHandle()
			}>
			<div class="content-preview">
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
							<div class="box content-preview content-preview--loading content-preview--file-loading" />
						}>
						<Preview />
					</Suspense>
				</ErrorBoundary>
			</div>
		</Show>
	)
}
