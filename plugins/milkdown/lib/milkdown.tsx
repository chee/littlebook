import {View, MarkdownShape} from "@pointplace/types"
// import crepe "@milkdown/crepe/theme/frame.css";
// import { Crepe } from '@milkdown/crepe';
// import crepeCSS from "@milkdown/crepe/theme/common/style.css?raw";

import {
	Editor as Milk,
	rootCtx,
	defaultValueCtx,
	editorStateCtx,
	schemaCtx,
} from "@milkdown/kit/core"
import {history} from "@milkdown/kit/plugin/history"
import {commonmark} from "@milkdown/kit/preset/commonmark"
import {nord} from "@milkdown/theme-nord"
import {listener, listenerCtx} from "@milkdown/kit/plugin/listener"
import {updateText} from "@automerge/automerge-repo/slim"
import nordcss from "@milkdown/theme-nord/style.css?raw"
import {SchemaAdapter} from "@automerge/prosemirror"

export default {
	id: "milkdown",
	displayName: "Milkdown",
	schema: MarkdownShape,
	contentTypes: ["public.markdown"],
	category: "editor",
	render(api) {
		console.log("hello angels")
		let ref!: HTMLDivElement
		let editor: Milk

		const style = new CSSStyleSheet()
		style.replaceSync(
			nordcss +
				/*css*/ `
			.milkdown {
				padding: 1rem;
			}
		`
		)
		try {
			if (document.adoptedStyleSheets) {
				document.adoptedStyleSheets.push(style)
			} else {
				document.adoptedStyleSheets = [style]
			}
		} catch {}
		api.onMount(async () => {
			editor = await Milk.make()
				.config(ctx => {
					ctx.set(rootCtx, ref)
					api.handle.on("change", () => {
						ctx.set(defaultValueCtx, api.handle.doc().text)
					})

					ctx.set(defaultValueCtx, api.handle.doc().text)
					ctx.get(listenerCtx).markdownUpdated(
						(_ctx, markdown, _prevMarkdown) => {
							api.handle.change(doc => {
								updateText(doc, ["text"], markdown)
							})
						}
					)
				})
				.use(history)
				.use(listener)
				.config(nord)
				.use(commonmark)
				.create()
		})

		api.onCleanup(() => {
			editor.destroy()
		})

		return (<div ref={ref} />) as HTMLDivElement
	},
} satisfies View<MarkdownShape>
