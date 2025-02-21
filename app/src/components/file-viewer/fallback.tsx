import {Show} from "solid-js"
import type {Entry} from "@pointplace/types"
import "./fallback.css"

export default function FileViewerFallback(props: {
	entry?: Entry
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
			<pre style={{background: "black", color: "lime"}}>{json()}</pre>

			<Show
				when={props.error instanceof Error}
				fallback={<div>{props.error?.message || props.error}</div>}>
				<article class="error error--file-viewer">
					<h1>
						<code>{props.error.toString()}</code>
					</h1>

					<div>
						<code>
							<pre>{props.error.stack}</pre>
						</code>
					</div>
				</article>
			</Show>
		</div>
	)
}
