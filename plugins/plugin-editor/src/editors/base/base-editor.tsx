import "./base-editor.css"
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
import type {DocHandle, Prop} from "@automerge/vanillajs"
import {EditorState, type Extension} from "@codemirror/state"
import {mod, modshift} from "../../util/modshift.ts"
import type {LittlebookPluginShape} from "../../shapes/shapes.ts"
import type {WorkerShape} from "@valtown/codemirror-ts/worker"
import {
	getTypescriptEnvPath,
	getFileContent,
	type LBPSrcFilePath,
} from "../../util/path.ts"

export function createBaseEditor(opts: {
	parent: HTMLElement
	handle: DocHandle<LittlebookPluginShape>
	path: LBPSrcFilePath
	extensions?: Extension[]
	tsWorker: WorkerShape
}) {
	const content = getFileContent({
		handle: opts.handle,
		path: opts.path,
	})
	opts.tsWorker.updateFile({
		path: getTypescriptEnvPath(opts),
		code: content ?? "",
	})
	return new EditorView({
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
