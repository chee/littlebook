import type {DocHandle, Repo} from "@automerge/automerge-repo"
// import type {ContentCreator, ContentView} from "./content-type-registry.ts"
import {useMemo} from "preact/hooks"
import type {AutomergeValue, ChangeFn} from "@automerge/automerge/next"
import {Component} from "preact"

export const imageCreator: ContentCreator<lb.content<Uint8Array>> = {
	extensions: ["txt", "text"],
	create(repo) {
		const imageHandle = repo.create<lb.content<Uint8Array>>({
			id: "" as lb.contentId,
			body: new Uint8Array(),
		})
		imageHandle.change(image => {
			// @ts-expect-error it's read-only but only after now
			image.id = imageHandle.documentId as lb.contentId
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

export const ImageView: ContentView<lb.content<Uint8Array>> = ({content}) => {
	const blob = useMemo(() => new Blob([content.body]), [content.body])
	const url = URL.createObjectURL(blob)
	return <img alt="" src={url} />
}

abstract class ContentCreator<ContentType extends lb.content<AutomergeValue>> {
	constructor(readonly model: DocHandle<ContentType>) {}
	abstract toBytes(): Uint8Array
	update(fn: (prev: ContentType["body"]) => ContentType["body"]) {
		this.model.change(doc => {
			doc.body = fn(doc.body)
		})
	}
}

// todo or maybe it should just be extends AutomergeValue
interface StaticContentCreator<ContentType extends lb.content<AutomergeValue>> {
	create(repo: Repo, file?: lb.file): ContentCreator<ContentType>
	fromFile(
		repo: Repo,
		file: globalThis.File,
	): Promise<ContentCreator<ContentType>>
	fromBytes(repo: Repo, bytes: Uint8Array): ContentCreator<ContentType>
}

type ImageContent = lb.content<Uint8Array>
const ImageContentCreator =
	class ImageContentCreator extends ContentCreator<ImageContent> {
		static mode = /\.(png|jpeg|jpg|avif)^/
		static create(repo: Repo, file?: lb.file) {}
		static async import(repo: Repo, file: globalThis.File) {}
		static fromBytes() {}
		toBytes() {
			return this.model.docSync()!.body
		}
		view = ImageView
		constructor(readonly model: DocHandle<ImageContent>) {
			super(model)
		}
	} satisfies StaticContentCreator<ImageContent>

let image = new ImageContentController()

let x = (
	<image.view changeContent={() => {}} content={new Uint8Array()}>
		<div>x</div>
	</image.view>
)
