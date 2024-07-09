import useDocument from "../../documents/use-document.ts"
import {createEffect, For, Show} from "solid-js"
import useContent from "../contents/use-content.ts"
import UniformType from "../contents/uniform-type.ts"
import recodeContent from "../contents/recode.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import {coderRegistry} from "../contents/content-coders.ts"
import "./info-panel.scss"

export default function InfoPanel(props: {
	fileId?: lb.FileId
	// folderId: lb.FolderId
}) {
	const {repo} = useAutomerge()
	const [file, changeFile] = useDocument<lb.File>(() => props.fileId)

	const [, , contentHandle] = useContent(() => file.latest?.content)
	createEffect(() => {
		contentHandle()
	})

	const switchContent = async (to: UniformType) => {
		coderRegistry.request(to.identifier)
		const from = file.latest?.contentType

		if (!from) {
			return
		}

		const content = await contentHandle()?.doc()

		const convertedContentHandle = await recodeContent(
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

	const possibleTypes = () =>
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
