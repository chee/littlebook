import type {Entry} from "@pointplace/types"
import "./fallback.css"

export default function EditorFallback(props: {
	entry: Entry
	view: unknown
	fileHandle: unknown
}) {
	const json = () => JSON.stringify(props.entry, null, "\t")
	return (
		<div class="editor-fallback">
			<p>
				sorry, i can't display this file
				<code>{" " + props.entry.name}</code>...
			</p>
			{!props.view && <p>because there's no Editor that can open it</p>}
			{!props.fileHandle && <p>because i didn't find the file</p>}
			<br />
			<p>debug info:</p>
			<pre style={{background: "black", color: "lime"}}>{json()}</pre>
		</div>
	)
}
