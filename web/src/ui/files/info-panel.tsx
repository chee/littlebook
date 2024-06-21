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
			<div>
				<label>
					<span>name</span>
					<input
						type="text"
						placeholder="Text input"
						readonly
						value={file()?.name}
					/>
				</label>

				<label>
					<span>id</span>
					<input
						type="text"
						placeholder="Text input"
						readonly
						value={file()?.id}
					/>
				</label>

				<button
					class="button has-background-bad"
					type="button"
					onClick={deleteFile}>
					destroy file
				</button>
			</div>
		</Show>
	)
}
