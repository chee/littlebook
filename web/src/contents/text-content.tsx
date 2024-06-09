import {updateText} from "@automerge/automerge-repo"
import type {ContentCreator, ContentView} from "./content-type.ts"

export const textCreator: ContentCreator<string> = {
	create() {
		const contentHandle = repo.create<lb.content<string>>({
			id: "" as lb.contentId,
			body: "",
		})
		contentHandle.change(content => {
			// @ts-expect-error it's read-only but only after now
			content.id = contentHandle.documentId as lb.contentId
		})
		return {
			change,
			toBytes() {
				const decoder = new TextDecoder
				decoder.decode()
			}
			contentView: TextView
		}
	}
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
