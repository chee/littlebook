import {Editor, MarkdownShape} from "@pointplace/types"
// import crepe "@milkdown/crepe/theme/frame.css";
// import { Crepe } from '@milkdown/crepe';
// import crepeCSS from "@milkdown/crepe/theme/common/style.css?raw";

import {
	Editor as Milk,
	rootCtx,
	defaultValueCtx,
	editorStateCtx,
} from "@milkdown/kit/core"
import {history} from "@milkdown/kit/plugin/history"
import {commonmark} from "@milkdown/kit/preset/commonmark"
import {nord} from "@milkdown/theme-nord"
import {listener, listenerCtx} from "@milkdown/kit/plugin/listener"
import {updateText} from "@automerge/automerge-repo/slim"
import nordcss from "@milkdown/theme-nord/style.css?raw"

export default {
	id: "milkdown",
	displayName: "Milkdown",
	schema: MarkdownShape,
	contentTypes: ["public.markdown"],
	render(api) {
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
						const state = ctx.get(editorStateCtx)
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
} satisfies Editor<MarkdownShape>
