import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"
import {toast} from ":/ui/components/toast/toast.tsx"
import type {ShadowsChildrenProps} from ":/ui/components/view/shadow.tsx"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
import {updateText, type DocHandle} from "@automerge/vanillajs"
import type {FileEditor} from "@littlebook/plugin-api/types/view.ts"
import {getOwner, onCleanup, onMount, runWithOwner} from "solid-js"
import type {SetStoreFunction} from "solid-js/store"
import {Dynamic} from "solid-js/web"

export default function EditorFileview<T>(
	props: {
		view: FileEditor<T>
		fileHandle: DocHandle<T>
		entryHandle: DocHandle<FileEntryDoc>
		updateStatusItems: SetStoreFunction<string[]>
		isActive: boolean
	} & ShadowsChildrenProps,
) {
	const owner = getOwner()
	const dom = (
		<Dynamic
			component={props.view.render}
			handle={props.fileHandle}
			// todo completely crazy to have this here
			updateName={(name: string) =>
				props.entryHandle.change(entry => updateText(entry, ["name"], name))
			}
			updateStatusItems={props.updateStatusItems}
			onMount={(fn: () => void) => onMount(fn)}
			onCleanup={fn => runWithOwner(owner, () => onCleanup(fn))}
			registerKeybinding={(
				key: string,
				action: (event: KeyboardEvent) => void,
			) => onCleanup(useHotkeys(key, action))}
			toast={toast}
			isActive={() => !!props.isActive}
			shadow={props.shadow()}
			adoptStyles={props.adoptStyles}
		/>
	) as ReturnType<typeof props.view.render>

	return dom
}
