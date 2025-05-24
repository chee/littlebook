import {ContextMenu} from "@kobalte/core/context-menu"
import type {Doc} from "@automerge/vanillajs"
import {Button} from "@kobalte/core/button"
import {
	createEffect,
	createMemo,
	getOwner,
	runWithOwner,
	Show,
	Suspense,
	type Accessor,
} from "solid-js"
import {useDockAPI} from "../dock.tsx"
import {useDocument} from "solid-automerge"
import OpenWithContextMenu from "../open-with.tsx"
import {FileContextMenu} from "../../components/file-viewer/filemenu.tsx"
import {
	asAutomergeURL,
	parseDocumentURL,
	type DocumentURL,
} from ":/core/sync/url.ts"
import {usePerfectView} from ":/ui/components/file-viewer/usePerfectView.tsx"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"

export default function DocumentDockTab(props: {url: DocumentURL}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url as DocumentURL))
	const dockAPI = useDockAPI()
	// todo obviously useFile(() => docinfo().url)
	const [entry] = useDocument<FileEntryDoc>(() => docinfo().url)

	const editor = usePerfectView(() => props.url)

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
		opts?: {side?: string; component?: string},
	) => runWithOwner(owner, () => dockAPI.openDocument(url, opts))

	const fileMenu = () => {
		const v = editor()
		if (v && "getFileMenu" in v) {
			return v.getFileMenu?.()
		}
	}

	// const publisherRegistry = useSinkRegistry()
	// const publishers = () => {
	// 	if (file()) {
	// 		return Object.groupBy(
	// 			publisherRegistry.sinks(file()!),
	// 			x => x.category ?? "other",
	// 		)
	// 	}
	// 	return {}
	// }

	return (
		<Suspense>
			<ContextMenu>
				<ContextMenu.Trigger class="dock-tab__context-menu-trigger">
					<div class="dock-tab" ref={tabElement}>
						<div class="dock-tab__icon">{entry()?.icon ?? "📄"}</div>

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
							<svg
								class="x"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
								<path d="M18 6L6 18" />
								<path d="M6 6l12 12" />
							</svg>
						</Button>
					</div>
				</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content class="popmenu__content">
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() => dockAPI.closePanel(props.url)}>
							close tab
						</ContextMenu.Item>
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() => {
								for (const id of dockAPI.panelIDs) {
									if (id != props.url) dockAPI.closePanel(id)
								}
							}}>
							close other tabs
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item
							class="popmenu__item"
							onSelect={() => navigator.clipboard.writeText(props.url)}>
							copy url
						</ContextMenu.Item>
						{/* <Show
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
															class="popmenu__item"
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
												<ContextMenu.SubTrigger class="popmenu__sub-trigger">
													publish to {category}
													<div class="popmenu__item-right-slot">
														<Icon name="alt-arrow-right-linear" />
													</div>
												</ContextMenu.SubTrigger>
												<ContextMenu.Portal>
													<ContextMenu.SubContent class="popmenu__content popmenu__sub-content">
														<For each={publishers}>
															{publisher => {
																return (
																	<ContextMenu.Item
																		class="popmenu__item"
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
						</Show> */}
						{/* <Show when={!home()?.files.includes(docinfo().url)}>
							<ContextMenu.Item
								class="popmenu__item"
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
						</Show> */}
						<OpenWithContextMenu
							url={asAutomergeURL(props.url)}
							currentEditorID={editorID()}
							openDocument={(url, opts) => openDocument(url, opts)}
						/>
						<Show when={entry() && file() && fileMenu()?.length}>
							<ContextMenu.Separator class="popmenu__separator" />
							<FileContextMenu
								items={fileMenu()!}
								entry={entry as Accessor<FileEntryDoc>}
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
