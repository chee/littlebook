import {css, cssCompletionSource, cssLanguage} from "@codemirror/lang-css"
import {colorPicker} from "@replit/codemirror-css-color-picker"
import {createBaseEditor} from "../base/base-editor.tsx"
import type {DocHandle, Prop} from "@automerge/vanillajs"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import {type LBPSrcFilePath} from "../../util/path.ts"
import type {PluginEditorWorker} from "../../worker/worker.ts"

export default function createStyleEditor(opts: {
	parent: HTMLElement
	handle: DocHandle<LittlebookPluginShape>
	path: LBPSrcFilePath
	tsWorker: WorkerShape
	worker: PluginEditorWorker
}) {
	const baseEditor = createBaseEditor({
		...opts,
		extensions: [
			css(),
			cssLanguage.data.of({
				autocomplete: cssCompletionSource,
			}),
			colorPicker,
		],
	})
	return baseEditor
}
