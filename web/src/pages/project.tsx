import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "../components/card.tsx"
import {useLocation, useParams} from "react-router-dom"
import {useDocument, useDocuments} from "@automerge/automerge-repo-react-hooks"
import {Littlebook} from "@littlebook/types"
import {AnyDocumentId, DocumentId} from "@automerge/automerge-repo"
import {useEffect, useState} from "preact/hooks"

export default function ProjectPage() {
	const params = useParams()
	const [project, changeProject] = useDocument<Littlebook.Project>(
		params.projectId as AnyDocumentId,
	)
	const files = Object.values(useDocuments<Littlebook.File>(project?.children))
	const [contentId, setContentId] = useState<Littlebook.ContentId>()
	const [content, changeContent] = useDocument<Littlebook.Content>(contentId)

	const te = new TextEncoder()
	const td = new TextDecoder()
	return (
		<PanelGroup direction="vertical">
			<Panel defaultSize={50}>
				<Card>
					{files.map(f => (
						<button
							type="button"
							key={f.id}
							id={f.id}
							onClick={() => setContentId(f.contentId)}>
							{f.name}.{f.ext}
						</button>
					))}
				</Card>
			</Panel>
			<PanelResizeHandle />
			<Panel defaultSize={50}>
				<Card>
					<textarea
						onInput={event => {
							changeContent(content => {
								content.bytes = te.encode(event.target.value)
							})
						}}>
						{td.decode(content?.bytes)}
					</textarea>
				</Card>
			</Panel>
		</PanelGroup>
	)
}
