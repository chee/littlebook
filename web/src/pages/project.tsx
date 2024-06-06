import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "../components/card.tsx"
import {
	useDocument,
	useDocuments,
	useRepo,
} from "@automerge/automerge-repo-react-hooks"
import {type AnyDocumentId, updateText} from "@automerge/automerge-repo"
import {useParams, useSearch} from "wouter-preact"
import {navigate} from "wouter-preact/use-browser-location"
import ContentPane from "../components/content/content-pane.tsx"
import {useState} from "preact/hooks"
import createFile from "../automerge/files/create-file.ts"

export default function ProjectPage() {
	const repo = useRepo()
	const {projectId, fileId} = useParams<{projectId: string; fileId?: string}>()
	const [project, changeProject] = useDocument<lb.Project>(
		projectId as AnyDocumentId,
	)
	const search = new URLSearchParams(useSearch())
	const contentId = (search.get("file") as lb.ContentId) || undefined
	const files = Object.entries(useDocuments<lb.File>(project?.children))
	const [selectedFileId, setSelectedFileId] = useState<lb.FileId>(
		fileId as lb.FileId,
	)

	return (
		<PanelGroup direction="horizontal" autoSaveId={projectId}>
			<Panel defaultSize={62}>
				<PanelGroup direction="vertical" autoSaveId={projectId + "-browsers"}>
					<Panel defaultSize={38} minSize={5}>
						<Card>
							<button
								type="button"
								onClick={() => {
									// todo move to some kind of project-create-file
									const fileHandle = createFile(repo, {
										name: "new file",
										ext: "txt",
									})
									const fileId = fileHandle.documentId as lb.FileId
									changeProject(project => {
										if (!Array.isArray(project.children)) {
											project.children = []
										}
										project.children.push(fileId)
									})
									navigate(`?file=${fileId}`)
									setSelectedFileId(fileId)
								}}>
								create .txt
							</button>
							<button
								type="button"
								onClick={() => {
									// todo move to some kind of project-create-file
									const fileHandle = createFile(repo, {
										name: "new drawing",
										ext: "excalidraw",
									})
									const fileId = fileHandle.documentId as lb.FileId
									changeProject(project => {
										if (!Array.isArray(project.children)) {
											project.children = []
										}
										project.children.push(fileId)
									})
									navigate(`?file=${fileId}`)
									setSelectedFileId(fileId)
								}}>
								create drawing
							</button>
							{files.map(([id, file]) => (
								<button
									style={{
										background:
											file.id === selectedFileId
												? "var(--color-fill-selected)"
												: "",
									}}
									type="button"
									key={id}
									id={id}
									onClick={() => {
										navigate(`?file=${file.id}`)
										setSelectedFileId(file.id)
									}}>
									{file.name}.{file.ext}
								</button>
							))}
						</Card>
					</Panel>
					<PanelResizeHandle style={{width: "100%", height: "1em"}} />
					<Panel defaultSize={62} minSize={5}>
						<Card>
							{selectedFileId && <ContentPane fileId={selectedFileId} />}
						</Card>
					</Panel>
				</PanelGroup>
			</Panel>
			<PanelResizeHandle />
			<Panel defaultSize={19} minSize={5}>
				<aside class="sidebar sidebar--file-panel">okay</aside>
			</Panel>
		</PanelGroup>
	)
}
