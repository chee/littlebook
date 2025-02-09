import {createResource, createSignal, onCleanup, onMount} from "solid-js"
import githubMarkdownCSS from "github-markdown-css/github-markdown.css?raw"
import rehypeStarryNight from "rehype-starry-night"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import {unified} from "unified"
import {Fragment, jsx, jsxs} from "solid-js/h/jsx-runtime"
import {MarkdownShape, type Editor} from "@pointplace/schemas"
import type {StandardSchemaV1} from "@standard-schema/spec"
import type {DocHandleChangePayload} from "@automerge/automerge-repo"

const markdown = await unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeStarryNight)
	.use(rehypeReact, {
		Fragment,
		jsx,
		jsxs,
		elementAttributeNameCase: "html",
		stylePropertyNameCase: "css",
	})

type Markdown = StandardSchemaV1.InferOutput<typeof MarkdownShape>

export default {
	displayName: "markdown preview",
	id: "markdown-preview",
	contentTypes: ["public.markdown"],
	render(props) {
		// eslint-disable-next-line solid/reactivity
		const [text, settext] = createSignal(props.handle.doc().text)
		function update(payload: DocHandleChangePayload<Markdown>) {
			settext(payload.patchInfo.after.text)
		}

		onMount(() => {
			props.handle.on("change", update)
		})
		onCleanup(() => {
			props.handle.off("change", update)
		})

		const [html] = createResource(
			text,
			async text => (await markdown.process(text)).result
		)

		return (
			<div class="markdown-preview">
				<style>{
					/* css */ `
					.markdown-preview {
						padding: 1rem;
						${githubMarkdownCSS}
					}
					`
				}</style>
				<div class="markdown-body">{html.latest}</div>
			</div>
		) as HTMLElement
	},
} satisfies Editor<Markdown>
