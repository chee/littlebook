import {View, MarkdownShape} from "@pointplace/types"
import {Crepe} from "@milkdown/crepe"
import {updateText} from "@automerge/automerge-repo"
import {defaultValueCtx} from "@milkdown/kit/core"
import css from "./crepe.css?raw"
import {githubLight} from "@uiw/codemirror-theme-github"

export default {
	id: "milkdown-crepe",
	displayName: "crepe",
	schema: MarkdownShape,
	category: "editor",
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
					table: false,
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
				crepe.editor.ctx.set(defaultValueCtx, api.handle.doc().text)
			})
			crepe.on(ctx => {
				ctx.markdownUpdated((_ctx, markdown) => {
					api.handle.change(doc => {
						updateText(doc, ["text"], markdown)
					})
				})
			})
			// crepe.create().then(({ctx}) => {
			// 	console.log("hello angels")
			// 	// ctx.set(rootCtx, ref)
			// 	const initialSchema = ctx.get(schemaCtx)
			// 	const state = ctx.get(editorStateCtx)
			// 	const adapter = new SchemaAdapter({
			// 		nodes: {
			// 			doc: initialSchema.nodes.doc.spec,
			// 			text: {
			// 				...initialSchema.nodes.text.spec,
			// 			},
			// 			paragraph: {
			// 				...initialSchema.nodes.paragraph.spec,
			// 				automerge: {
			// 					block: "paragraph",
			// 				},
			// 			},
			// 			blockquote: {
			// 				...initialSchema.nodes.blockquote.spec,
			// 				automerge: {
			// 					block: "blockquote",
			// 				},
			// 			},
			// 			ordered_list: {
			// 				...initialSchema.nodes.ordered_list.spec,
			// 				automerge: {
			// 					block: "ordered_list",
			// 				},
			// 			},
			// 			bullet_list: {
			// 				...initialSchema.nodes.bullet_list.spec,
			// 				automerge: {
			// 					block: "bullet_list",
			// 				},
			// 			},
			// 			heading: {
			// 				...initialSchema.nodes.heading.spec,
			// 				automerge: {
			// 					block: "heading",
			// 					attrParsers: {
			// 						fromAutomerge: block => ({level: block.attrs.level}),
			// 						fromProsemirror: node => ({level: node.attrs.level}),
			// 					},
			// 				},
			// 			},
			// 			hardbreak: {
			// 				...initialSchema.nodes.hardbreak.spec,
			// 				// automerge: {
			// 				// 	block: "heading",
			// 				// 	attrParsers: {
			// 				// 		fromAutomerge: block => ({level: block.attrs.level}),
			// 				// 		fromProsemirror: node => ({level: node.attrs.level}),
			// 				// 	},
			// 				// },
			// 			},
			// 			list_item: {
			// 				...initialSchema.nodes.list_item.spec,
			// 				automerge: {
			// 					within: {
			// 						ordered_list: "ordered-list-item",
			// 						bullet_list: "unordered-list-item",
			// 					},
			// 				},
			// 			},
			// 			image: {
			// 				automerge: {
			// 					block: "image",
			// 					isEmbed: true,
			// 				},
			// 			},
			// 			unknown: {
			// 				automerge: {
			// 					unknownBlock: true,
			// 				},
			// 			},
			// 		},
			// 		marks: {
			// 			emphasis: {
			// 				...initialSchema.marks.emphasis,
			// 				markName: "emphasis",
			// 			},
			// 			strong: {
			// 				...initialSchema.marks.strong,
			// 				markName: "strong",
			// 			},
			// 			inlineCode: {
			// 				...initialSchema.marks.inlineCode,
			// 				// markName:
			// 			},
			// 			strike_through: {
			// 				...initialSchema.marks.strike_through,
			// 			},
			// 			link: {
			// 				...initialSchema.marks.link,
			// 				markName: "link",
			// 				parsers: {
			// 					fromAutomerge: (mark: MarkValue) => {
			// 						if (typeof mark === "string") {
			// 							try {
			// 								const value = JSON.parse(mark)
			// 								return {
			// 									href: value.href || "",
			// 									title: value.title || "",
			// 								}
			// 							} catch (e) {
			// 								console.warn(
			// 									"failed to parse link mark as JSON"
			// 								)
			// 							}
			// 						}
			// 						return {
			// 							href: "",
			// 							title: "",
			// 						}
			// 					},
			// 					fromProsemirror: (mark: Mark) =>
			// 						JSON.stringify({
			// 							href: mark.attrs.href,
			// 							title: mark.attrs.title,
			// 						}),
			// 				},
			// 			},
			// 		},
			// 	})
			// 	const AutomergeProsemirror = init(api.handle, ["text"], {
			// 		schemaAdapter: adapter,
			// 	})
			// 	ctx.set(schemaCtx, AutomergeProsemirror.schema)
			// 	ctx.inject(prosePluginsCtx, [AutomergeProsemirror.plugin])
			// 	ctx.update(editorStateCtx, state => {
			// 		state.doc = AutomergeProsemirror.pmDoc
			// 		return state
			// 	})
			// 	ctx.update(prosePluginsCtx, xs => [
			// 		AutomergeProsemirror.plugin,
			// 		...xs,
			// 	])
			// })
		})

		api.onCleanup(() => {
			crepe.destroy()
		})

		return (<div ref={ref} />) as HTMLDivElement
	},
} satisfies View<MarkdownShape>
