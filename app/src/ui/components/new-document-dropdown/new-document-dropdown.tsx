import {For} from "solid-js"
import {DropdownMenu} from "@kobalte/core/dropdown-menu"
import Icon from "../icons/icon.tsx"
import type {
	AutomergeMapValue,
	FileEntryTemplate,
} from ":/docs/file-entry-doc.ts"
import {useSourceRegistry} from "@littlebook/plugin-api"

export function BigPlus() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			style={{height: "1em", width: "1em"}}
			class="icon icon--big-plus">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="32"
				d="M256 142v288m144-144H112"
			/>
		</svg>
	)
}

export default function NewDocumentMenu(props: {
	create(template: FileEntryTemplate): void
}) {
	const sources = useSourceRegistry()
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger
				class="popmenu__trigger"
				aria-label="Add Document">
				Add document
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content class="popmenu__content">
					<DropdownMenu.Sub overlap gutter={-10}>
						<DropdownMenu.SubTrigger class="popmenu__sub-trigger">
							New
							<div class="popmenu__item-right-slot">
								<Icon name="alt-arrow-right-linear" />
							</div>
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent class="popmenu__sub-content">
								<For each={Object.values(sources.records)}>
									{source => {
										if (source.category !== "new") return
										return (
											<DropdownMenu.Item
												class="popmenu__item"
												// eslint-disable-next-line solid/reactivity
												onSelect={async () => {
													const partialEntry = await source.new()
													props.create({
														name:
															partialEntry.name ??
															`untitled ${source.displayName ?? source.id}`.toLowerCase(),
														content:
															partialEntry.content as AutomergeMapValue,
														// creator: id,
													})
												}}>
												{source.displayName ?? source.id}
											</DropdownMenu.Item>
										)
									}}
								</For>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>

					<DropdownMenu.Item
						class="popmenu__item"
						// eslint-disable-next-line solid/reactivity
						onSelect={async () => {
							// // todo move this somewhere sensible
							// // todo make this make sense
							// todo probably should go in the plugin api
							// const fsa = await import("file-system-access")
							// const [computerFileHandle] = await fsa.showOpenFilePicker({
							// 	_preferPolyfill: false,
							// 	multiple: false,
							// })
							// const computerFile = await computerFileHandle.getFile()
							// const relevantCoders = Array.from(
							// 	sources.forMIMEType(computerFile.type) ||
							// 		sources.forFilename(computerFile.name),
							// )
							// // let coder: Coder | undefined
							// if (relevantCoders.length == 0) {
							// 	const importAsText = prompt(
							// 		"unrecognized file type, import as text?",
							// 	)
							// 	if (
							// 		importAsText != null &&
							// 		importAsText.toLowerCase().trim().slice(0, 2) !==
							// 			"no"
							// 	) {
							// 		coder = sources.records["code"]!
							// 	}
							// } else if (relevantCoders.length == 1) {
							// 	coder = relevantCoders[0]
							// } else if (relevantCoders.length > 1) {
							// 	coder = await new Promise(resolve => {
							// 		const options = relevantCoders.map(coder => ({
							// 			label: coder.displayName,
							// 			value: coder,
							// 		}))
							// 		const select = document.createElement("select")
							// 		select.style.position = "fixed"
							// 		select.style.top = "0"
							// 		select.style.left = "0"
							// 		select.style.zIndex = "1000"
							// 		select.innerHTML = options
							// 			.map(
							// 				option =>
							// 					`<option value="${option.value}">${option.label}</option>`,
							// 			)
							// 			.join("")
							// 		select.addEventListener("change", () => {
							// 			resolve(options[select.selectedIndex].value)
							// 		})
							// 		select.addEventListener("keydown", e => {
							// 			if (e.key === "Enter") {
							// 				resolve(options[select.selectedIndex].value)
							// 			}
							// 		})
							// 		document.body.appendChild(select)
							// 	})
							// }
							// if (coder) {
							// 	const content = await coder.fromFile?.(computerFile)
							// 	if (content?.ok) {
							// 		props.create({
							// 			name:
							// 				computerFileHandle.name ??
							// 				`${coder.displayName} file`,
							// 			content: content.val,
							// 			creator: coder.id,
							// 		})
							// 	} else if (content && !content.ok) {
							// 		console.error(content.err)
							// 		alert("failed to import file")
							// 	}
							// }
						}}>
						Import from Computer
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu>
	)
}
