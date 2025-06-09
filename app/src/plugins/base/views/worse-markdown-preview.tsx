import {createResource, createSignal} from "solid-js"
import type {FileViewer, ViewID} from "@littlebook/plugin-api/types/view.ts"
import {MarkdownShape} from "@littlebook/plugin-api/shapes/shapes.ts"
import rehypeReact from "rehype-react"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import gfm from "remark-gfm"
import {unified, type Processor} from "unified"
import {Fragment, jsx, jsxs} from "solid-js/h/jsx-runtime"
import remarkFrontmatter from "remark-frontmatter"
import {matter} from "vfile-matter"
import type {Node} from "unist"
import type {VFile} from "vfile"
import type {Root as MdastRoot} from "mdast"
import type {Root as HastRoot} from "hast"

/**
 * Parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @returns
 *   Transform.
 */
function extractFrontmatter() {
	return function (_tree: Node, file: VFile) {
		matter(file)
	}
}

const markdown: Processor<MdastRoot, HastRoot, HastRoot> = unified()
	.use(gfm)
	.use(remarkParse)
	.use(remarkFrontmatter)
	.use(extractFrontmatter)
	.use(remarkRehype, {allowDangerousHtml: true})
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

		const [html] = createResource(text, async text => {
			return "lol"
		})

		return (
			<markdown-preview>
				<div class="markdown-body">
					<div class="markdown-content" innerHTML={html.latest}></div>
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
