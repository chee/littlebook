import {updateText} from "@automerge/automerge-repo"
import type {ContentCreator, ContentView} from "./content-type-registry.ts"

export const textCreator: ContentCreator<string> = {
	extensions: ["txt", "text"],
	create(repo) {
		const contentHandle = repo.create<lb.Content<string>>({
			id: "" as lb.ContentId,
			body: "",
		})
		contentHandle.change(content => {
			// @ts-expect-error it's read-only but only after now
			content.id = contentHandle.documentId as lb.ContentId
		})
		return contentHandle
	},
}

export const TextView: ContentView<string> = ({content, changeContent}) => {
	return (
		<textarea
			style={{width: "100%", height: "100%", resize: "none"}}
			onInput={event => {
				changeContent(content => {
					if (!(event.target instanceof HTMLTextAreaElement)) return
					updateText(content, ["body"], event.target.value)
				})
			}}>
			{content.body}
		</textarea>
	)
}
