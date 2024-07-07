import {ErrorBoundary, Show, Suspense, createEffect, on} from "solid-js"
// import {UnknownContent} from "../../plugins/content/unknown/unknown-view.tsx"
import useDocument from "../documents/use-document.ts"
// import "./content-preview.scss"
import useContent from "./use-content.ts"
import {slugify} from "../lib/slugify.ts"
import {Dynamic} from "solid-js/web"
import SomethingWentWrong from "./went-bad.tsx"
import {
	previewRegistry,
	type PreviewConstructor,
	type PreviewWebComponent,
} from "./content-view.ts"

function makeCustomElementName(constructorName?: string) {
	return slugify(`preview-${constructorName}`)
}

function isWebComponent(
	cons?: PreviewConstructor<any>,
): cons is PreviewWebComponent<any> {
	return Boolean(cons && cons.prototype instanceof HTMLElement)
}

export default function ContentPreview(props: {fileId: lb.FileId}) {
	const [file] = useDocument<lb.File>(() => props.fileId)

	const [content, changeContent, contentHandle] = useContent<any>(
		() => file()?.content,
	)

	const contentViews = () =>
		file.latest && previewRegistry.get(file.latest!.contentType)

	const PreviewConstructor = () => contentViews()?.next().value

	const customElementName = () =>
		PreviewConstructor() && makeCustomElementName(PreviewConstructor()!.name)

	createEffect(() => {
		const preview = PreviewConstructor()
		if (
			preview &&
			customElementName() &&
			isWebComponent(preview) &&
			!customElements.get(customElementName()!)
		) {
			customElements.define(customElementName()!, preview)
		}
	})

	return (
		<div class="content-preview">
			<ErrorBoundary
				fallback={(error, reset) => {
					createEffect(
						on([() => props.fileId], () => {
							reset()
						}),
					)
					return <SomethingWentWrong error={error} />
				}}>
				<Suspense>
					<Dynamic
						component={customElementName()!}
						prop:doc={content.latest}
						prop:change={changeContent}
						prop:handle={contentHandle()}
						prop:value={content.latest?.value}
						prop:file={file.latest}
					/>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
