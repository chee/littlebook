import type {CreateSource} from "@littlebook/plugin-api/types/source.ts"
import type PluginAPI from "@littlebook/plugin-api"
import view from "./src/views/plugin-editor.tsx"
import dedent from "dedent"
import type {LittlebookPluginShape} from "./src/shapes/shapes.ts"

// todo make this a working plugin with good types
const defaultPluginSrc = {
	views: {
		"counter.tsx": dedent`
			export default function Counter(props: {
				count: number,
				setCount(count: number): void,
			}) {
				return (
					<div>
						<p>Count: {props.count}</p>
						<button onClick={() => props.setCount(props.count + 1)}>
							Increment
						</button>
						<button onClick={() => props.setCount(props.count - 1)}>
							Decrement
						</button>
						<button onClick={() => props.setCount(0)}>Reset</button>
					</div>
				)
			}
		`,
	},
	shapes: {
		"count.ts": dedent`
			import * as v from "valibot"
			export const CountShape = v.object({
				count: v.number(),
			})
			export type CountShape = v.infer<typeof CountShape>
		`,
	},
	"entry.tsx": dedent`
		import {makeDocumentProjection} from "solid-automerge"
		import Counter from "./views/counter.tsx"
		import {CountShape} from "./shapes/count.ts"
		window.littlebook.registerView({
			id: "counter",
			displayName: "Counter",
			category: "editor",
			icon: "🔢",
			render(api) {
				const doc = makeDocumentProjection<CountShape>(api.handle)
				const count = () => doc.count
				const setCount = (count: number) => {
					api.handle.change(d => {
						d.count = count
					})
				}
				return <Counter count={count} setCount={setCount} />
			}
		})
	`,
}

const createPlugin: CreateSource<LittlebookPluginShape> = {
	id: "create-plugin",
	category: "new",
	displayName: "Plugin",
	new() {
		return {
			name: "untitled plugin",
			icon: "🔌",
			content: {
				type: "plugin",
				meta: {},
				src: {...defaultPluginSrc},
			},
		}
	},
}

export default function activeCodeMirrorPluginEditor(api: PluginAPI) {
	api.registerView(view)
	api.registerSource(createPlugin)
}
