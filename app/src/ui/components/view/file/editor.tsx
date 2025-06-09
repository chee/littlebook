import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
import {type DocHandle} from "@automerge/vanillajs"
import type {AutomergeFileEditor} from "@littlebook/plugin-api/types/view.ts"
import {
	getOwner,
	onCleanup,
	onMount,
	runWithOwner,
	type Accessor,
} from "solid-js"
import {Dynamic} from "solid-js/web"

export default function EditorFileview<T>(props: {
	view: AutomergeFileEditor<T>
	fileHandle: DocHandle<T>
	entryHandle: DocHandle<FileEntryDoc>

	isActive: boolean
	shadow: Accessor<ShadowRoot>
}) {
	const owner = getOwner()
	const dom = (
		<Dynamic
			component={props.view.render}
			handle={props.fileHandle}
			// todo completely crazy to have this here
			onMount={(fn: () => void) => onMount(fn)}
			onCleanup={fn => runWithOwner(owner, () => onCleanup(fn))}
			registerKeybinding={(
				key: string,
				action: (event: KeyboardEvent) => void,
			) => onCleanup(useHotkeys(key, action))}
			isActive={() => !!props.isActive}
			shadow={props.shadow()}
		/>
	) as ReturnType<typeof props.view.render>

	return dom
}
