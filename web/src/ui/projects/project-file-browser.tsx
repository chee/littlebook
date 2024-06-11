import {navigate} from "wouter-preact/use-browser-location"
import {
	navigate as navigateHash,
	useHashLocation,
} from "wouter-preact/use-hash-location"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import useProject from "../../projects/use-project.ts"
import {useDocument, useDocuments} from "@automerge/automerge-repo-react-hooks"
import {showOpenFilePicker} from "file-system-access"
import type {FunctionalComponent} from "preact"
import {useMemo, useState} from "preact/hooks"
import "./project-file-browser.css"
import {LuUpload as UploadIcon} from "react-icons/lu"
import DataGrid, {TreeDataGrid} from "react-data-grid"
import {FileBrowser as Chonky, type FileData} from "chonky"
import {getFilenameParts} from "../../contents/types/uniform-type-identifiers.ts"
import clsx from "clsx"
import EditableName from "../documents/editable-name.tsx"
import {useHotkeys} from "react-hotkeys-hook"

interface ProjectFileBrowserProps {
	projectId: lb.ProjectId
	selectedFileId?: lb.FileId | lb.FolderId
	setSelectedFileId(id?: lb.FileId): void
}
export default function ProjectFileBrowser({
	projectId,
	setSelectedFileId,
	selectedFileId,
}: ProjectFileBrowserProps) {
	const [project, changeProject] = useProject(projectId)
	if (!project) {
		return <div />
	}
	const lb = useLittlebookAPI()
	const [hash, setHash] = useHashLocation()

	const files = useDocuments<lb.File>(project?.items)

	// const columns = [
	// 	{key: "special", id: "special"},
	// 	{key: "name", id: "name"},
	// 	// {key: "kind", name: "kind"},
	// 	{key: "changed", name: "changed"},
	// ]

	// const rows = useMemo(() => {
	// 	return Object.values(files).map(file => {
	// 		return {
	// 			id: file.id,
	// 			special: "",
	// 			name: file.name || "",
	// 			changed: file.lastModified
	// 				? new Date(file.lastModified).toLocaleString()
	// 				: "?",
	// 		}
	// 	}) as {id: string; special: string; name: string; changed: string}[]
	// }, [files])

	// const chonkyEntries = useMemo(() => {
	// 	return Object.values(files).map(file => {
	// 		// const ext = lb.contentTypes.getFilenameParts(file.name)
	// 		return {
	// 			id: file.id,
	// 			name: file.name || "",
	// 			changed: file.lastModified
	// 				? new Date(file.lastModified).toLocaleString()
	// 				: "?",
	// 		}
	// 	}) as FileData[]
	// }, [files, selectedFileId])

	const [editingFileNameId, setEditingFileNameId] = useState<
		lb.FileId | undefined
	>(undefined)

	useHotkeys("escape", () => setEditingFileNameId(undefined), {
		enableOnFormTags: true,
	})

	return (
		<article class="panel has-background-white is-primary project-file-browser-panel mnh-100">
			<p class="panel-heading is-size-6">{project.name}</p>
			<div class="panel-block">
				<div class="buttons">
					<button
						type="button"
						class="button"
						onClick={() => {
							const fileHandle = lb.files.createHandleInProject(
								project.id,
								{name: "new file.txt"},
								"public.plain-text" as lb.UniformTypeIdentifier,
							)
							console.log(fileHandle)
							if (fileHandle instanceof Error) {
							} else {
								fileHandle.doc().then(file => {
									navigate(`?file=${fileHandle.documentId}`)
									setSelectedFileId(file?.id)
								})
							}
						}}>
						create .txt
					</button>

					<button
						class="button"
						type="button"
						onClick={() => {
							const fileHandle = lb.files.createHandleInProject(
								project.id,
								{name: "new file.excalidraw"},
								"com.excalidraw.json" as lb.UniformTypeIdentifier,
							)
							if (fileHandle instanceof Error) {
							} else {
								fileHandle.doc().then(file => {
									console.log(file)
									navigate(`?file=${fileHandle.documentId}`)
									setSelectedFileId(file?.id)
								})
							}
						}}>
						create drawing
					</button>
					<button
						class="button"
						type="button"
						onClick={async () => {
							// todo move to some kind of project-create-file
							const [computerFileHandle] = await showOpenFilePicker({
								_preferPolyfill: true,
								multiple: false,
							})
							const computerFile = await computerFileHandle.getFile()
							const bytes = new Uint8Array(await computerFile.arrayBuffer())
							const fileHandle = lb.files.import(computerFile, bytes)
							fileHandle.doc().then(file => {
								file && changeProject(lb.projects.addItem(file.id))
								file && navigate(`?file=${file.id}`)
								setSelectedFileId(file?.id)
							})
						}}>
						<span class="icon">
							<UploadIcon />
						</span>
						<span>import file</span>
					</button>
				</div>
			</div>
			{Object.values(files).map(file => {
				return (
					<label
						key={file.id}
						class={clsx(
							"panel-block",
							selectedFileId == file.id && [
								"is-active",
								"has-background-primary-95",
							],
						)}>
						<button
							class="button is-ghost"
							onClick={() => {
								setSelectedFileId(file.id)
								navigate(`?file=${file.id}`)
							}}
							type="button"
							key={file.id}>
							<EditableName
								id={file.id}
								name={file.name}
								saveName={name => {
									lb.files.getHandle(file.id).change(file => {
										file.name = name
									})
								}}
								selectedId={selectedFileId}
								editingId={editingFileNameId}
								setEditingId={id => setEditingFileNameId(id as lb.FileId)}
							/>
						</button>
					</label>
				)
			})}
		</article>
	)
}

const RenameableFile: FunctionalComponent<{
	file: lb.File
	selectedFileId?: lb.FileId | lb.FolderId | undefined
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
