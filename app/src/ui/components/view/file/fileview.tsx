import "../view.css"

import {
	createMemo,
	For,
	Show,
	Switch,
	Match,
	createRenderEffect,
	createEffect,
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

import type {FileEditor, FileViewer} from "@littlebook/plugin-api/types/view.ts"
import ViewErrorBoundary from ":/ui/components/view/error-boundary/error-boundary.tsx"
import bemby from "@chee/bemby"
import EditorFileview from ":/ui/components/view/file/editor.tsx"
import ReadonlyFileview from ":/ui/components/view/file/readonly.tsx"
import {Shadows} from ":/ui/components/view/shadow.tsx"

// todo this should not take a URL, but a FileviewModel (rich model)

export default function Fileview(props: {
	url: AutomergeURLOrDocumentURL
	isActive?: boolean
}) {
	const docinfo = createMemo(() => parseDocumentURL(props.url))
	const [entry, entryHandle] = useDocument<FileEntryDoc>(() => docinfo().url)
	const view = usePerfectView(() => props.url)
	const contentHandle = useDocHandle(() => entry()?.url)
	const [statusItems, updateStatusItems] = createStore([] as string[])

	return (
		<div class={bemby("view", "file", view()?.category, view()?.id)}>
			<Show when={entry() && view() && contentHandle()}>
				<ViewErrorBoundary
					entry={entry()}
					view={view()}
					content={contentHandle?.latest?.doc()}>
					<Shadows>
						{shadowProps => {
							createRenderEffect(() => {
								if (view()!.styles) {
									// todo how to destroy the correct old stylesheets
									shadowProps.adoptStyles(view()!.styles!)
								}
							})

							return (
								<Switch>
									<Match when={view()?.category === "editor"}>
										<EditorFileview
											view={view()! as FileEditor<unknown>}
											fileHandle={contentHandle()!}
											entryHandle={entryHandle()!}
											updateStatusItems={updateStatusItems}
											isActive={!!props.isActive}
											{...shadowProps}
										/>
									</Match>
									<Match when={view()?.category === "readonly"}>
										<ReadonlyFileview
											view={view() as FileViewer<unknown>}
											fileHandle={contentHandle()!}
											isActive={!!props.isActive}
											updateStatusItems={updateStatusItems}
											{...shadowProps}
										/>
									</Match>
								</Switch>
							) as HTMLElement
						}}
					</Shadows>

					<footer
						class={clsx(
							"view-status-bar",
							props.isActive && "view-status-bar--active",
						)}>
						<span class="view-status-bar__editor-name">
							{view()?.displayName ?? view()?.id}
						</span>
						<For each={statusItems}>{item => <span>{item}</span>}</For>
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
