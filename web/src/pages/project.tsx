import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "../components/card.tsx"
import {
	useDocument,
	useDocuments,
	useRepo,
} from "@automerge/automerge-repo-react-hooks"
import {
	type AnyDocumentId,
	updateText,
	type ChangeFn,
} from "@automerge/automerge-repo"
import {useParams, useSearch} from "wouter-preact"
import {navigate} from "wouter-preact/use-browser-location"
import ContentPane from "../components/content/content-pane.tsx"
import {useState} from "preact/hooks"
import createFile from "../automerge/files/create-file.ts"
import type {FC} from "preact/compat"
import {showOpenFilePicker} from "file-system-access"
import importFile from "../automerge/files/import-file.ts"

export default function ProjectPage() {
	const repo = useRepo()
	const {projectId, fileId} = useParams<{projectId: string; fileId?: string}>()
	const [project, changeProject] = useDocument<lb.Project>(
		projectId as AnyDocumentId,
	)
	const search = new URLSearchParams(useSearch())
	const contentId = (search.get("file") as lb.ContentId) || undefined
	const files = Object.values(useDocuments<lb.File>(project?.children))
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
							<button
								type="button"
								onClick={async () => {
									// todo move to some kind of project-create-file
									const [computerFileHandle] = await showOpenFilePicker({
										_preferPolyfill: true,
										multiple: false,
									})
									const [name, ...extParts] = computerFileHandle.name.split(".")
									const ext = extParts.join(".")
									const computerFile = await computerFileHandle.getFile()
									const fileHandle = await importFile(
										repo,
										{
											name,
											ext,
										},
										computerFile,
									)
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
								import file
							</button>
							{files.map(file => (
								<RenameableFile
									key={file.id}
									file={file}
									selectedFileId={selectedFileId}
									setSelectedFileId={setSelectedFileId}
								/>
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

const RenameableFile: FC<{
	file: lb.File
	selectedFileId: lb.FileId
	setSelectedFileId: (id: lb.FileId) => void
}> = ({file, selectedFileId, setSelectedFileId}) => {
	const [editing, setEditing] = useState(false)
	const [name, setName] = useState(file.name)
	const [, changeFile] = useDocument<lb.File>(file.id)
	if (editing) {
		return (
			<form
				style={{display: "inline"}}
				onSubmit={() => {
					changeFile(file => {
						file.name = name
						navigate(`?file=${file.id}`)
					})
					setEditing(false)
				}}
				id={file.id}>
				<input
					style={{flex: 0, width: "10ch", textAlign: "right"}}
					value={name}
					autofocus
					ref={input => input?.focus()}
					onInput={event => {
						if (!(event.target instanceof HTMLInputElement)) return
						setName(event.target.value)
					}}
					onKeyDown={event => {
						// todo react hotkeys
						if (event.key === "Escape") {
							setEditing(false)
						}
					}}
				/>
				.{file.ext}
			</form>
		)
	}
	return (
		<button
			style={{
				background:
					file.id === selectedFileId ? "var(--color-fill-selected)" : "",
			}}
			type="button"
			id={file.id}
			onClick={() => {
				if (selectedFileId == file.id) {
					setEditing(true)
				} else {
					navigate(`?file=${file.id}`)
					setSelectedFileId(file.id)
				}
			}}>
			{file.name}.{file.ext}
		</button>
	)
}
