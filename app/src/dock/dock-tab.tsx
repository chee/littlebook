import Icon from "../components/icon/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import repo from "../repo/create.ts"
import type {AutomergeUrl} from "@automerge/automerge-repo"
import {createDocumentStore, useHandle} from "automerge-repo-solid-primitives"
import {Button} from "@kobalte/core/button"
import {createEffect, Show, Suspense} from "solid-js"
import {useHome} from "../repo/home.ts"
import {useDockAPI} from "./dock.tsx"
import type {Entry} from "../documents/entry.ts"

// todo add to context menu:
/*
	- Open with
	- Export
		- Publish
		- File
*/

export default function DockTab(props: {id: AutomergeUrl}) {
	const dockAPI = useDockAPI()
	const handle = useHandle<Entry>(() => props.id, {repo})
	const doc = createDocumentStore(handle)
	const [home, homeHandle] = useHome()
	let element: HTMLDivElement
	createEffect(() => {
		if (!dockAPI) return
		if (dockAPI.activePanelID == props.id) element.scrollIntoView()
	})

	const fileHandle = useHandle(() => doc()?.url, {repo})
	const file = createDocumentStore(fileHandle)

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={element}>
						<div class="dock-tab__icon">
							<Icon
								icon={doc()?.icon ?? "solar:document-text-bold"}
								inline
							/>
						</div>
						<div class="dock-tab__name">{doc()?.name}</div>
						<Button
							class="dock-tab__close"
							aria-label={`close panel ${doc()?.name}`}
							onmousedown={event => {
								event.stopImmediatePropagation()
								event.stopPropagation()
								event.preventDefault()
							}}
							onclick={() => {
								dockAPI.closePanel(props.id)
							}}>
							<Icon icon="solar:close-square-linear" inline />
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="pop-menu__content">
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => dockAPI.closePanel(props.id)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs) {
									if (id != props.id) dockAPI.closePanel(id)
								}
							}}>
							close other tabs
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => navigator.clipboard.writeText(props.id)}>
							copy url
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<Show when={!home()?.files.includes(props.id)}>
							<ContextMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									homeHandle()?.change(home => {
										if (!home.files.includes(props.id)) {
											home.files.push(props.id)
										}
									})
								}}>
								add to sidebar
							</ContextMenu.Item>
						</Show>
						{/* todo this doesn't belong here */}
						<Show when={doc()?.contentType == "text"}>
							<ContextMenu.Sub>
								<ContextMenu.SubTrigger class="pop-menu__sub-trigger">
									set language
									<div class="pop-menu__item-right-slot">
										<Icon icon="solar:alt-arrow-right-linear" />
									</div>
								</ContextMenu.SubTrigger>
								<ContextMenu.Portal>
									<ContextMenu.SubContent class="pop-menu__content pop-menu__sub-content">
										<ContextMenu.RadioGroup
											value={file()?.language}
											onChange={language => {
												fileHandle().change(file => {
													file.language = language
												})
											}}>
											<ContextMenu.RadioItem
												class="pop-menu__radio-item"
												value="">
												<ContextMenu.ItemIndicator class="pop-menu__item-indicator">
													<Icon icon="solar:check-square-bold" />
												</ContextMenu.ItemIndicator>
												plain
											</ContextMenu.RadioItem>
											<ContextMenu.RadioItem
												class="pop-menu__radio-item"
												value="javascript">
												<ContextMenu.ItemIndicator class="pop-menu__item-indicator">
													<Icon icon="solar:check-square-bold" />
												</ContextMenu.ItemIndicator>
												javascript
											</ContextMenu.RadioItem>
											<ContextMenu.RadioItem
												class="pop-menu__radio-item"
												value="python">
												<ContextMenu.ItemIndicator class="pop-menu__item-indicator">
													<Icon icon="solar:check-square-bold" />
												</ContextMenu.ItemIndicator>
												python
											</ContextMenu.RadioItem>
										</ContextMenu.RadioGroup>
									</ContextMenu.SubContent>
								</ContextMenu.Portal>
							</ContextMenu.Sub>
						</Show>
						<Show
							when={
								doc()?.contentType == "text" &&
								file()?.language == "javascript"
							}>
							<ContextMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									compile(file()?.text).then(code => {
										const bytes = new TextEncoder().encode(code)
										const blob = new Blob([bytes], {
											type: "application/javascript",
										})
										const blobURL = URL.createObjectURL(blob)
										import(blobURL).then(mod => {
											const {render, ...editor} = {...mod}
											delete editor.render
											editor.bytes = bytes
											editor.type = "editor"
											console.log(editor)
											const url = repo.create(editor).url
											homeHandle().change(home => {
												if (!home.editors.includes(url))
													home.editors.push(url)
											})
										})
									})
								}}>
								compile to editor
							</ContextMenu.Item>
						</Show>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}

import esbuild from "esbuild-wasm"
import type {importEditorFromAutomerge} from "../registries/editor-registry.ts"
const wasm = await import("esbuild-wasm/esbuild.wasm?url")

await esbuild.initialize({
	wasmURL: wasm.default,
})

async function compile(text: string) {
	const result = await esbuild.transform(text, {
		loader: "ts",
		target: "esnext",
	})
	return result.code
}
