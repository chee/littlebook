import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "../components/card.tsx"
import {
	useDocument,
	useDocuments,
	useRepo,
} from "@automerge/automerge-repo-react-hooks"
import {
	AnyDocumentId,
	DocumentId,
	RawString,
	updateText,
} from "@automerge/automerge-repo"
import {useEffect, useState} from "preact/hooks"
import {lb} from "../types.ts"
import {useParams, useSearch} from "wouter-preact"
import {navigate} from "wouter-preact/use-browser-location"

export default function ProjectPage() {
	const repo = useRepo()
	const {projectId, fileId} = useParams<{projectId: string; fileId?: string}>()
	const [project, changeProject] = useDocument<lb.Project>(
		projectId as AnyDocumentId,
	)
	const search = new URLSearchParams(useSearch())
	const contentId = (search.get("file") as lb.ContentId) || undefined
	const files = Object.entries(useDocuments<lb.File>(project?.children))
	const [content, changeContent] = useDocument<lb.TextContent>(contentId)

	return (
		<PanelGroup direction="vertical">
			<Panel defaultSize={50}>
				<Card>
					<button
						type="button"
						onClick={() => {
							const content = repo.create<lb.TextContent>({
								ext: "txt",
								body: Math.random().toString(36).slice(2),
							})
							const file = repo.create<lb.File>({
								type: "file",
								ext: new RawString("txt"),
								name: new RawString(Math.random().toString(36).slice(2)),
								content: content.documentId as lb.ContentId,
							})
							changeProject(project => {
								// not having to do this asing would be maybe enough of
								// a reason to duplicate the id read-only on the type
								// itself
								project.children = project.children || []
								project.children.push(file.documentId as lb.FileId)
							})
						}}>
						new file
					</button>
					{files.map(([id, file]) => (
						<button
							style={{
								border: file.content === contentId ? "2px solid green" : "",
							}}
							type="button"
							key={id}
							id={id}
							onClick={() => navigate(`?file=${file.content}`)}>
							{file.name.val}.{file.ext.val}
						</button>
					))}
				</Card>
			</Panel>
			<PanelResizeHandle />
			<Panel defaultSize={50}>
				<Card>
					<textarea
						style={{width: "100%", height: "100%"}}
						onInput={event => {
							changeContent(content => {
								if (!(event.target instanceof HTMLTextAreaElement)) return
								updateText(content, ["body"], event.target.value)
							})
						}}>
						{content?.body}
					</textarea>
				</Card>
			</Panel>
		</PanelGroup>
	)
}
