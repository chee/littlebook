import {Show} from "solid-js"
import "./fallback.css"
import type {FileEntry} from ":/docs/file-entry-doc.ts"

export default function FileViewerFallback(props: {
	entry?: FileEntry
	view: unknown
	fileHandle: unknown
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any
}) {
	const json = () => JSON.stringify(props.entry, null, "\t")
	return (
		<div class="file-viewer-fallback">
			<p>
				sorry, i can't display this file
				{!props.view && ", because there's no Editor that can open it"}
				{!props.fileHandle && ", because i didn't find the file"}
			</p>
			<br />
			<p>debug info:</p>

			<Show
				when={props.error instanceof Error}
				fallback={<div>{props.error?.message || props.error}</div>}>
				<article class="error error--file-viewer">
					<details>
						<summary>{props.error.toString()}</summary>
						<code>
							<pre>{props.error.stack}</pre>
						</code>
					</details>
				</article>
			</Show>

			<pre
				style={{
					"tab-size": "2",
					background: "black",
					color: "white",
					"font-size": "var(--font-size-7)",
				}}>
				{json()}
			</pre>
		</div>
	)
}
