import ContentEditor from "./content-editor.tsx"
import ContentPreview from "./content-preview.tsx"
import useDocument from "../documents/use-document.ts"
import {Match, Switch} from "solid-js"
import {editorViewRegistry, previewRegistry} from "./content-view.ts"

type ContentViewerProps = {
	fileId?: lb.FileId
}
export default function FileViewer(props: ContentViewerProps) {
	const [file] = useDocument<lb.File>(() => props.fileId)

	const hasEditorView = () =>
		Boolean(file.latest && editorViewRegistry.getFirst(file.latest.contentType))

	const hasPreview = () =>
		Boolean(file.latest && previewRegistry.getFirst(file.latest.contentType))

	return (
		<div class="flex grow content-view-area">
			<Switch>
				<Match when={file.latest && (hasEditorView() || !hasPreview())}>
					<ContentEditor fileId={file.latest!.id} />
				</Match>
				<Match when={hasPreview()}>
					<ContentPreview fileId={file.latest!.id} />
				</Match>
			</Switch>
		</div>
	)
}
