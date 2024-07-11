import {For} from "solid-js"
import useDocument from "../../documents/use-document.ts"
import {binary, coderRegistry} from "../contents/content-coders.ts"
import UniformType, {type MIMEType} from "../contents/uniform-type.ts"

import {useAutomerge} from "../../automerge/use-automerge.ts"
import createDocumentHandle from "../../documents/create-document-handle.ts"
import {contentViewRegistry} from "../contents/content-view.ts"

export default function NewFilePicker(props: {
	parentFolderId(): lb.FolderId
	select(id: lb.ItemId): void
}) {
	let {repo} = useAutomerge()
	let [, changeFolder] = useDocument<lb.Folder>(props.parentFolderId)

	const fileTypes = [...contentViewRegistry.getEditors()]
		.flatMap(name => [...contentViewRegistry.getTypes(name)])
		.map(type => UniformType.get(type))

	return (
		<div class="menu">
			<ul class="new menu-items">
				<For each={fileTypes}>
					{type => (
						<li>
							<button
								type="button"
								onclick={async () => {
									await coderRegistry.request(type.identifier)
									let coder =
										coderRegistry.getFirst(type.identifier) || binary()
									let value = await coder.decode(new Uint8Array())
									let contentHandle = repo.create<lb.Content<any>>({
										value,
									})
									let fileHandle = createDocumentHandle<lb.File>(repo, {
										contentType: type.identifier,
										contentTypeConformingTo: Array.from(type.supertypes).map(
											t => t.identifier,
										),
										content: contentHandle.documentId as lb.ContentId,
										name: "new file." + type.preferredFilenameExtension,
										note: "",
										type: "file",
									})
									let parentHandle = repo.find<lb.Folder>(
										props.parentFolderId(),
									)
									let fileId = fileHandle.documentId as lb.FileId
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
							let fsa = await import("file-system-access")
							let [computerFileHandle] = await fsa.showOpenFilePicker({
								_preferPolyfill: false,
								multiple: false,
							})

							let computerFile = await computerFileHandle.getFile()
							let bytes = new Uint8Array(await computerFile.arrayBuffer())

							let types =
								UniformType.forMIMEType(computerFile.type as MIMEType) ||
								UniformType.forFilename(computerFile.name)

							let [preferredType] = types?.values() || [UniformType.data]

							coderRegistry.request(preferredType.identifier)

							let coder = coderRegistry.getFirst(preferredType) || binary()
							let value = await coder.decode(bytes)
							let contentHandle = repo.create<lb.Content<any>>({
								value,
							})
							let fileHandle = createDocumentHandle<lb.File>(repo, {
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
						Import from computer
					</button>
				</li>
				<li>
					<button
						type="button"
						onclick={async () => {
							let id = window.prompt("ok what's the id") as lb.ItemId
							let itemHandle = repo.find<lb.Item>(id)
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
						Import share
					</button>
				</li>
			</ul>
		</div>
	)
}
