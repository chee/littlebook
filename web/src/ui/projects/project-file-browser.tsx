import {showOpenFilePicker} from "file-system-access"
import {useLittlebookAPI} from "../api/use-api.ts"

import {useParams, useSearchParams} from "@solidjs/router"
import {For, Suspense, createEffect} from "solid-js"
import useDocument from "../documents/use-document.ts"
import useDocuments from "../documents/use-documents.ts"
import {
	createSolidTable,
	getCoreRowModel,
	flexRender,
} from "@tanstack/solid-table"
import {
	UniformType,
	type UniformTypeIdentifier,
} from "../../contents/uniform-type.ts"

export default function ProjectFileBrowser() {
	const params = useParams<{projectId?: lb.ProjectId}>()
	const [search, setSearch] = useSearchParams<{file?: lb.FileId}>()

	const [project, changeProject] = useDocument<lb.Project>(
		() => params.projectId,
	)

	const files = useDocuments<lb.File | lb.Folder>(() => project()?.items)

	const lb = useLittlebookAPI()

	const table = createSolidTable({
		columns: [
			{accessorKey: "name", header: "name"},
			{accessorKey: "contentType", header: "type"},
		],
		get data() {
			return files.latest || []
		},
		getCoreRowModel: getCoreRowModel(),
		enableRowSelection: true,
		getRowId(doc, index) {
			return doc?.id || "" + index
		},
		initialState: {
			rowSelection: {
				[search.file || ""]: true,
			},
		},
	})

	createEffect(() => {
		table.resetRowSelection(false)
		table.setRowSelection({
			[search.file || ""]: true,
		})
	})

	const selectedRow = () => table.getSelectedRowModel().flatRows[0]

	return (
		<Suspense>
			<article class="project-file-browser">
				<div class="project-file-browser-heading">
					<span>{project()?.icon}</span>
					<span>{project()?.name}</span>
				</div>
				<div class="buttons p-2">
					<button
						type="button"
						onclick={() => {
							// todo this should be part of projects api
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(id, {
								name: "new file.txt",
								contentType: UniformType.plainText.identifier,
							})

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									setSearch({file: file?.id})
								})
							}
						}}>
						create .txt
					</button>

					<button
						type="button"
						onClick={() => {
							const id = project()?.id
							if (!id) {
								console.error("no project id")
								return
							}
							const fileHandle = lb()?.files.createHandleInProject(id, {
								name: "new file.excalidraw",
								contentType: "com.excalidraw.json" as UniformTypeIdentifier,
							})

							if (fileHandle instanceof Error) {
							} else {
								fileHandle?.doc().then(file => {
									setSearch({file: file?.id})
								})
							}
						}}>
						create drawing
					</button>
					<button
						type="button"
						onClick={async () => {
							const [computerFileHandle] = await showOpenFilePicker({
								_preferPolyfill: true,
								multiple: false,
							})
							const computerFile = await computerFileHandle.getFile()

							const bytes = new Uint8Array(await computerFile.arrayBuffer())

							const fileHandle = lb()?.files.import(computerFile, bytes)
							console.log(fileHandle)
							fileHandle?.doc().then(file => {
								console.log({file})
								file && changeProject(lb()!.projects.addItem(file.id))
								// setSearch({file: file?.id})
								// file &&
							})
						}}>
						<span class="icon">↥ </span>
						<span>import file</span>
					</button>
				</div>
				<section class="project-file-browser-body">
					<table>
						<thead>
							<For each={table.getHeaderGroups()}>
								{headerGroup => (
									<tr>
										<For each={headerGroup.headers}>
											{header => (
												<th>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</th>
											)}
										</For>
									</tr>
								)}
							</For>
						</thead>
						<tbody>
							<For each={table.getRowModel().rows}>
								{row => {
									if (!row.original) return null
									const name = row.getValue<string>("name")
									const type = row.getValue<string>("contentType")
									const selected = () => selectedRow()?.id == row.original?.id
									return (
										<tr aria-current={selected()}>
											<td>
												<a href={`?file=${row.original?.id}`}>{name}</a>
											</td>
											<td>{type}</td>
										</tr>
									)
								}}
							</For>
						</tbody>
						<tfoot>
							<For each={table.getFooterGroups()}>
								{footerGroup => (
									<tr>
										<For each={footerGroup.headers}>
											{header => (
												<th>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.footer,
																header.getContext(),
															)}
												</th>
											)}
										</For>
									</tr>
								)}
							</For>
						</tfoot>
					</table>
				</section>
			</article>
		</Suspense>
	)
}
