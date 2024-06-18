// import useProject from "../../automerge/use-project.ts"
// import EditableName from "../documents/editable-name.tsx"
// import {useSpaceState} from "../spaces/space-state.tsx"
import {useLittlebookAPI} from "../../api/use-api.ts"
import {showOpenFilePicker} from "file-system-access"

import Button from "../../elements/button/button.tsx"
import {A, useNavigate, useParams} from "@solidjs/router"
import useDocument from "../../automerge/use-document.ts"
import {For, Suspense, createEffect, on} from "solid-js"
import useDocuments from "../../automerge/use-documents.ts"

export default function ProjectFileBrowser() {
	const params = useParams<{projectId?: lb.ProjectId}>()

	const [project, changeProject] = useDocument<lb.Project>(
		() => params.projectId,
	)

	createEffect(
		on([project], () => {
			console.log("the project changed")
		}),
	)

	const files = useDocuments<lb.File | lb.Folder>(() => project()?.items)
	createEffect(() => {
		console.log(files())
	})

	const navigate = useNavigate()
	const lb = useLittlebookAPI()
	return (
		<Suspense fallback={<div>hehe</div>}>
			<article class="project-file-browser">
				<div class="project-file-browser-heading">
					<span>{project()?.icon}</span>
					<span>{project()?.name}</span>
				</div>
				<div class="p-2 flex gap-2 has-white-background">
					<Button
						type="button"
						kind="ghost"
						onclick={() => {
							// todo this should be part of projects api
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(
								id,
								{name: "new file.txt"},
								"public.plain-text" as lb.UniformTypeIdentifier,
							)

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									navigate(`?file=${file?.id}`)
								})
							}
						}}>
						create .txt
					</Button>

					<Button
						type="button"
						onClick={() => {
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(
								id,
								{name: "new file.excalidraw"},
								"com.excalidraw.json" as lb.UniformTypeIdentifier,
							)

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									navigate(`?file=${file?.id}`)
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
						<span class="icon">{/* <UploadIcon /> */}</span>
						<span>import file</span>
					</Button>
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
