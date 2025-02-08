import {createResource, createSignal} from "solid-js"
import githubMarkdownCSS from "github-markdown-css/github-markdown.css?raw"
import rehypeStarryNight from "rehype-starry-night"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import {unified} from "unified"
import {Fragment, jsx, jsxs} from "solid-js/h/jsx-runtime"
import {MarkdownShape, type Editor} from "@pointplace/schemas"
import {parse} from "valibot"

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

export default {
	displayName: "markdown preview",
	id: "markdown-preview",
	contentTypes: ["public.markdown"],
	render(props) {
		// eslint-disable-next-line solid/reactivity
		const doc = parse(MarkdownShape, props.handle.doc())
		const [text, settext] = createSignal(doc.text)

		// eslint-disable-next-line solid/reactivity
		props.handle.on("change", payload => {
			const after = parse(MarkdownShape, payload.patchInfo.after)
			settext(() => after.text)
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
} satisfies Editor
