import useDocument from "../../../documents/use-document.ts"
import {createEffect, For, Show} from "solid-js"
import useContent from "../../../files/contents/use-content.ts"
import UniformType from "../../../files/contents/uniform-type.ts"
import recodeContent from "../../../files/contents/recode.ts"
import {useAutomerge} from "../../../automerge/use-automerge.ts"
import {coderRegistry} from "../../../files/contents/content-coders.ts"
import "./info-panel.scss"

export default function InfoPanel(props: {
	fileId?: lb.FileId
	// folderId: lb.FolderId
}) {
	let {repo} = useAutomerge()
	let [file, changeFile] = useDocument<lb.File>(() => props.fileId)

	let [, , contentHandle] = useContent(() => file.latest?.content)
	createEffect(() => {
		contentHandle()
	})

	let switchContent = async (to: UniformType) => {
		coderRegistry.request(to.identifier)
		let from = file.latest?.contentType

		if (!from) {
			return
		}

		let content = await contentHandle()?.doc()

		let convertedContentHandle = await recodeContent(
			repo,
			from,
			to.identifier,
			content!,
		)

		if (convertedContentHandle instanceof Error) {
			console.error(convertedContentHandle)
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

	let possibleTypes = () =>
		file.latest && UniformType.forFilename(file.latest.name)

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
			</div>
		</Show>
	)
}
