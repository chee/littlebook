import {For} from "solid-js"
import useDocument from "../../documents/use-document.ts"
import {binary, coderRegistry} from "../contents/content-coders.ts"
import UniformType, {type MIMEType} from "../contents/uniform-type.ts"
import {contentViewRegistry} from "../contents/content-view.ts"
import {useAutomerge} from "../../automerge/use-automerge.ts"
import type {AutomergeList} from "../../types.ts"
import random from "random"
import createDocumentHandle from "../../documents/create-document-handle.ts"

export default function NewFilePicker(props: {
	parentFolderId(): lb.FolderId
	select(id: lb.ItemId): void
}) {
	const {repo} = useAutomerge()
	const [, changeFolder] = useDocument<lb.Folder>(props.parentFolderId)

	const fileTypes = [...coderRegistry.getAllTypes()]
		.map(UniformType.get)
		.filter(type => type.preferredFilenameExtension)
		.filter(type => contentViewRegistry.getFirst(type))

	return (
		<div class="menu">
			<ul class="new menu-items">
				<li>
					<button
						type="button"
						onclick={async () => {
							const newFolderHandle = createDocumentHandle<lb.Folder>(repo, {
								type: "folder",
								items: [] as lb.ItemId[] as AutomergeList<lb.ItemId>,
								icon: random.choice([
									"🦔",
									"🍒",
									"🧀",
									"✨",
									"👽",
									"⭐",
									"💜",
									"🐰",
									"🐷",
								])!,
								name: "new folder",
								note: "",
							})
							changeFolder(folder => {
								folder.items.push(newFolderHandle.documentId as lb.FolderId)
							})
						}}>
						folder
					</button>
				</li>
				<For each={fileTypes}>
					{type => (
						<li>
							<button
								type="button"
								onclick={async () => {
									coderRegistry.request(type.identifier)
									const coder =
										coderRegistry.getFirst(type.identifier) || binary()
									const value = await coder.decode(new Uint8Array())
									const contentHandle = repo.create<lb.Content<any>>({
										value,
									})
									const fileHandle = createDocumentHandle<lb.File>(repo, {
										contentType: type.identifier,
										contentTypeConformingTo: Array.from(type.supertypes).map(
											t => t.identifier,
										),
										content: contentHandle.documentId as lb.ContentId,
										name: "new file." + type.preferredFilenameExtension,
										note: "",
										type: "file",
									})
									const parentHandle = repo.find<lb.Folder>(
										props.parentFolderId(),
									)
									const fileId = fileHandle.documentId as lb.FileId
									parentHandle.change(parent => {
										parent.items.push(fileId)
									})

									props.select(fileId)
								}}>
								{type.description}
							</button>
						</li>
					)}
				</For>
				<li>
					<button
						type="button"
						onclick={async () => {
							// todo this should be elsewhere
							const fsa = await import("file-system-access")
							const [computerFileHandle] = await fsa.showOpenFilePicker({
								_preferPolyfill: false,
								multiple: false,
							})

							const computerFile = await computerFileHandle.getFile()
							const bytes = new Uint8Array(await computerFile.arrayBuffer())

							const types =
								UniformType.forMIMEType(computerFile.type as MIMEType) ||
								UniformType.forFilename(computerFile.name)

							const [preferredType] = types?.values() || [UniformType.data]

							coderRegistry.request(preferredType.identifier)

							const coder = coderRegistry.getFirst(preferredType) || binary()
							const value = await coder.decode(bytes)
							const contentHandle = repo.create<lb.Content<any>>({
								value,
							})
							const fileHandle = createDocumentHandle<lb.File>(repo, {
								contentType: preferredType.identifier,
								// todo can supertypes be just an array of names?
								contentTypeConformingTo: Array.from(
									preferredType.supertypes,
								).map(t => t.identifier),
								content: contentHandle.documentId as lb.ContentId,
								name: computerFile.name,
								note: "",
								type: "file",
							})
							changeFolder(folder => {
								folder.items.push(fileHandle.documentId as lb.FileId)
							})

							props.select(fileHandle.documentId as lb.ItemId)
						}}>
						import from computer
					</button>
				</li>
				<li>
					<button
						type="button"
						onclick={async () => {
							const id = window.prompt("ok what's the id") as lb.ItemId
							const itemHandle = repo.find<lb.Item>(id)
							itemHandle.doc().then(item => {
								if (
									!item ||
									!["folder", "package", "file"].includes(item.type)
								) {
									return
								}

								changeFolder(folder => {
									folder.items.push(item.id)
								})

								props.select(item.id)
							})
						}}>
						shared
					</button>
				</li>
			</ul>
		</div>
	)
}
