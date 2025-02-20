import Icon from "../components/icons/icon.tsx"
import {ContextMenu} from "@kobalte/core/context-menu"
import type {Doc} from "@automerge/automerge-repo"
import {Button} from "@kobalte/core/button"
import {
	createEffect,
	createMemo,
	For,
	getOwner,
	runWithOwner,
	Show,
	Suspense,
	type Accessor,
} from "solid-js"
import {useHome} from "../repo/home.ts"
import {useDockAPI} from "./dock.tsx"
import {useDocument} from "solid-automerge"
import {usePerfectView} from "../components/file-viewer/usePerfectView.tsx"
import {Tooltip} from "@kobalte/core/tooltip"
import OpenWithContextMenu from "./open-with.tsx"
import {
	asAutomergeURL,
	parseDocumentURL,
	type DocumentURL,
	type Entry,
} from "@pointplace/types"
import {FileContextMenu} from "../components/file-viewer/filemenu.tsx"
import {useSinkRegistry} from "../registries/sink-registry.ts"

export default function DockTab(props: {url: DocumentURL}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const dockAPI = useDockAPI()
	const [entry] = useDocument<Entry>(() => docinfo().url)

	const editor = usePerfectView(() => props.url)
	const [home, changeHome] = useHome()
	let tabElement!: HTMLDivElement

	createEffect(() => {
		if (!dockAPI) return
		if (dockAPI.activePanelID == props.url) {
			tabElement.scrollIntoView()
		}
	})

	const [file, fileHandle] = useDocument<unknown>(() => entry()?.url)

	const editorDisplayName = () => editor()?.displayName

	const editorID = () => editor()?.id

	const owner = getOwner()
	const openDocument = (
		url: DocumentURL,
		opts?: {side?: string; component?: string}
	) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))

	const fileMenu = () => editor()?.getFileMenu?.()

	const publisherRegistry = useSinkRegistry()

	const publishers = () => {
		if (file()) {
			return Object.groupBy(
				publisherRegistry.sinks(file()!),
				x => x.category ?? "other"
			)
		}
		return {}
	}

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={tabElement}>
						<div class="dock-tab__icon">
							<Tooltip openDelay={0} closeDelay={0}>
								<Tooltip.Trigger class="dock-tab__editor-icon">
									<Icon
										name={entry()?.icon || "document-text-bold"}
										inline
									/>
								</Tooltip.Trigger>

								<Tooltip.Portal>
									<Tooltip.Content class="dock-tab__editor-tooltip">
										<Tooltip.Arrow />
										{editorDisplayName()}
									</Tooltip.Content>
								</Tooltip.Portal>
							</Tooltip>
						</div>

						<div class="dock-tab__name">{entry()?.name}</div>
						<Button
							class="dock-tab__close"
							aria-label={`close panel ${entry()?.name}`}
							onmousedown={(event: MouseEvent) => {
								event.stopImmediatePropagation()
								event.stopPropagation()
								event.preventDefault()
							}}
							onclick={() => {
								dockAPI.closePanel(props.url)
							}}>
							<Icon name="close-square-linear" inline />
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="pop-menu__content">
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => dockAPI.closePanel(props.url)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs) {
									if (id != props.url) dockAPI.closePanel(id)
								}
							}}>
							close other tabs
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="pop-menu__item"
							onSelect={() => navigator.clipboard.writeText(props.url)}>
							copy url
						</ContextMenu.Item>
						<Show
							when={
								entry() && file() && Object.keys(publishers()).length
							}>
							<For each={Object.entries(publishers())}>
								{([category, publishers]) => {
									if (category == "other") {
										return (
											<For each={publishers}>
												{publisher => {
													return (
														<ContextMenu.Item
															class="pop-menu__item"
															onSelect={() => {
																publisher.publish({
																	entry: entry()!,
																	handle: fileHandle()!,
																})
															}}>
															{publisher.displayName}
														</ContextMenu.Item>
													)
												}}
											</For>
										)
									} else {
										return (
											<ContextMenu.Sub overlap gutter={-10}>
												<ContextMenu.SubTrigger class="pop-menu__sub-trigger">
													{category}
													<div class="pop-menu__item-right-slot">
														<Icon name="alt-arrow-right-linear" />
													</div>
												</ContextMenu.SubTrigger>
												<ContextMenu.Portal>
													<ContextMenu.SubContent class="pop-menu__content pop-menu__sub-content">
														<For each={publishers}>
															{publisher => {
																return (
																	<ContextMenu.Item
																		class="pop-menu__item"
																		onSelect={() => {
																			publisher.publish({
																				entry: entry()!,
																				handle:
																					fileHandle()!,
																			})
																		}}>
																		{publisher.displayName}
																	</ContextMenu.Item>
																)
															}}
														</For>
													</ContextMenu.SubContent>
												</ContextMenu.Portal>
											</ContextMenu.Sub>
										)
									}
								}}
							</For>
						</Show>
						<Show when={!home()?.files.includes(docinfo().url)}>
							<ContextMenu.Item
								class="pop-menu__item"
								onSelect={() => {
									// eslint-disable-next-line solid/reactivity
									changeHome(home => {
										if (!home.files.includes(docinfo().url)) {
											home.files.push(docinfo().url)
										}
									})
								}}>
								add to sidebar
							</ContextMenu.Item>
						</Show>
						<OpenWithContextMenu
							url={asAutomergeURL(props.url)}
							currentEditorID={editorID()}
							openDocument={(url, opts) => openDocument(url, opts)}
						/>
						<Show when={entry() && file() && fileMenu()?.length}>
							<ContextMenu.Separator class="pop-menu__separator" />
							<FileContextMenu
								items={fileMenu()!}
								entry={entry as Accessor<Entry>}
								file={file as Accessor<Doc<unknown>>}
								fileHandle={fileHandle()!}
							/>
						</Show>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu>
		</Suspense>
	) as HTMLElement
}
