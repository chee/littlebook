import {showOpenFilePicker} from "file-system-access"
// import useProject from "../../automerge/use-project.ts"
// import EditableName from "../documents/editable-name.tsx"
// import {useSpaceState} from "../spaces/space-state.tsx"
import {useLittlebookAPI} from "../api/use-api.ts"

import {A, useNavigate, useParams} from "@solidjs/router"
import {For, Suspense} from "solid-js"
import useDocument from "../documents/use-document.ts"
import useDocuments from "../documents/use-documents.ts"

export default function ProjectFileBrowser() {
	const params = useParams<{projectId?: lb.ProjectId}>()

	const [project, changeProject] = useDocument<lb.Project>(
		() => params.projectId,
	)

	const files = useDocuments<lb.File | lb.Folder>(() => project()?.items)

	const navigate = useNavigate()
	const lb = useLittlebookAPI()
	return (
		<Suspense>
			<article class="project-file-browser">
				<div class="project-file-browser-heading">
					<span>{project()?.icon}</span>
					<span>{project()?.name}</span>
				</div>
				<div class="buttons p-2">
					<button
						type="button"
						onclick={() => {
							// todo this should be part of projects api
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(id, {
								name: "new file.txt",
								contentType: "public.plain-text" as lb.UniformTypeIdentifier,
							})

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									navigate(`?file=${file?.id}`)
								})
							}
						}}>
						create .txt
					</button>

					<button
						type="button"
						onClick={() => {
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(id, {
								name: "new file.excalidraw",
								contentType: "com.excalidraw.json" as lb.UniformTypeIdentifier,
							})

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									navigate(`?file=${file?.id}`)
								})
							}
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
							const fileHandle = lb()?.files.import(computerFile, bytes)
							fileHandle?.doc().then(file => {
								file && changeProject(lb()?.projects.addItem(file.id))
								file && navigate(`?file=${file.id}`)
								// ui.files.selected.value = file?.id || null
							})
						}}>
						<span class="icon">{/* <UploadIcon /> */}</span>
						<span>import file</span>
					</button>
				</div>
				<section class="overflow-scroll max-h-full p-4 my-4 h-full">
					<For each={files()}>
						{file => {
							return (
								<Suspense>
									<A href={`?file=${file?.id}`}>{file?.name}</A>
								</Suspense>
							)
						}}
					</For>
				</section>
			</article>
		</Suspense>
	)
}
