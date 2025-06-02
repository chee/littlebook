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
	// // todo should live elsewhere
	// const output = await worker.compile(props.handle.url)
	// if (output.errors.length) {
	// 	props.toast.show("couldn't compile", {
	// 		body: (
	// 			<pre style={{"user-select": "text"}}>
	// 				{output.errors.join("\n")}
	// 			</pre>
	// 		),
	// 		modifiers: "ohno danger bad",
	// 	})
	// 	return
	// }
	// // todo maybe we stick all this in a doc as immutable strings?
	// // hmm
	// for (const file of output.outputFiles ?? []) {
	// 	if (file.path.endsWith(".css")) {
	// 	} else if (file.path.endsWith(".js")) {
	// 		const blob = new Blob([file.contents], {
	// 			type: "application/javascript",
	// 		})
	// 		const url = URL.createObjectURL(blob)
	// 		import(/* @vite-ignore */ url)
	// 	} else {
	// 		props.toast.show("warning: unknown file kind", {
	// 			body: (
	// 				<pre>
	// 					{file.path} is not a .js or .css file, so i don't know what to
	// 					do i'm so sorry
	// 				</pre>
	// 			),
	// 			modifiers: "warning warn uhoh",
	// 		})
	// 	}
	// }
	// props.toast.show("compiled", {modifiers: "yay good done"})
}

export default {
	id: "plugin-editor" as ViewID,
	displayName: "Plugin Editor",
	category: "editor",
	schema: LittlebookPluginShape,
	render(api) {
		api.adoptStyles(
			import("./plugin-editor.css?inline"),
			import("../chrome/chrome.css?inline")
		)
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
				setMeta={() => {
					// todo lol
					const key = window.prompt("key")
					const val = key && window.prompt(`value for ${key}`)
					if (val) {
						api.handle.change(doc => {
							doc.meta[key] = val
						})
					}
				}}
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
