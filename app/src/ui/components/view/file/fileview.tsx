import "../view.css"

import {
	createMemo,
	For,
	Show,
	Switch,
	Match,
	createRenderEffect,
	createEffect,
	onCleanup,
	onMount,
} from "solid-js"
import {useDocHandle, useDocument} from "solid-automerge"
import {usePerfectView} from "../usePerfectView.tsx"
import clsx from "clsx"
import {createStore} from "solid-js/store"
import {
	parseDocumentURL,
	type AutomergeURLOrDocumentURL,
} from ":/core/sync/url.ts"
import type {FileEntryDoc} from ":/docs/file-entry-doc.ts"

import type {
	AutomergeFileEditor,
	FileViewer,
} from "@littlebook/plugin-api/types/view.ts"
import ViewErrorBoundary from ":/ui/components/view/error-boundary/error-boundary.tsx"
import bemby from "@chee/bemby"
import EditorFileview from ":/ui/components/view/file/editor.tsx"
import ReadonlyFileview from ":/ui/components/view/file/readonly.tsx"
import {Shadows} from ":/ui/components/view/shadow.tsx"
import {usePublisherRegistry, useViewRegistry} from "@littlebook/plugin-api"
import {Dynamic} from "solid-js/web"

// todo this should not take a URL, but a FileviewModel (rich model)

export default function Fileview(props: {
	url: AutomergeURLOrDocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<FileEntryDoc>(() => docinfo().url)
	const view = usePerfectView(() => props.url)
	const [content, contentHandle] = useDocument(() => entry()?.url)
	const viewRegistry = useViewRegistry()
	const indicators = () => viewRegistry.indicators(content())
	const publisherRegistry = usePublisherRegistry()
	const publishers = () => publisherRegistry.publishers(content())

	return (
		<div class={bemby("view", "file", view()?.category, view()?.id)}>
			<Show when={entry() && view() && contentHandle()}>
				<ViewErrorBoundary
					entry={entry()}
					view={view()}
					content={contentHandle?.latest?.doc()}>
					<Shadows class="view-shadow-root">
						{shadowProps => {
							createRenderEffect(() => {
								if (view()!.styles) {
									shadowProps.setViewStyles(view()!.styles!)
								}
							})

							return (
								<Switch>
									<Match when={view()?.category === "editor"}>
										<EditorFileview
											view={view()! as AutomergeFileEditor<unknown>}
											fileHandle={contentHandle()!}
											entryHandle={entryHandle()!}
											isActive={!!props.isActive}
											shadow={shadowProps.shadow}
										/>
									</Match>
									<Match when={view()?.category === "readonly"}>
										<ReadonlyFileview
											view={view() as FileViewer<unknown>}
											fileHandle={contentHandle()!}
											isActive={!!props.isActive}
											shadow={shadowProps.shadow}
										/>
									</Match>
								</Switch>
							) as HTMLElement
						}}
					</Shadows>

					{/* todo this should be a separate component, ViewFooter, obvy */}
					<footer
						class={clsx(
							"view-status-bar",
							props.isActive && "view-status-bar--active",
						)}>
						<span class="view-status-bar__editor-name">
							{view()?.displayName ?? view()?.id}
						</span>
						<For each={Array.from(indicators())}>
							{indicator => {
								return (
									<Shadows>
										{shadowProps => (
											<Dynamic
												component={indicator.render}
												doc={content}
												onChange={n => {
													contentHandle()?.on("change", n)
													onCleanup(() => {
														contentHandle()?.off("change", n)
													})
												}}
												isActive={() => !!props.isActive}
												onCleanup={onCleanup}
												onMount={onMount}
												registerKeybinding={() => {}}
												shadow={shadowProps.shadow()}
											/>
										)}
									</Shadows>
								)
							}}
						</For>
						<For each={Array.from(publishers())}>
							{publisher => {
								return (
									<button
										onClick={() => {
											if ("schema" in publisher) {
												publisher.publish({
													handle: contentHandle()!,
													doc: content(),
												})
											}
										}}>
										{publisher.icon || "⚙️"}{" "}
										{publisher.displayName || publisher.id}
									</button>
								)
							}}
						</For>
					</footer>
				</ViewErrorBoundary>
			</Show>
		</div>
	)
}

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"littlebook-view": any
		}
	}
}
