import type {Entry} from "../../documents/entry.ts"
import "./fallback.css"

export default function EditorFallback(props: {
	entry: Entry
	editor: unknown
	fileHandle: unknown
}) {
	const json = () => JSON.stringify(props.entry, null, "\t")
	return (
		<div class="editor-fallback">
			<p>can't render{" " + props.entry?.contentType}...</p>
			{!props.editor && <p>because there's no Editor</p>}
			{!props.fileHandle && <p>because i didn't find the file</p>}
			<p>here's the inode:</p>
			<pre>{json()}</pre>
		</div>
	)
}
