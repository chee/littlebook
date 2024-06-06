import type {ContentCreator, ContentView} from "./content-type-registry.ts"
import {useMemo} from "preact/hooks"

export const imageCreator: ContentCreator<Uint8Array> = {
	extensions: ["txt", "text"],
	create(repo) {
		const imageHandle = repo.create<lb.Content<Uint8Array>>({
			id: "" as lb.ContentId,
			body: new Uint8Array(),
		})
		imageHandle.change(image => {
			// @ts-expect-error it's read-only but only after now
			image.id = imageHandle.documentId as lb.ContentId
		})
		return imageHandle
	},
	async import(repo, file) {
		const imageHandle = this.create(repo)
		imageHandle.change(async image => {
			image.body = new Uint8Array(await file.arrayBuffer())
		})
		return imageHandle
	},
}

export const ImageView: ContentView<Uint8Array> = ({content}) => {
	const blob = useMemo(() => new Blob([content.body]), [content.body])
	const url = URL.createObjectURL(blob)
	return <img alt="" src={url} />
}
