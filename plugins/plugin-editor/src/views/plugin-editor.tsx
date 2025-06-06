import type {
	FileEditor,
	FileEditorAPI,
	ViewID,
} from "@littlebook/plugin-api/types/view.ts"
import {LittlebookPluginShape} from "../shapes/shapes.ts"
import * as Comlink from "comlink"
import type {PluginEditorWorker} from "../worker/worker.ts"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import type {Prop} from "@automerge/vanillajs"
import {createEffect, createSignal} from "solid-js"
import Chrome from "../chrome/chrome.tsx"

const workerProgram = new Worker(
	new URL("../worker/worker.ts", import.meta.url),
	{type: "module"}
)

const worker = Comlink.wrap(workerProgram) as PluginEditorWorker
const tsWorker = worker.tsWorker as unknown as WorkerShape
await tsWorker.initialize()

async function compile(props: FileEditorAPI<LittlebookPluginShape>) {
	window.littlebook.registerPlugin(props.handle.url)
}

export default {
	id: "plugin-editor" as ViewID,
	displayName: "Plugin Editor",
	category: "editor",
	schema: LittlebookPluginShape,
	styles: [
		import("./plugin-editor.css?inline"),
		import("../chrome/chrome.css?inline"),
	],
	render(api) {
		const [path, setPath] = createSignal<Prop[]>(["entry.tsx"])

		createEffect(() => {
			const d = api.handle.doc()
			d.src
		})

		api.registerKeybinding("cmd+s", event => {
			event.preventDefault()
			compile(api)
		})
		return (
			<Chrome
				{...api}
				path={path()}
				setPath={setPath}
				worker={worker}
				tsWorker={tsWorker}
				compile={() => compile(api)}
			/>
		) as HTMLElement
	},
} satisfies FileEditor<LittlebookPluginShape>

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"plugin-editor": any
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"plugin-editor": HTMLElement
	}
}
