import type {Doc, DocHandle} from "@automerge/vanillajs"
import {ContextMenu} from "@kobalte/core/context-menu"
import {createRoot, For, Match, Switch, type Accessor} from "solid-js"
import {createStore} from "solid-js/store"
import Icon from "../icons/icon.tsx"
import type {
	FileMenuAction,
	FileMenuChoice,
	FileMenuItem,
	FileMenuSubMenu,
} from ":/domain/file/file-menu.ts"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"

export const [fileMenu, updateFileMenu] = createRoot(() => {
	const [fileMenu, updateFileMenu] = createStore<FileMenuItem[]>([])
	return [fileMenu, updateFileMenu]
})

export function FileContextMenu(props: {
	items: FileMenuItem[]
	entry: Accessor<FileEntryDoc>
	file: Accessor<Doc<unknown>>
	fileHandle: DocHandle<unknown>
}) {
	const when = (
		fn?: (opts: {entry: FileEntryDoc; file: Doc<unknown>}) => boolean,
	) => (fn ? fn({entry: props.entry(), file: props.file()}) : true)

	return (
		<For each={props.items}>
			{fileAction => (
				<Switch>
					<Match
						when={fileAction.type == "action" && when(fileAction.when)}>
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() =>
								(fileAction as FileMenuAction).action!({
									fileHandle: props.fileHandle,
								})
							}>
							{(fileAction as FileMenuAction).label}
						</ContextMenu.Item>
					</Match>

					<Match when={fileAction.type == "sub" && when(fileAction.when)}>
						<ContextMenu.Sub overlap gutter={-10}>
							<ContextMenu.SubTrigger class="popmenu__sub-trigger">
								{(fileAction as FileMenuSubMenu).label}

								<div class="popmenu__item-right-slot">
									<Icon name="alt-arrow-right-linear" />
								</div>
							</ContextMenu.SubTrigger>

							<ContextMenu.Portal>
								<ContextMenu.SubContent class="popmenu__content popmenu__sub-content">
									<FileContextMenu
										items={(fileAction as FileMenuSubMenu).sub}
										entry={props.entry}
										file={props.file}
										fileHandle={props.fileHandle}
									/>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>
					</Match>

					<Match when={fileAction.type == "choice"}>
						<ContextMenu.RadioGroup
							value={(fileAction as FileMenuChoice).value({
								file: props.file(),
							})}
							onChange={value =>
								(fileAction as FileMenuChoice).action!({
									fileHandle: props.fileHandle,
									value,
								})
							}>
							<For each={(fileAction as FileMenuChoice).choices}>
								{choice => (
									<ContextMenu.RadioItem
										value={choice.value}
										class="popmenu__radio-item">
										<ContextMenu.ItemIndicator class="popmenu__item-indicator">
											<Icon name="check-square-bold" />
										</ContextMenu.ItemIndicator>
										{choice.label}
									</ContextMenu.RadioItem>
								)}
							</For>
						</ContextMenu.RadioGroup>
					</Match>
				</Switch>
			)}
		</For>
	)
}
