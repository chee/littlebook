import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"
import {Card} from "./card.tsx"
import {useDocument, useDocuments} from "@automerge/automerge-repo-react-hooks"
import {useParams, useSearch} from "wouter-preact"
import {navigate} from "wouter-preact/use-browser-location"
import ContentPanel from "./content/content-panel.tsx"
import {useEffect, useState} from "preact/hooks"
import type {FC} from "preact/compat"
import {showOpenFilePicker} from "file-system-access"
import {useLittlebookAPI} from "../hooks/api.ts"

function useProject(id: lb.ProjectId) {
	const lb = useLittlebookAPI()
	const project = lb.projects.get(id)
	const [, setGen] = useState(0)
	const rerender = () => setGen(v => v + 1)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		rerender()
		return () => project.destroy()
	}, [project.doc, project])
	return project
}

export default function ProjectPage() {
	// const repo = useRepo()
	const lb = useLittlebookAPI()
	const {projectId} = useParams<{projectId: lb.ProjectId}>()
	// const [project, changeProject] = useDocument<lb.Project>(
	// 	projectId as lb.ProjectId,
	// )
	// const [project] = useState(lb.projects.get(projectId as lb.ProjectId))
	const project = useProject(projectId)

	// const project = lb.projects.get(projectId as lb.ProjectId)
	const search = new URLSearchParams(useSearch())
	const fileId = (search.get("file") as lb.FileId) || undefined
	const files = Object.values(useDocuments<lb.File>(project?.items))
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
									const file = lb.files.create(
										{
											name: "new file.txt",
										},
										"public.plain-text" as lb.UniformTypeIdentifier,
									)
									project.addItem(file.id)
									navigate(`?file=${file.id}`)
									setSelectedFileId(file.id)
								}}>
								create .txt
							</button>
							<button
								type="button"
								onClick={() => {
									const file = lb.files.create(
										{
											name: "new file.txt",
										},
										"com.excalidraw.elements" as lb.UniformTypeIdentifier,
									)
									project.addItem(file.id)
									navigate(`?file=${file.id}`)
									setSelectedFileId(file.id)
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
									const computerFile = await computerFileHandle.getFile()
									const bytes = new Uint8Array(await computerFile.arrayBuffer())

									const file = lb.files.import(computerFile, bytes)
									project.addItem(file.id)
									navigate(`?file=${file.id}`)
									setSelectedFileId(file.id)
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
						<Card paddingless>
							{selectedFileId && <ContentPanel fileId={selectedFileId} />}
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
			{file.name}
		</button>
	)
}
