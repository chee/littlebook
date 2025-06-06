import {createResource, createSignal} from "solid-js"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import gfm from "remark-gfm"
import {unified} from "unified"
import {Fragment, jsx, jsxs} from "solid-js/h/jsx-runtime"
import type {FileViewer, ViewID} from "@littlebook/plugin-api/types/view.ts"
import {MarkdownShape} from "@littlebook/plugin-api/shapes/shapes.ts"

const markdown = await unified()
	.use(gfm)
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeReact, {
		Fragment,
		jsx,
		jsxs,
		elementAttributeNameCase: "html",
		stylePropertyNameCase: "css",
	})

export default {
	category: "readonly",
	displayName: "html preview",
	id: "@littlebook/mdpreview" as ViewID,
	schema: MarkdownShape,
	styles: [import("./worse.css?inline")],
	render(props) {
		// eslint-disable-next-line solid/reactivity
		const [text, updateText] = createSignal(props.doc().text)
		// eslint-disable-next-line solid/reactivity
		props.onChange(() => updateText(props.doc().text))

		const [html] = createResource(
			text,
			async text => (await markdown.process(text)).result,
		)

		const [fontFamily, setFontFamily] = createSignal("sans-serif")
		const [fontSize, setFontSize] = createSignal("1rem")

		return (
			<markdown-preview
				style={{
					"font-family": fontFamily(),
					"font-size": fontSize(),
				}}>
				<div class="markdown-body">
					<div class="markdown-content">{html.latest}</div>
				</div>
				<div class="markdown__toolbar">
					<input
						value={fontFamily()}
						onInput={e => setFontFamily(e.currentTarget.value)}
					/>
					<input
						value={fontSize()}
						onInput={e => setFontSize(e.currentTarget.value)}
					/>
				</div>
			</markdown-preview>
		) as HTMLElement
	},
} satisfies FileViewer<MarkdownShape>

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"markdown-preview": JSX.IntrinsicElements["div"]
		}
	}
}
