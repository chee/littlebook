import {useLittlebookAPI} from "../api/use-api.ts"
import useDocument from "../documents/use-document.ts"
import {For, Show} from "solid-js"
import useContent from "./use-content.ts"
import UniformType from "./uniform-type.ts"

export default function InfoPanel(props: {
	fileId?: lb.FileId
	folderId: lb.FolderId
}) {
	const lb = useLittlebookAPI()
	const [file, changeFile] = useDocument<lb.File>(() => props.fileId)

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
		lb.files.deleteFile(file()!.id, props.folderId)
	}

	return (
		<Show when={file.latest}>
			<div class="info-panel">
				<label>
					<span>name</span>
					<input
						type="text"
						placeholder="Text input"
						readonly
						value={file.latest?.name}
					/>
				</label>

				<label>
					<span>id</span>
					<input
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
								onclick={() => switchContent(type)}>
								{type.description}
							</button>
						)}
					</For>
				</Show>
				<button type="button" onClick={deleteFile}>
					destroy file
				</button>
			</div>
		</Show>
	)
}
