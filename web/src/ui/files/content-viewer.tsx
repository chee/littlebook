import ContentEditor from "./content-editor.tsx"
import ContentPreview from "./content-preview.tsx"
import {useParams} from "@solidjs/router"
import useDocument from "../documents/use-document.ts"
import {Show, createEffect} from "solid-js"
import {
	editorViewRegistry,
	previewRegistry,
} from "../../contents/content-view.ts"

// todo might be folder
export default function ContentViewer() {
	const params = useParams<{fileId?: lb.FileId}>()
	const [file] = useDocument<lb.File>(() => params.fileId)

	const hasEditorView = () =>
		Boolean(file.latest && editorViewRegistry.getFirst(file.latest.contentType))

	const hasPreview = () =>
		Boolean(file.latest && previewRegistry.getFirst(file.latest.contentType))

	return (
		<div class="flex grow content-view-area">
			<Show when={hasEditorView() || !hasPreview()}>
				<ContentEditor />
			</Show>
			<Show when={hasPreview()}>
				<ContentPreview />
			</Show>
		</div>
	)
}
