import {useLittlebookAPI} from "../api/use-api.ts"
import {useParams} from "@solidjs/router"
import useDocument from "../documents/use-document.ts"
import {For, Show, createSignal} from "solid-js"
import useContent from "./use-content.ts"
import UniformType from "../../contents/uniform-type.ts"

export default function InfoPanel() {
	const params = useParams<{itemId?: lb.FileId}>()
	// todo this'll be the last guy in the URL
	// const {projectId} = useParams<{projectId?: lb.ProjectId}>()
	const lb = useLittlebookAPI()
	const [file, changeFile] = useDocument<lb.File>(() => params.itemId)

	const [content] = useContent(() => file()?.content)

	const switchContent = (to: UniformType) => {
		const from = file()?.contentType
		if (!from) {
			return
		}

		const convertedContentHandle = lb?.contents.recode(
			from,
			to.identifier,
			content()!,
		)

		if (convertedContentHandle instanceof Error) {
			// todo tell the user that it couldn't happen
			// todo notification provider
		} else {
			convertedContentHandle?.doc().then(convertedContent => {
				changeFile(file => {
					if (convertedContent) {
						file.contentType = to.identifier
						file.content = convertedContentHandle.documentId as lb.ContentId
					}
				})
			})
		}
	}

	const possibleTypes = () =>
		file.latest && UniformType.forFilename(file.latest.name)

	const deleteFile = () => {
		if (!file()?.id) {
			return
		}
		// lb()?.files.deleteFile(file()!.id, projectId as lb.ProjectId)
	}

	const [typeDropdownActive, setTypeDropdownActive] = createSignal(false)
	return (
		<Show when={file.latest}>
			<div class="bg-white rounded-xl mt-4 p-4 grid grid-cols-4 gap-y-2 dark:bg-black dark:text-white">
				<label class="grid-cols-subgrid col-span-4 grid">
					<span class="font-bold">name</span>
					<input
						class="col-span-3"
						type="text"
						placeholder="Text input"
						readonly
						value={file.latest?.name}
					/>
				</label>

				<label class="grid-cols-subgrid col-span-4 grid">
					<span class="font-bold">id</span>
					<input
						class="col-span-3"
						type="text"
						placeholder="Text input"
						readonly
						value={file.latest?.id}
					/>
				</label>

				<Show when={possibleTypes()}>
					<For each={[...possibleTypes()!.values()]}>
						{type => (
							<button
								class="button"
								type="button"
								onclick={() => {
									switchContent(type)
								}}>
								{type.description}
							</button>
						)}
					</For>
				</Show>
				<button
					class="col-start-3 col-span-2 bg-red-500 rounded-lg ring-1 ring-red-600 font-bold text-white"
					type="button"
					onClick={deleteFile}>
					destroy file
				</button>
			</div>
		</Show>
	)
}
