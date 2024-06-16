import {navigate} from "wouter-preact/use-browser-location"
import {useLittlebookAPI} from "../../api/use-littlebook-api.ts"
import useProject from "../../projects/use-project.ts"
import {useDocuments} from "@automerge/automerge-repo-react-hooks"
import {showOpenFilePicker} from "file-system-access"
import {LuUpload as UploadIcon} from "react-icons/lu"
import EditableName from "../documents/editable-name.tsx"
import {Card} from "../elements/card/card.tsx"
import {useSpaceState} from "../space/space-state.tsx"
import Button from "../elements/button/button.tsx"

export default function ProjectFileBrowser() {
	const ui = useSpaceState()
	console.log(ui)
	console.log(ui.projects.selected.value)
	if (!ui.projects.selected.value) {
		return <Card class="h-full" />
	}
	const [project, changeProject] = useProject(ui.projects.selected.value)
	if (!project) return <Card class="h-full" />
	const lb = useLittlebookAPI()
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

	return (
		<Card class="h-full">
			<div
				class="bg-primary-300 dark:bg-primary-800 text-center items-center justify-center
			px-4 p-2 rounded-t flex font-bold gap-2 sticky">
				<span>{project.icon}</span>
				<span>{project.name}</span>
			</div>
			<div class="p-2 flex gap-2">
				<Button
					type="button"
					kind="ghost"
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
								navigate(`?file=${file?.id}`)
								ui.files.selected.value = file?.id || null
							})
						}
					}}>
					create .txt
				</Button>

				<Button
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
								navigate(`?file=${file?.id}`)
								ui.files.selected.value = file?.id || null
							})
						}
					}}>
					create drawing
				</Button>
				<Button
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
							ui.files.selected.value = file?.id || null
						})
					}}>
					<span class="icon">
						<UploadIcon />
					</span>
					<span>import file</span>
				</Button>
			</div>
			<section class="overflow-scroll max-h-full p-4 my-4 h-full">
				{Object.values(files).map(file => {
					return (
						<Button
							class=""
							onClick={() => {
								ui.files.selected.value = file.id
								navigate(`?file=${file.id}`)
							}}
							active={file.id == ui.files.selected.value}
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
								which="files"
							/>
						</Button>
					)
				})}
			</section>
		</Card>
	)
}
