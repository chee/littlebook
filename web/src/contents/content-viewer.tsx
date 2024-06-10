import {useLittlebookAPI} from "../api/use-littlebook-api.ts"
import UnknownView from "./types/unknown/unknown-view.tsx"
import useFile from "../files/use-file.ts"
import "./content-viewer.css"
import useContent from "./use-content.ts"
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
			<div class="content-viewer content-viewer--loading content-viewer--file-loading" />
		)
	}
	const [content, changeContent] = useContent(file.content)
	if (!content) {
		return (
			<div class="content-viewer content-viewer--loading content-viewer--content-loading" />
		)
	}

	const [ContentView] = lb.views.content.get(content.contentType) || UnknownView

	if (error) {
		return <SomethingWentWrong error={error} />
	}

	return (
		<ContentView
			file={file}
			changeFile={changeFile}
			content={content}
			changeContent={changeContent}
		/>
	)
}

function SomethingWentWrong({error}: {error: Error}) {
	return (
		<details style={{height: "100%"}}>
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
