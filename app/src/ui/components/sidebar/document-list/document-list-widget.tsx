import {createEffect, createSignal, Show} from "solid-js"
import "./document-list.css"
import DocumentList from "./document-list.tsx"
import {
	asAutomergeURL,
	isValidAutomergeURL,
	type AutomergeURL,
} from ":/core/sync/url.ts"
import {createFileEntry, type FileContentURL} from ":/docs/file-entry-doc.ts"
import type {AreaDoc} from ":/docs/area-doc.ts"
import {IconPicker} from ":/ui/components/emoji-picker/emoji-picker.tsx"
import type {DocHandle} from "@automerge/automerge-repo"
import {makeDocumentProjection} from "solid-automerge"
import Icon from ":/ui/components/icons/icon.tsx"
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import usePerfectRepo from ":/lib/sync/useRepo.ts"
import type {FolderShape} from "@littlebook/plugin-api/shapes/shapes.ts"
import reparent from ":/domain/reparent.ts"
import {ContextMenu} from "@kobalte/core/context-menu"
import {useHomeHandle, useUserContext} from ":/domain/user/user.ts"

export default function DocumentListWidget(props: {
	handle: DocHandle<AreaDoc>
}) {
	const area = () =>
		props.handle && makeDocumentProjection<AreaDoc>(props.handle)
	const [user, userHandle] = useUserContext()
	const homeHandle = useHomeHandle()

	const [expanded, setExpanded] = createSignal<boolean | undefined>()

	createEffect(() => {
		let stored = localStorage.getItem(
			`littlebook:${props.handle?.url}:expanded`,
		)

		if (props.handle?.url && stored && JSON.parse(stored) != expanded()) {
			if (expanded() == null) {
				setExpanded(JSON.parse(stored) as boolean)
			} else {
				localStorage.setItem(
					`littlebook:${props.handle?.url}:expanded`,
					String(expanded()),
				)
			}
		}
	})

	return (
		<div
			data-area={area()?.name}
			data-url={props.handle?.url}
			class="sidebar-widget">
			<header
				class="sidebar-widget__header"
				ref={element => {
					dropTargetForElements({
						element,
						onDragEnter() {
							element.dataset.droptarget = "true"
						},
						onDragLeave() {
							delete element.dataset.droptarget
						},
						// todo extract to a dropFileOnFolder functions
						async onDrop(event) {
							delete element.dataset.droptarget
							element.dataset.droptarget = "false"
							const repo = usePerfectRepo()
							const lastParentHandle = await repo.find<FolderShape>(
								event.source.data.parentURL as AutomergeURL,
							)
							if (isValidAutomergeURL(event.source.data.url)) {
								const url = asAutomergeURL(event.source.data.url)
								reparent(url, lastParentHandle, props.handle)
							}
						},
					})
				}}>
				<div class="sidebar-widget__header-icon">
					<IconPicker
						handle={props.handle}
						fallback="🏡"
						modifiers="area-title page-title"
					/>
				</div>
				<span class="sidebar-widget__header-title">
					<Show
						when={props.handle?.url != user()?.home}
						fallback={area()?.name}>
						<ContextMenu>
							<ContextMenu.Trigger class="popmenu__trigger">
								{area()?.name}
							</ContextMenu.Trigger>
							<ContextMenu.Portal>
								<ContextMenu.Content class="popmenu">
									<ContextMenu.Item
										class="popmenu__item"
										onSelect={() => {
											userHandle()?.change(doc => {
												const index = doc.areas.findIndex(
													url => url == props.handle?.url,
												)
												if (index !== -1) {
													doc.areas.splice(index, 1)
												}
											})
											homeHandle()?.change(doc => {
												doc.files.push(
													createFileEntry({
														icon: area()?.icon,
														name: area()?.name,
														url: props.handle
															.url as FileContentURL,
													}),
												)
											})
										}}>
										Unpin
									</ContextMenu.Item>
									<ContextMenu.Item
										class="popmenu__item"
										onSelect={() => {
											// todo this should all be in the model
											const name = window.prompt(
												"Rename area",
												area()?.name,
											)
											if (name) {
												props.handle.change(doc => {
													doc.name = name
												})
											}
										}}>
										Rename
									</ContextMenu.Item>
									<ContextMenu.Item class="popmenu__item">
										Delete
									</ContextMenu.Item>
								</ContextMenu.Content>
							</ContextMenu.Portal>
						</ContextMenu>
					</Show>
				</span>
				<div class="sidebar-widget__header-actions">
					<button
						class="document-list-item__expander"
						onClick={event => {
							event.stopPropagation()
							setExpanded(ex => !ex)
						}}>
						<Show
							when={expanded()}
							fallback={<Icon name="alt-arrow-right-bold" />}>
							<Icon name="alt-arrow-down-bold" />
						</Show>
					</button>
				</div>
			</header>
			<div class="sidebar-widget__content">
				<Show when={expanded() && area()?.files} fallback="">
					<div role="tree">
						<DocumentList
							urls={area()!.files}
							depth={0}
							parent={props.handle}
						/>
					</div>
				</Show>
			</div>
		</div>
	)
}
