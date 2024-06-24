import ContentEditor from "../files/content-editor.tsx"
import ContentPreview from "../files/content-preview.tsx"
import InfoPanel from "../files/info-panel.tsx"
import MetadataViewer from "../files/metadata-viewer.tsx"
import Sidebar from "../spaces/sidebar/sidebar.tsx"
import ProjectFileBrowser from "./project-file-browser.tsx"
import "./projects.scss"
import {SplitPane} from "solid-split-pane"
import sidebarState from "../spaces/sidebar/sidebar-state.ts"

import {useSearchParams} from "@solidjs/router"
import useDocument from "../documents/use-document.ts"
import {Show, createEffect} from "solid-js"
import {
	editorViewRegistry,
	previewRegistry,
} from "../../contents/content-view.ts"

export default function ProjectPage() {
	const [sidebar] = sidebarState
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const [file] = useDocument<lb.File>(() => search.file)
	const hasEditorView = () =>
		Boolean(file.latest && editorViewRegistry.getFirst(file.latest.contentType))

	const hasPreview = () =>
		Boolean(file.latest && previewRegistry.getFirst(file.latest.contentType))

	createEffect(() => {
		console.log(file)
		console.log("edit", hasEditorView(), "pre", hasPreview())
	})

	return (
		<div class="flex grow">
			<SplitPane>
				<div class="flex column grow">
					<SplitPane direction="vertical">
						<div class="flex grow file-browser-area">
							<ProjectFileBrowser />
						</div>
						<div class="flex grow content-view-area">
							<Show when={hasEditorView() || !hasPreview()}>
								<ContentEditor />
							</Show>
							<Show when={hasPreview()}>
								<ContentPreview />
							</Show>
						</div>
					</SplitPane>
				</div>
				<Sidebar open={sidebar.secondary}>
					<InfoPanel />
					<MetadataViewer />
				</Sidebar>
			</SplitPane>
		</div>
	)
}
