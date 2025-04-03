import {createResource, createSignal} from "solid-js"
import githubMarkdownCSS from "github-markdown-css/github-markdown.css?raw"
import rehypeStarryNight from "rehype-starry-night"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import {all} from "@wooorm/starry-night"
import gfm from "remark-gfm"
import {unified} from "unified"
import {Fragment, jsx, jsxs} from "solid-js/h/jsx-runtime"
import {MarkdownShape, type FileViewer} from "@pointplace/types"

const markdown = await unified()
	.use(gfm)
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeStarryNight, {grammars: all})
	.use(rehypeReact, {
		Fragment,
		jsx,
		jsxs,
		elementAttributeNameCase: "html",
		stylePropertyNameCase: "css",
	})

export default {
	category: "readonly",
	displayName: "github preview",
	id: "github-markdown-preview",
	schema: MarkdownShape,
	render(props) {
		// eslint-disable-next-line solid/reactivity
		const [text, updateText] = createSignal(props.doc().text)
		// eslint-disable-next-line solid/reactivity
		props.onChange(() => updateText(props.doc().text))

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
} satisfies FileViewer<MarkdownShape>
