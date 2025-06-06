import {autocompletion} from "@codemirror/autocomplete"
import {
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	highlightTrailingWhitespace,
	keymap,
	lineNumbers,
	rectangularSelection,
} from "@codemirror/view"
import {
	search,
	searchKeymap,
	highlightSelectionMatches,
} from "@codemirror/search"
import {automergeSyncPlugin} from "@automerge/automerge-codemirror"
import {lycheeHighlightStyle, lycheeTheme} from "../../themes/lychee.ts"
import {indentUnit, syntaxHighlighting} from "@codemirror/language"
import {indentWithTab, emacsStyleKeymap} from "@codemirror/commands"
import {minimalSetup} from "codemirror"
import type {DocHandle} from "@automerge/vanillajs"
import {EditorState, type Extension} from "@codemirror/state"
import {mod, modshift} from "../../util/modshift.ts"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import {
	getTypescriptEnvPath,
	getFileContent,
	type LBPSrcFilePath,
} from "../../util/path.ts"
import type {PluginEditorWorker} from "../../worker/worker.ts"

export interface BaseEditorOpts {
	parent: HTMLElement
	handle: DocHandle<LittlebookPluginShape>
	path: LBPSrcFilePath
	extensions?: Extension[]
	tsWorker: WorkerShape
	worker: PluginEditorWorker
	shadow: ShadowRoot
}

export function createBaseEditor(opts: BaseEditorOpts): EditorView {
	const content = getFileContent({
		handle: opts.handle,
		path: opts.path,
	})
	const path = getTypescriptEnvPath(opts)
	opts.tsWorker.updateFile({
		path,
		code: content ?? "",
	})
	opts.worker.ata(content ?? "", path)
	return new EditorView({
		root: opts.shadow,
		doc: getFileContent(opts),
		extensions: [
			minimalSetup,
			automergeSyncPlugin(opts),
			indentUnit.of("\t"),
			search(),
			highlightSpecialChars(),
			// highlightWhitespace(),
			highlightTrailingWhitespace(),
			highlightActiveLineGutter(),
			highlightActiveLine(),
			highlightSelectionMatches(),
			autocompletion(),
			EditorView.lineWrapping,
			lycheeTheme,
			syntaxHighlighting(lycheeHighlightStyle),
			lineNumbers(),

			keymap.of([indentWithTab, ...emacsStyleKeymap, ...searchKeymap]),
			EditorState.allowMultipleSelections.of(true),
			EditorState.tabSize.of(2),
			EditorView.clickAddsSelectionRange.of(event => {
				const mask = modshift(event)
				if (mask == 1 << mod.option) return true
				return false
			}),
			rectangularSelection({
				eventFilter(event) {
					const mask = modshift(event)
					if (mask == ((1 << mod.shift) | (1 << mod.option))) return true
					return false
				},
			}),
			...(opts.extensions ?? []),
		],
		parent: opts.parent,
	})
}
