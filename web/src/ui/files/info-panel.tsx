import {typeRegistry} from "../../contents/types/type-registries.ts"
import {useLittlebookAPI} from "../api/use-api.ts"
import clsx from "clsx"
import {Card} from "../elements/card/card.tsx"
import {useParams, useSearchParams} from "@solidjs/router"
import useDocument from "../documents/use-document.ts"
import {Show, createEffect, createSignal, type ParentComponent} from "solid-js"

export default function InfoPanel() {
	const [search] = useSearchParams<{file?: lb.FileId}>()
	const {projectId} = useParams<{projectId?: lb.ProjectId}>()
	const lb = useLittlebookAPI()
	const [file, changeFile] = useDocument<lb.File>(() => search.file)

	const [content] = useDocument<lb.Content<any>>(() => file()?.content)

	const switchContent = (to: lb.UniformTypeIdentifier) => {
		const convertedContentHandle = lb()?.contents.recode(content()!, to)
		if (convertedContentHandle instanceof Error) {
			// todo tell the user that it couldn't happen
			// todo notification provider
		} else {
			convertedContentHandle?.doc().then(convertedContent => {
				changeFile(file => {
					if (convertedContent) file.content = convertedContent.id
				})
			})
		}
	}

	const deleteFile = () => {
		if (!file()?.id) {
			return
		}
		lb()?.files.deleteFile(file()!.id, projectId as lb.ProjectId)
	}

	const [typeDropdownActive, setTypeDropdownActive] = createSignal(false)
	return (
		<Show when={file()}>
			<div class="bg-white rounded-xl mt-4 p-4 grid grid-cols-4 gap-y-2 dark:bg-black dark:text-white">
				<label class="grid-cols-subgrid col-span-4 grid">
					<span class="font-bold">name</span>
					<input
						class="col-span-3"
						type="text"
						placeholder="Text input"
						readonly
						value={file()?.name}
					/>
				</label>

				<label class="grid-cols-subgrid col-span-4 grid">
					<span class="font-bold">id</span>
					<input
						class="col-span-3"
						type="text"
						placeholder="Text input"
						readonly
						value={file()?.id}
					/>
				</label>

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
