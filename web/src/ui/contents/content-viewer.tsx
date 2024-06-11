import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import UnknownView from "../../contents/types/unknown/unknown-view.tsx"
import useFile from "../../files/use-file.ts"
import "./content-viewer.css"
import useContent from "../../contents/use-content.ts"
import {useEffect, useErrorBoundary} from "preact/hooks"

export default function ContentViewer({fileId}: {fileId: lb.FileId}) {
	const lb = useLittlebookAPI()
	const [error, reset] = useErrorBoundary()
	useEffect(() => {
		reset()
	}, [fileId])
	const [file, changeFile] = useFile(fileId)
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
		<div class="mnh-100">
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
