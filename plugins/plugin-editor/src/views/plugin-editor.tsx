import "./plugin-editor.css"
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
import {createSignal, Suspense} from "solid-js"
import Chrome from "../chrome/chrome.tsx"
import {MemoryRouter, createMemoryHistory, A, Route} from "@solidjs/router"

// todo can i have a worker per plugin? do i even want that?
// todo maybe i even want opposite+? a SharedWorker?

const workerProgram = new Worker(
	new URL("../worker/worker.ts", import.meta.url),
	{type: "module"}
)
const worker = Comlink.wrap(workerProgram) as PluginEditorWorker
const tsWorker = worker.tsWorker as unknown as WorkerShape
await tsWorker.initialize()

async function compile(props: FileEditorAPI<LittlebookPluginShape>) {
	// todo should live elsewhere
	const output = await worker.compile(props.handle.url)
	if (output.errors.length) {
		props.toast.show("couldn't compile", {
			body: (
				<pre style={{"user-select": "text"}}>
					{output.errors.join("\n")}
				</pre>
			),
			modifiers: "ohno danger bad",
		})
		return
	}
	// todo maybe we stick all this in a doc as immutable strings?
	for (const file of output.outputFiles ?? []) {
		if (file.path.endsWith(".css")) {
			const sheet = new CSSStyleSheet()
			sheet.replaceSync(file.text)
			document.adoptedStyleSheets ??= []
			document.adoptedStyleSheets.push(sheet)
		} else if (file.path.endsWith(".js")) {
			const blob = new Blob([file.contents], {
				type: "application/javascript",
			})
			const url = URL.createObjectURL(blob)
			import(/* @vite-ignore */ url)
		} else {
			props.toast.show("warning: unknown file kind", {
				body: (
					<pre>
						{file.path} is not a .js or .css file, so it will not be used.
					</pre>
				),
				modifiers: "warning warn uhoh",
			})
		}
	}
	props.toast.show("compiled", {
		modifiers: "yay good done",
	})
}

export default {
	id: "plugin-editor" as ViewID,
	displayName: "Plugin Editor",
	category: "editor",
	schema: LittlebookPluginShape,
	render(api) {
		const [path, setPath] = createSignal<Prop[]>(["entry.tsx"])

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
