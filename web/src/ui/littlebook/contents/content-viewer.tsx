import {useLittlebookAPI} from "../../api/use-api.ts"
import UnknownView from "../../../contents/types/unknown/unknown-view.tsx"
import useFile from "../../automerge/use-file.ts"
import useContent from "../../../contents/use-content.ts"
// import {useEffect, useErrorBoundary} from "preact/hooks"
// import {useSpaceState} from "../spaces/space-state.tsx"

export default function ContentViewer() {
	const lb = useLittlebookAPI()
	const [error, reset] = useErrorBoundary()
	const ui = useSpaceState()
	const fileId = ui.files.selected
	if (!fileId.value) return null
	useEffect(() => {
		reset()
	}, [fileId.value])

	const [file, changeFile] = useFile(fileId.value)
	if (!file) {
		return (
			<div class="box content-viewer content-viewer--loading content-viewer--file-loading" />
		)
	}
	const [content, changeContent] = useContent(file.content)
	if (!content) {
		return (
			<div class="box content-viewer content-viewer--loading content-viewer--content-loading" />
		)
	}

	let [ContentView] = lb.views.content.get(content.contentType)
	if (!ContentView) {
		ContentView = UnknownView
	}

	if (error) {
		return <SomethingWentWrong error={error} />
	}

	return (
		<div class="h-full overflow-auto bg-white rounded overscroll-none dark:bg-black dark:text-white">
			<ContentView
				file={file}
				changeFile={changeFile}
				content={content}
				changeContent={changeContent}
			/>
		</div>
	)
}

function SomethingWentWrong({error}: {error: Error}) {
	return (
		<details class="box h-100">
			<summary>something went bad :( </summary>
			<pre
				style={{
					background: "black",
					color: "lime",
					padding: "1em",
					display: "flex",
					height: "100%",
				}}>
				<code>{error.message || JSON.stringify(error)}</code>
			</pre>
		</details>
	)
}
