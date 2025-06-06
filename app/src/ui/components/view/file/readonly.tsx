import {toast} from ":/ui/components/toast/toast.tsx"
import {useHotkeys} from ":/ui/lib/useHotkeys.ts"
import type {DocHandle} from "@automerge/automerge-repo"
import type {FileViewer} from "@littlebook/plugin-api/types/view.ts"
import {
	createEffect,
	getOwner,
	onCleanup,
	onMount,
	runWithOwner,
	type Accessor,
} from "solid-js"
import type {SetStoreFunction} from "solid-js/store"
import {Dynamic} from "solid-js/web"

export default function ReadonlyFileview<T>(props: {
	view: FileViewer<T>
	fileHandle: DocHandle<T>
	isActive: boolean
	updateStatusItems: SetStoreFunction<string[]>
	shadow: Accessor<ShadowRoot>
}) {
	const subs = new Set<() => void>()
	function change() {
		for (const sub of subs) {
			sub()
		}
	}

	createEffect(() => {
		props.fileHandle.on("change", change)
		onCleanup(() => {
			subs.clear()
			props.fileHandle.off("change", change)
		})
	})

	const owner = getOwner()

	return (
		<Dynamic
			component={props.view.render}
			doc={() => props.fileHandle.doc()}
			isActive={() => !!props.isActive}
			registerKeybinding={(key, action) =>
				onCleanup(useHotkeys(key, action))
			}
			updateStatusItems={props.updateStatusItems}
			onChange={fn => subs.add(fn)}
			onMount={onMount}
			onCleanup={fn => runWithOwner(owner, () => onCleanup(fn))}
			toast={toast}
			shadow={props.shadow()}
		/>
	) as ReturnType<typeof props.view.render>
}
