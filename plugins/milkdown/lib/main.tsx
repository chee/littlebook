import {View, MarkdownShape} from "@pointplace/types"
import {Crepe} from "@milkdown/crepe"
import {updateText} from "@automerge/automerge-repo"
import {defaultValueCtx} from "@milkdown/kit/core"
import css from "./crepe.css?raw"
import {githubLight} from "@uiw/codemirror-theme-github"

export default {
	id: "milkdown",
	displayName: "Milkdown",
	schema: MarkdownShape,
	contentTypes: ["public.markdown"],
	render(api) {
		let ref!: HTMLDivElement
		let crepe: Crepe

		const style = new CSSStyleSheet()
		style.replaceSync(css)
		try {
			if (document.adoptedStyleSheets) {
				document.adoptedStyleSheets.push(style)
			} else {
				document.adoptedStyleSheets = [style]
			}
		} catch {}
		api.onMount(async () => {
			crepe = new Crepe({
				root: ref,
				features: {
					"code-mirror": true,
					"block-edit": true,
					"image-block": true,
					"link-tooltip": true,
					"list-item": true,
					cursor: true,
					latex: false,
					placeholder: true,
					table: true,
					toolbar: true,
				},
				featureConfigs: {
					"code-mirror": {
						theme: githubLight,
					},
				},
				defaultValue: api.handle.doc().text,
			})
			api.handle.on("change", () => {
				// const state = crepe.editor.ctx.get(editorStateCtx)
				crepe.editor.ctx.set(defaultValueCtx, api.handle.doc().text)
			})
			crepe.on(ctx => {
				ctx.markdownUpdated((_ctx, markdown) => {
					api.handle.change(doc => {
						updateText(doc, ["text"], markdown)
					})
				})
			})
			crepe.create().then(() => {
				// console.log("yay")
			})
		})

		api.onCleanup(() => {
			crepe.destroy()
		})

		return (<div ref={ref} />) as HTMLDivElement
	},
} satisfies View<MarkdownShape>
