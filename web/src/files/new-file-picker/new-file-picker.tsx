import {For} from "solid-js"
import {useLittlebookAPI} from "../../api/use-api.ts"
import useDocument from "../../documents/use-document.ts"
import {coderRegistry} from "../content-coders.ts"
import UniformType from "../uniform-type.ts"
import {editorViewRegistry} from "../content-view.ts"
import {showOpenFilePicker} from "file-system-access"
import type {DocHandle} from "@automerge/automerge-repo"

export default function NewFilePicker(props: {
	parentFolderId(): lb.FolderId
	select(id: lb.ItemId): void
}) {
	const [folder, changeFolder] = useDocument<lb.Folder>(props.parentFolderId)
	const lb = useLittlebookAPI()

	const fileTypes = [...coderRegistry.getAllTypes()]
		.map(UniformType.get)
		.filter(type => type.preferredFilenameExtension)
		.filter(type => editorViewRegistry.getFirst(type))

	return (
		<ul class="new">
			<li>
				<button
					type="button"
					onclick={async () => {
						const newFolderHandle = lb.folders.createHandle()

						newFolderHandle.doc().then(folder => {
							if (!folder) {
								return
							}

							changeFolder(lb.folders.addItem(folder.id))
							props.select?.(folder.id)
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
							onclick={() => {
								const file = lb.files.createHandleInFolder(folder.latest!.id, {
									name: "new file." + type.preferredFilenameExtension,
									contentType: type.identifier,
								})
								const id = file.docSync()!.id
								props.select(id)
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
						const [computerFileHandle] = await showOpenFilePicker({
							_preferPolyfill: false,
							multiple: false,
						})
						const computerFile = await computerFileHandle.getFile()
						const bytes = new Uint8Array(await computerFile.arrayBuffer())
						const fileHandle = lb.files.import(computerFile, bytes)

						fileHandle.doc().then(file => {
							if (!file) {
								return
							}
							changeFolder(lb.folders.addItem(file.id))
							props.select(file.id)
						})
					}}>
					import
				</button>
			</li>
			<li>
				<button
					type="button"
					onclick={async () => {
						const id = window.prompt("ok what's the id") as lb.ItemId
						const itemHandle = lb.documents.getHandle(id) as DocHandle<lb.Item>

						itemHandle.doc().then(item => {
							if (!item || !["folder", "package", "file"].includes(item.type)) {
								return
							}

							changeFolder(lb.folders.addItem(item.id))
							props.select(item.id)
						})
					}}>
					share
				</button>
			</li>
		</ul>
	)
}
